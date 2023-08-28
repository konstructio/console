import React, { FunctionComponent, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import NextLink from 'next/link';
import sortBy from 'lodash/sortBy';
import { Alert, FormControlLabel, FormGroup, Snackbar, alertClasses } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Checkbox from '../../components/checkbox';
import Typography from '../../components/typography';
import GitOpsCatalogCard, { CATEGORY_LABEL_CONFIG } from '../../components/gitOpsCatalogCard';
import GitopsAppModal from '../../components/gitopsAppModal';
import useModal from '../../hooks/useModal';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { installGitOpsApp } from '../../redux/thunks/api.thunk';
import {
  addAppToQueue,
  removeAppFromQueue,
  setIsGitOpsCatalogNotificationOpen,
} from '../../redux/slices/cluster.slice';
import { AppCategory, GitOpsCatalogApp } from '../../types/gitOpsCatalog';
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
  display_name: 'Can’t find what you need?',
  image_url: 'https://assets.kubefirst.com/console/help.png',
  categories: [],
};

const gitOpsCatalog: FunctionComponent = () => {
  const [selectedCategories, setSelectedCategories] = useState<AppCategory[]>([]);
  const [selectedApp, setSelectedApp] = useState<GitOpsCatalogApp>();

  const { appsQueue, isGitOpsCatalogNotificationOpen, selectedCluster } = useAppSelector(
    ({ cluster }) => ({
      selectedCluster: cluster.selectedCluster,
      isGitOpsCatalogNotificationOpen: cluster.isGitOpsCatalogNotificationOpen,
      appsQueue: cluster.appsQueue,
    }),
  );

  const gitOpsCatalogApps = useAppSelector(({ cluster }) =>
    cluster.gitOpsCatalogApps?.filter(
      (app) => !cluster.clusterServices.map((s) => s.name).includes(app.name),
    ),
  );

  const dispatch = useAppDispatch();

  const { isOpen, openModal, closeModal } = useModal();

  const {
    control,
    formState: { isValid },
    getValues,
    reset,
  } = useForm();

  const sortedAvailableCategories = useMemo(
    () =>
      gitOpsCatalogApps &&
      gitOpsCatalogApps.reduce<AppCategory[]>((previous, current) => {
        if (current.category && !previous.includes(current.category)) {
          previous.push(current.category);
        }
        return sortBy(previous);
      }, []),
    [gitOpsCatalogApps],
  );

  const onClickCategory = (category: AppCategory) => {
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
      dispatch(addAppToQueue(app));
      await dispatch(
        installGitOpsApp({ app, clusterName: selectedCluster?.clusterName as string, values }),
      );
      reset();
    } catch (error) {
      //todo: handle error
      dispatch(removeAppFromQueue(app));
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
      gitOpsCatalogApps.filter(({ category }) => category && selectedCategories.includes(category))
    );
  }, [gitOpsCatalogApps, selectedCategories]);

  return (
    <Container>
      <Filter>
        <Typography variant="subtitle2" sx={{ mb: 3 }}>
          Category
        </Typography>
        {sortedAvailableCategories.map((category) => {
          const { label } =
            CATEGORY_LABEL_CONFIG[category] ?? CATEGORY_LABEL_CONFIG[AppCategory.APPLICATIONS];
          return (
            <FormGroup key={category} sx={{ mb: 2 }}>
              <FormControlLabel
                control={<Checkbox sx={{ mr: 2 }} onClick={() => onClickCategory(category)} />}
                label={
                  <Typography variant="body2" color={VOLCANIC_SAND}>
                    {label ?? category}
                  </Typography>
                }
                sx={{ ml: 0 }}
              />
            </FormGroup>
          );
        })}
      </Filter>
      <Content>
        {!selectedCategories.length && <Typography variant="subtitle2">All</Typography>}
        <CardsByCategory>
          {sortBy(selectedCategories).map((category) => (
            <div key={category}>
              <Typography variant="subtitle2">{category}</Typography>
              <CardsContainer>
                {filteredApps
                  .filter((app) => app.category === category)
                  .map((app) => (
                    <GitOpsCatalogCard
                      key={app.name}
                      {...app}
                      onClick={() => handleSelectedApp(app)}
                      isInstalling={appsQueue.includes(app.name)}
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
              <GitOpsCatalogCard
                key={app.name}
                {...app}
                onClick={() => handleSelectedApp(app)}
                isInstalling={appsQueue.includes(app.name)}
              />
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
          <Typography variant="subtitle2">{`${selectedApp?.display_name} successfully added to provisioned services in cluster ${selectedCluster?.clusterName}!`}</Typography>
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default gitOpsCatalog;
