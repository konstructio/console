'use client';
import React, { FunctionComponent, useEffect, useCallback, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import { useRouter } from 'next/navigation';

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
import { noop } from '@/utils/noop';
import { setSelectedApplication, setTarget } from '@/redux/slices/applications.slice';

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
  const [searchTerm, setSearchTerm] = useState('');

  const {
    clusterApplications,
    isTelemetryDisabled,
    selectedCluster,
    selectedApplication,
    target,
    clusterMap,
  } = useAppSelector(({ config, applications, api }) => ({
    isTelemetryDisabled: config.isTelemetryDisabled,
    clusterMap: api.clusterMap,
    managementCluster: api.managementCluster,
    ...applications,
  }));

  const { isEnabled: isGitOpsCatalogEnabled } = useFeatureFlag(FeatureFlag.GITOPS_CATALOG);

  const router = useRouter();
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

  const handleTargetChange = useCallback(
    (target: Target) => {
      dispatch(setTarget(target));
    },
    [dispatch],
  );

  const handleClusterSelectChange = useCallback(
    (val: string) => {
      const cluster = target === Target.TEMPLATE ? val : clusterMap[val].clusterName;
      dispatch(setSelectedApplication(cluster));
      dispatch(getClusterApplications({ clusterName: cluster }));
    },
    [target, clusterMap, dispatch],
  );

  const clusterSelectOptions = useMemo((): { label: string; value: string }[] => {
    if (target === Target.TEMPLATE) {
      return [
        { label: 'workload-vcluster', value: 'workload-vcluster' },
        { label: 'workload-physicalcluster', value: 'workload-cluster' },
      ];
    }
    return Object.keys(clusterMap).map((clusterName) => ({
      label: clusterName,
      value: clusterName,
    }));
  }, [target, clusterMap]);

  useEffect(() => {
    dispatch(getGitOpsCatalogApps());
  }, [dispatch]);

  useEffect(() => {
    if (selectedApplication) {
      dispatch(getClusterApplications({ clusterName: selectedApplication }));
    }
  }, [dispatch, router, selectedApplication]);

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
          autoCompleteProps={{
            value: searchTerm,
            label: '',
            options: [{ value: 'yes', label: 'yes' }],
            onChange: (e) => setSearchTerm(e.target.value as string),
            onBlur: noop,
            name: '',
            placeholder: 'Search app name',
          }}
          targetValue={target}
          targetOptions={TARGET_OPTIONS.map((target) => ({ label: target, value: target }))}
          onTargetChange={handleTargetChange}
          onClusterSelectChange={handleClusterSelectChange}
          clusterSelectOptions={clusterSelectOptions}
          clusterSelectValue={selectedApplication ?? ''}
        />
        <ApplicationsContainer>
          {clusterApplications.map(({ name, ...rest }) => (
            <Application key={name} name={name} {...rest} onLinkClick={handleLinkClick} />
          ))}
        </ApplicationsContainer>
      </>
    ),
    [
      searchTerm,
      target,
      handleTargetChange,
      handleClusterSelectChange,
      clusterSelectOptions,
      selectedApplication,
      clusterApplications,
      handleLinkClick,
    ],
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
                autoCompleteProps={{
                  value: searchTerm,
                  label: '',
                  options: [{ value: 'yes', label: 'yes' }],
                  onChange: (e) => setSearchTerm(e.target.value as string),
                  onBlur: noop,
                  name: '',
                  placeholder: 'Search app name',
                }}
                targetValue={target}
                targetOptions={TARGET_OPTIONS.map((target) => ({ label: target, value: target }))}
                onTargetChange={handleTargetChange}
                // onClusterSelectChange={(val) => setClusterSelectVal(val)}
                clusterSelectOptions={clusterSelectOptions}
                clusterSelectValue={''}
              />
              <GitOpsCatalog />
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
