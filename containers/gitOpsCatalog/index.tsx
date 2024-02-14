import React, { FunctionComponent, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import NextLink from 'next/link';
import sortBy from 'lodash/sortBy';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

import Checkbox from '../../components/checkbox';
import Typography from '../../components/typography';
import GitOpsCatalogCard from '../../components/gitOpsCatalogCard';
import GitopsAppModal from '../../components/gitopsAppModal';
import useModal from '../../hooks/useModal';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { installGitOpsApp } from '../../redux/thunks/applications.thunk';
import { AppCategory, GitOpsCatalogApp } from '../../types/applications';
import { VOLCANIC_SAND } from '../../constants/colors';

import { CardsContainer, Container, Content, Filter } from './gitOpsCatalog.styled';

const STATIC_HELP_CARD: GitOpsCatalogApp = {
  name: '',
  display_name: 'Can’t find what you need?',
  image_url: 'https://assets.kubefirst.com/console/help.png',
};

const gitOpsCatalog: FunctionComponent = () => {
  const [selectedCategories, setSelectedCategories] = useState<AppCategory[]>([]);
  const [selectedApp, setSelectedApp] = useState<GitOpsCatalogApp>();

  const { appsQueue, selectedCluster, gitOpsCatalogApps, clusterApplications } = useAppSelector(
    ({ applications }) => applications,
  );

  const filteredCatalogApps = useMemo(
    () =>
      gitOpsCatalogApps.filter((app) => !clusterApplications.map((s) => s.name).includes(app.name)),
    [clusterApplications, gitOpsCatalogApps],
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
      filteredCatalogApps &&
      filteredCatalogApps.reduce<AppCategory[]>((previous, current) => {
        if (current.category && !previous.includes(current.category)) {
          previous.push(current.category);
        }
        return sortBy(previous);
      }, []),
    [filteredCatalogApps],
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
    const values = getValues();
    dispatch(
      installGitOpsApp({ app, clusterName: selectedCluster?.clusterName as string, values }),
    );
    reset();
    closeModal();
  };

  const handleSelectedApp = (app: GitOpsCatalogApp) => {
    setSelectedApp(app);
    if (app.secret_keys?.length || app.config_keys?.length) {
      openModal();
    } else {
      handleAddApp(app);
    }
  };

  const filteredApps = useMemo(() => {
    let apps: GitOpsCatalogApp[] = [];

    if (!selectedCategories.length) {
      apps = filteredCatalogApps;
    } else {
      apps = filteredCatalogApps.filter(
        ({ category }) => category && selectedCategories.includes(category),
      );
    }

    return sortBy(apps, (app) => app.display_name);
  }, [filteredCatalogApps, selectedCategories]);

  return (
    <Container>
      <Filter>
        <Typography variant="subtitle2" sx={{ mb: 3 }}>
          Category
        </Typography>
        {sortedAvailableCategories.map((category) => (
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
        <CardsContainer>
          {filteredApps &&
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
    </Container>
  );
};

export default gitOpsCatalog;
