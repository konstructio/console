import React, { FunctionComponent, useEffect, useMemo } from 'react';

import { setConfigValues } from '../../redux/slices/config.slice';
import { GIT_PROVIDERS } from '../../enums/utils';
import { useTrackMutation } from '../../redux/api';
import { selectIsTelemetryEnabled } from '../../redux/selectors/config.selector';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import Service from '../service';
import Typography from '../../components/typography';

import { Container, Header, LearnMoreLink, ServicesContainer } from './services.styled';

const DOCS_LINK = 'https://docs.kubefirst.io';

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
  const [sendTrackEvent] = useTrackMutation();

  const isTelemetryEnabled = useAppSelector(selectIsTelemetryEnabled());

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setConfigValues({ isTelemetryEnabled: useTelemetry, kubefirstVersion, k3dDomain }));
  }, [dispatch, useTelemetry, kubefirstVersion, k3dDomain]);

  const gitTileProvider = useMemo(
    () => (gitProvider === GIT_PROVIDERS.GITHUB ? 'GitHub' : 'GitLab'),
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
        links: [argoWorkflowsUrl],
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

  const onClickLink = (url: string, name: string) => {
    if (isTelemetryEnabled) {
      const event = `console.${name.toLowerCase()}.link`.replace(/ /g, '');
      sendTrackEvent({ event, properties: { url, type: 'link' } });
    }
  };

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
