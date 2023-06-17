import React, { FunctionComponent, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import NextLink from 'next/link';
import intersection from 'lodash/intersection';
import sortBy from 'lodash/sortBy';
import { Alert, FormControlLabel, FormGroup, Snackbar, alertClasses } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Checkbox from '../../components/checkbox';
import Typography from '../../components/typography';
import GitOpsCatalogCard from '../../components/gitOpsCatalogCard';
import GitopsAppModal from '../../components/gitopsAppModal';
import useModal from '../../hooks/useModal';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { installGitOpsApp } from '../../redux/thunks/api.thunk';
import { setIsGitOpsCatalogNotificationOpen } from '../../redux/slices/cluster.slice';
import { GitOpsCatalogApp } from '../../types/gitOpsCatalog';
import { IVY_LEAGUE, VOLCANIC_SAND } from '../../constants/colors';

import {
  CardsByCategory,
  CardsContainer,
  Container,
  Content,
  Filter,
} from './gitOpsCatalog.styled';

const STATIC_HELP_CARD: GitOpsCatalogApp = {
  name: '',
  categories: [],
  display_name: 'Can’t find what you need?',
  image_url: 'https://assets.kubefirst.com/console/help.png',
};

const gitOpsCatalog: FunctionComponent = () => {
  const [selectedCategories, setSelectedCategories] = useState<Array<string>>([]);
  const [selectedApp, setSelectedApp] = useState<GitOpsCatalogApp>();

  const dispatch = useAppDispatch();
  const { isGitOpsCatalogNotificationOpen, selectedCluster } = useAppSelector(({ cluster }) => ({
    selectedCluster: cluster.selectedCluster,
    isGitOpsCatalogNotificationOpen: cluster.isGitOpsCatalogNotificationOpen,
  }));

  const { isOpen, openModal, closeModal } = useModal();
  const {
    control,
    formState: { isValid },
    getValues,
    reset,
  } = useForm();

  const gitOpsCatalogApps = useAppSelector(({ cluster }) =>
    cluster.gitOpsCatalogApps?.filter(
      (app) => !cluster.clusterServices.map((s) => s.name).includes(app.name),
    ),
  );

  const categories = useMemo(
    () =>
      gitOpsCatalogApps &&
      gitOpsCatalogApps
        .map(({ categories }) => categories)
        .reduce((previous, current) => {
          const values = current.filter((category) => !previous.includes(category));
          return [...previous, ...values];
        }, []),
    [gitOpsCatalogApps],
  );

  const onClickCategory = (category: string) => {
    const isCategorySelected = selectedCategories.includes(category);

    if (isCategorySelected) {
      setSelectedCategories(
        selectedCategories.filter((selectedCategory) => selectedCategory !== category),
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleAddApp = async (app: GitOpsCatalogApp) => {
    try {
      const values = getValues();
      await dispatch(
        installGitOpsApp({ app, clusterName: selectedCluster?.clusterName as string, values }),
      );
      reset();
    } catch (error) {
      //todo: handle error
    }
  };

  const handleSelectedApp = (app: GitOpsCatalogApp) => {
    setSelectedApp(app);
    if (app.secret_keys?.length) {
      openModal();
    } else {
      handleAddApp(app);
    }
  };

  const handleCloseNotification = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setIsGitOpsCatalogNotificationOpen(false));
  };

  const filteredApps = useMemo(() => {
    if (!selectedCategories.length) {
      return gitOpsCatalogApps;
    }

    return (
      gitOpsCatalogApps &&
      gitOpsCatalogApps.filter(
        ({ categories }) => intersection(categories, selectedCategories).length > 0,
      )
    );
  }, [gitOpsCatalogApps, selectedCategories]);

  return (
    <Container>
      <Filter>
        <Typography variant="subtitle2" sx={{ mb: 3 }}>
          Category
        </Typography>
        {categories &&
          sortBy(categories).map((category) => (
            <FormGroup key={category} sx={{ mb: 2 }}>
              <FormControlLabel
                control={<Checkbox sx={{ mr: 2 }} onClick={() => onClickCategory(category)} />}
                label={
                  <Typography variant="body2" color={VOLCANIC_SAND}>
                    {category}
                  </Typography>
                }
                sx={{ ml: 0 }}
              />
            </FormGroup>
          ))}
      </Filter>
      <Content>
        {!selectedCategories.length && <Typography variant="subtitle2">All</Typography>}
        <CardsByCategory>
          {sortBy(selectedCategories).map((category) => (
            <div key={category}>
              <Typography variant="subtitle2">{category}</Typography>
              <CardsContainer>
                {filteredApps
                  .filter((app) => app.categories.includes(category))
                  .map((app) => (
                    <GitOpsCatalogCard
                      key={app.name}
                      {...app}
                      onClick={() => handleSelectedApp(app)}
                    />
                  ))}
              </CardsContainer>
            </div>
          ))}
        </CardsByCategory>
        <CardsContainer>
          {!selectedCategories.length &&
            filteredApps &&
            filteredApps.map((app) => (
              <GitOpsCatalogCard key={app.name} {...app} onClick={() => handleSelectedApp(app)} />
            ))}
          <GitOpsCatalogCard {...STATIC_HELP_CARD} showSubmitButton={false}>
            <>
              To suggest an open source app that installs to your cluster, discuss your idea via an{' '}
              <NextLink href="https://github.com/kubefirst/kubefirst/issues" target="_blank">
                issue
              </NextLink>
              . Learn how you can do this on our{' '}
              <NextLink href="https://github.com/kubefirst/gitops-catalog" target="_blank">
                Contributing file
              </NextLink>
              .
              <br />
              <br />
              Alternatively contact us via our{' '}
              <NextLink href="https://kubefirst.io/slack" target="_blank">
                Slack Community
              </NextLink>{' '}
              in the #helping-hands or #contributors channels.
            </>
          </GitOpsCatalogCard>
        </CardsContainer>
      </Content>
      {isOpen && selectedApp?.name && (
        <GitopsAppModal
          control={control}
          isValid={isValid}
          closeModal={closeModal}
          isOpen={isOpen}
          onSubmit={handleAddApp}
          {...selectedApp}
        />
      )}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={isGitOpsCatalogNotificationOpen}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        sx={{
          [`.${alertClasses.root}`]: {
            backgroundColor: IVY_LEAGUE,
          },
        }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity="success"
          sx={{ width: '100%' }}
          variant="filled"
          icon={<CheckCircleIcon />}
        >
          <Typography variant="subtitle2">{`${selectedApp?.name} successfully added to your cluster!`}</Typography>
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default gitOpsCatalog;
