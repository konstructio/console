'use client';
import React, { FunctionComponent, useEffect, useCallback, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import { useRouter } from 'next/navigation';

import Service from '../service';
import GitOpsCatalog from '../gitOpsCatalog';
import TabPanel, { Tab, a11yProps } from '../../components/tab';
import Typography from '../../components/typography';
import useFeatureFlag from '../../hooks/useFeatureFlag';
import { getClusterServices, getGitOpsCatalogApps } from '../../redux/thunks/cluster.thunk';
import { sendTelemetryEvent } from '../../redux/thunks/api.thunk';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { DOCS_LINK } from '../../constants';
import { BISCAY, SALTBOX_BLUE, VOLCANIC_SAND } from '../../constants/colors';

import { Container, Content, Header, LearnMoreLink, ServicesContainer } from './services.styled';

enum SERVICES_TABS {
  PROVISIONED = 0,
  GITOPS_CATALOG = 1,
}

const Services: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const router = useRouter();

  const { isEnabled: isGitOpsCatalogEnabled } = useFeatureFlag('gitops-catalog');

  const dispatch = useAppDispatch();
  const { clusterServices, isTelemetryDisabled, selectedCluster } = useAppSelector(
    ({ config, cluster }) => ({
      isTelemetryDisabled: config.isTelemetryDisabled,
      clusterServices: cluster.clusterServices,
      selectedCluster: cluster.selectedCluster,
    }),
  );

  const onClickLink = useCallback(
    (url: string, name: string) => {
      if (!isTelemetryDisabled) {
        const event = `console.${name.toLowerCase()}.link`.replace(/ /g, '');
        dispatch(sendTelemetryEvent({ event }));
      }
    },
    [dispatch, isTelemetryDisabled],
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    dispatch(getGitOpsCatalogApps());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCluster?.clusterName) {
      dispatch(getClusterServices({ clusterName: selectedCluster?.clusterName }));
    }
  }, [dispatch, router, selectedCluster?.clusterName]);

  const services = useMemo(
    () => (
      <>
        <Typography variant="body2" sx={{ mb: 3 }} color={VOLCANIC_SAND}>
          Click on a link to access the service Kubefirst has provisioned for you.{' '}
          <LearnMoreLink
            href={DOCS_LINK}
            target="_blank"
            onClick={() => onClickLink(DOCS_LINK, 'docs')}
          >
            Learn more
          </LearnMoreLink>
        </Typography>
        <ServicesContainer>
          {clusterServices.map(({ name, ...rest }) => (
            <Service key={name} name={name} {...rest} onClickLink={onClickLink} />
          ))}
        </ServicesContainer>
      </>
    ),
    [clusterServices, onClickLink],
  );

  return (
    <Container>
      <Header>
        <Typography variant="h6">Services Overview</Typography>
      </Header>
      {isGitOpsCatalogEnabled ? (
        <>
          <Box sx={{ width: 'fit-content', mb: 4 }}>
            <Tabs value={activeTab} onChange={handleChange} indicatorColor="primary">
              <Tab
                color={activeTab === SERVICES_TABS.PROVISIONED ? BISCAY : SALTBOX_BLUE}
                label={<Typography variant="buttonSmall">Provisioned services</Typography>}
                {...a11yProps(SERVICES_TABS.PROVISIONED)}
                sx={{ textTransform: 'initial', mr: 3 }}
              />

              <Tab
                color={activeTab === SERVICES_TABS.GITOPS_CATALOG ? BISCAY : SALTBOX_BLUE}
                label={<Typography variant="buttonSmall">GitOps catalog</Typography>}
                {...a11yProps(SERVICES_TABS.GITOPS_CATALOG)}
                sx={{ textTransform: 'initial' }}
              />
            </Tabs>
          </Box>
          <Content>
            <TabPanel value={activeTab} index={SERVICES_TABS.PROVISIONED}>
              {services}
            </TabPanel>
            <TabPanel value={activeTab} index={SERVICES_TABS.GITOPS_CATALOG}>
              <Typography variant="body2" sx={{ mb: 3 }} color={VOLCANIC_SAND}>
                Add the latest version of your favourite application to your cluster.{' '}
                <LearnMoreLink
                  href={DOCS_LINK}
                  target="_blank"
                  onClick={() => onClickLink(DOCS_LINK, 'docs')}
                >
                  Learn more
                </LearnMoreLink>
              </Typography>
              <GitOpsCatalog />
            </TabPanel>
          </Content>
        </>
      ) : (
        services
      )}
    </Container>
  );
};

export default Services;
