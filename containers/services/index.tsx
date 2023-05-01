import React, { FunctionComponent, useEffect, useMemo, useCallback } from 'react';

import { DOCS_LINK } from '../../constants';
import { setConfigValues } from '../../redux/slices/config.slice';
import { GitProvider } from '../../types';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import Service from '../service';
import Typography from '../../components/typography';
import { useTelemetryMutation } from '../../redux/api';

import { Container, Header, LearnMoreLink, ServicesContainer } from './services.styled';

export interface ServicesProps {
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
  const [sendTelemetryEvent] = useTelemetryMutation();

  const isTelemetryEnabled = useAppSelector(({ config }) => config.isTelemetryEnabled);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setConfigValues({ isTelemetryEnabled: useTelemetry, kubefirstVersion, k3dDomain }));
  }, [dispatch, useTelemetry, kubefirstVersion, k3dDomain]);

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

  return (
    <Container>
      <Header>
        <Typography variant="h6">Services Overview</Typography>
        <Typography variant="body2">
          Click on a link to access the service Kubefirst has provisioned for you.{' '}
          <LearnMoreLink
            href={DOCS_LINK}
            target="_blank"
            onClick={() => onClickLink(DOCS_LINK, 'docs')}
          >
            Learn more
          </LearnMoreLink>
        </Typography>
      </Header>
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
    </Container>
  );
};

export default Services;
