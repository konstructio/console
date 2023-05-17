import React, { FunctionComponent, useEffect, useMemo, useCallback, useState } from 'react';
import { Box, Tabs } from '@mui/material';

import Service from '../service';
import Marketplace from '../marketplace';
import TabPanel, { Tab, a11yProps } from '../../components/tab';
import Typography from '../../components/typography';
import { useTelemetryMutation } from '../../redux/api';
import { setConfigValues } from '../../redux/slices/config.slice';
import { getMarketplaceApps } from '../../redux/thunks/api.thunk';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { GitProvider } from '../../types';
import { DOCS_LINK } from '../../constants';
import { BISCAY, SALTBOX_BLUE, VOLCANIC_SAND } from '../../constants/colors';

import { Container, Header, LearnMoreLink, ServicesContainer } from './services.styled';

enum SERVICES_TABS {
  PROVISIONED = 0,
  MARKETPLACE = 1,
}

export interface ServicesProps {
  apiUrl: string;
  argoUrl: string;
  argoWorkflowsUrl: string;
  atlantisUrl: string;
  domainName: string;
  githubOwner: string;
  gitlabOwner: string;
  gitProvider: string;
  k3dDomain: string;
  kubefirstVersion: string;
  useTelemetry: boolean;
  vaultUrl: string;
  metaphor: {
    development: string;
    staging: string;
    production: string;
  };
}

const Services: FunctionComponent<ServicesProps> = ({
  apiUrl,
  argoUrl,
  argoWorkflowsUrl,
  atlantisUrl,
  domainName,
  githubOwner,
  gitlabOwner,
  gitProvider,
  k3dDomain,
  kubefirstVersion,
  useTelemetry,
  vaultUrl,
  metaphor,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [sendTelemetryEvent] = useTelemetryMutation();

  const isTelemetryEnabled = useAppSelector(({ config }) => config.isTelemetryEnabled);

  const dispatch = useAppDispatch();

  const gitTileProvider = useMemo(
    () => (gitProvider === GitProvider.GITHUB ? 'GitHub' : 'GitLab'),
    [gitProvider],
  );

  const gitLinks = useMemo(
    () => [
      gitProvider && `https://${gitProvider}.com/${githubOwner || gitlabOwner}/gitops`,
      gitProvider && `https://${gitProvider}.com/${githubOwner || gitlabOwner}/metaphor`,
    ],
    [gitProvider, githubOwner, gitlabOwner],
  );

  const services = useMemo(
    () => [
      {
        name: gitTileProvider,
        description: `The ${gitTileProvider} repository contains all the Infrastructure as Code and GitOps configurations.`,
        links: gitLinks,
      },
      {
        name: 'Vault',
        description: `Kubefirst’s secrets manager and identity provider.`,
        links: [vaultUrl],
      },
      {
        name: 'Argo CD',
        description: `A GitOps oriented continuous delivery tool for managing all of our applications across our
  kubernetes clusters.`,
        links: [argoUrl],
      },
      {
        name: 'Argo Workflows',
        description: `The workflow engine for orchestrating parallel jobs on Kubernetes.`,
        links: [`${argoWorkflowsUrl}/workflows`],
      },
      {
        name: 'Atlantis',
        description: `Kubefirst manages terraform workflows with atlantis automation.`,
        links: [atlantisUrl],
      },
      {
        name: 'Metaphor',
        description: `A multi-environment demonstration space for frontend application best practices that’s easy to apply to other projects.`,
        links: [metaphor?.development, metaphor?.staging, metaphor?.production],
      },
    ],
    [
      argoUrl,
      argoWorkflowsUrl,
      atlantisUrl,
      gitLinks,
      gitTileProvider,
      metaphor?.development,
      metaphor?.production,
      metaphor?.staging,
      vaultUrl,
    ],
  );

  const onClickLink = useCallback(
    (url: string, name: string) => {
      if (isTelemetryEnabled) {
        const event = `console.${name.toLowerCase()}.link`.replace(/ /g, '');
        sendTelemetryEvent({ event, properties: { url, type: 'link' } });
      }
    },
    [isTelemetryEnabled, sendTelemetryEvent],
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    dispatch(
      setConfigValues({ isTelemetryEnabled: useTelemetry, kubefirstVersion, k3dDomain, apiUrl }),
    );
    dispatch(getMarketplaceApps());
  }, [dispatch, useTelemetry, kubefirstVersion, k3dDomain, apiUrl]);

  return (
    <Container>
      <Header>
        <Typography variant="h6">Services Overview</Typography>
      </Header>
      <Box sx={{ width: 'fit-content', mb: 4 }}>
        <Tabs value={activeTab} onChange={handleChange} indicatorColor="primary">
          <Tab
            color={activeTab === SERVICES_TABS.PROVISIONED ? BISCAY : SALTBOX_BLUE}
            label={<Typography variant="buttonSmall">Provisioned services</Typography>}
            {...a11yProps(SERVICES_TABS.PROVISIONED)}
            sx={{ textTransform: 'capitalize', mr: 3 }}
          />
          <Tab
            color={activeTab === SERVICES_TABS.MARKETPLACE ? BISCAY : SALTBOX_BLUE}
            label={<Typography variant="buttonSmall">Marketplace</Typography>}
            {...a11yProps(SERVICES_TABS.MARKETPLACE)}
            sx={{ textTransform: 'capitalize' }}
          />
        </Tabs>
      </Box>
      <TabPanel value={activeTab} index={SERVICES_TABS.PROVISIONED}>
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
          {services.map(({ name, ...rest }) => (
            <Service
              key={name}
              name={name}
              {...rest}
              onClickLink={onClickLink}
              domainName={domainName}
            />
          ))}
        </ServicesContainer>
      </TabPanel>
      <TabPanel value={activeTab} index={SERVICES_TABS.MARKETPLACE}>
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
        <Marketplace />
      </TabPanel>
    </Container>
  );
};

export default Services;
