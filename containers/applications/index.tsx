'use client';
import React, { FunctionComponent, useEffect, useCallback, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import sortBy from 'lodash/sortBy';

import Application from '../application';
import GitOpsCatalog from '../gitOpsCatalog';
import TabPanel, { Tab, a11yProps } from '../../components/tab';
import Typography from '../../components/typography';
import useFeatureFlag from '../../hooks/useFeatureFlag';
import {
  getClusterApplications,
  getGitOpsCatalogApps,
} from '../../redux/thunks/applications.thunk';
import { sendTelemetryEvent } from '../../redux/thunks/api.thunk';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { DOCS_LINK } from '../../constants';
import { BISCAY, SALTBOX_BLUE, VOLCANIC_SAND } from '../../constants/colors';

import {
  Container,
  Content,
  Header,
  LearnMoreLink,
  ApplicationsContainer,
  ApplicationsFilter,
} from './applications.styled';

import { FeatureFlag } from '@/types/config';
import { setFilterState } from '@/redux/slices/applications.slice';
import { WORKLOAD_CLUSTER_TYPES } from '@/types/provision';
import { GitOpsCatalogApp } from '@/types/applications';

enum APPLICATION_TAB {
  PROVISIONED,
  GITOPS_CATALOG,
}

enum Target {
  TEMPLATE = 'Template',
  CLUSTER = 'Cluster',
}

const TARGET_OPTIONS = Object.values(Target);

const Applications: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const {
    clusterApplications,
    isTelemetryDisabled,
    clusterMap,
    filter,
    selectedCategories,
    gitOpsCatalogApps,
    installedClusterAppNames,
  } = useAppSelector(({ config, applications, api }) => ({
    isTelemetryDisabled: config.isTelemetryDisabled,
    clusterMap: api.clusterMap,
    managementCluster: api.managementCluster,
    ...applications,
  }));

  const { isEnabled: isGitOpsCatalogEnabled } = useFeatureFlag(FeatureFlag.GITOPS_CATALOG);

  const dispatch = useAppDispatch();

  const handleLinkClick = useCallback(
    (url: string, name: string) => {
      if (!isTelemetryDisabled) {
        const event = `console.${name.toLowerCase()}.link`.replace(/ /g, '');
        dispatch(sendTelemetryEvent({ event }));
      }
    },
    [dispatch, isTelemetryDisabled],
  );

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const clusterSelectOptions = useMemo((): { label: string; value: string }[] => {
    if (!filter.target) {
      return [];
    }
    if (filter.target === Target.TEMPLATE) {
      return WORKLOAD_CLUSTER_TYPES.map((type) => ({ label: type, value: type }));
    }
    return Object.keys(clusterMap).map((clusterName) => ({
      label: clusterName,
      value: clusterName,
    }));
  }, [filter.target, clusterMap]);

  const filteredApps = useMemo(() => {
    const { searchTerm } = filter;
    if (!searchTerm) {
      return clusterApplications;
    }
    return clusterApplications.filter((app) => app.name.includes(searchTerm));
  }, [clusterApplications, filter]);

  const uninstalledCatalogApps = useMemo(
    () =>
      gitOpsCatalogApps.filter((app) => !clusterApplications.map((s) => s.name).includes(app.name)),
    [clusterApplications, gitOpsCatalogApps],
  );

  const filteredCatalogApps = useMemo(() => {
    let apps: GitOpsCatalogApp[] = [];

    if (!selectedCategories.length) {
      apps = uninstalledCatalogApps;
    } else {
      apps = uninstalledCatalogApps.filter(
        ({ category, name }) =>
          category &&
          selectedCategories.includes(category) &&
          !installedClusterAppNames.includes(name),
      );
    }

    return sortBy(apps, (app) => app.display_name);
  }, [uninstalledCatalogApps, selectedCategories, installedClusterAppNames]);

  useEffect(() => {
    dispatch(getGitOpsCatalogApps());
  }, [dispatch]);

  useEffect(() => {
    const { cluster } = filter;
    if (cluster) {
      dispatch(getClusterApplications({ clusterName: cluster }));
    }
  }, [dispatch, filter]);

  const Apps = useMemo(
    () => (
      <>
        <Typography variant="body2" sx={{ mb: 3 }} color={VOLCANIC_SAND}>
          Click on a link to access the service Kubefirst has provisioned for you.{' '}
          <LearnMoreLink
            href={DOCS_LINK}
            target="_blank"
            onClick={() => handleLinkClick(DOCS_LINK, 'docs')}
          >
            Learn more
          </LearnMoreLink>
        </Typography>
        <ApplicationsFilter
          targetOptions={TARGET_OPTIONS.map((target) => ({ label: target, value: target }))}
          clusterSelectOptions={clusterSelectOptions}
          searchOptions={filteredApps.map((app) => ({ label: app.name, value: app.name }))}
          onFilterChange={(filter) => dispatch(setFilterState(filter))}
          defaultValues={filter}
        />
        <ApplicationsContainer>
          {filteredApps.map(({ name, ...rest }) => (
            <Application key={name} name={name} {...rest} onLinkClick={handleLinkClick} />
          ))}
        </ApplicationsContainer>
      </>
    ),
    [clusterSelectOptions, filteredApps, handleLinkClick, filter, dispatch],
  );

  return (
    <Container>
      <Header>
        <Typography variant="h6">Applications Overview</Typography>
      </Header>
      {isGitOpsCatalogEnabled ? (
        <>
          <Box sx={{ width: 'fit-content', mb: 4 }}>
            <Tabs value={activeTab} onChange={handleChange} indicatorColor="primary">
              <Tab
                color={activeTab === APPLICATION_TAB.PROVISIONED ? BISCAY : SALTBOX_BLUE}
                label={<Typography variant="buttonSmall">Installed applications</Typography>}
                {...a11yProps(APPLICATION_TAB.PROVISIONED)}
                sx={{ textTransform: 'initial', mr: 3 }}
              />

              <Tab
                color={activeTab === APPLICATION_TAB.GITOPS_CATALOG ? BISCAY : SALTBOX_BLUE}
                label={<Typography variant="buttonSmall">GitOps catalog</Typography>}
                {...a11yProps(APPLICATION_TAB.GITOPS_CATALOG)}
                sx={{ textTransform: 'initial' }}
              />
            </Tabs>
          </Box>
          <Content>
            <TabPanel value={activeTab} index={APPLICATION_TAB.PROVISIONED}>
              {Apps}
            </TabPanel>
            <TabPanel value={activeTab} index={APPLICATION_TAB.GITOPS_CATALOG}>
              <Typography variant="body2" sx={{ mb: 3 }} color={VOLCANIC_SAND}>
                Add the latest version of your favourite application to your cluster.{' '}
                <LearnMoreLink
                  href={DOCS_LINK}
                  target="_blank"
                  onClick={() => handleLinkClick(DOCS_LINK, 'docs')}
                >
                  Learn more
                </LearnMoreLink>
              </Typography>
              <ApplicationsFilter
                targetOptions={TARGET_OPTIONS.map((target) => ({ label: target, value: target }))}
                clusterSelectOptions={clusterSelectOptions}
                searchOptions={filteredApps.map((app) => ({ label: app.name, value: app.name }))}
                onFilterChange={(filter) => dispatch(setFilterState(filter))}
                defaultValues={filter}
              />
              <GitOpsCatalog catalogApplications={filteredCatalogApps} />
            </TabPanel>
          </Content>
        </>
      ) : (
        Apps
      )}
    </Container>
  );
};

export default Applications;
