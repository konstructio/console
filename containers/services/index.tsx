import React, { FunctionComponent, useCallback, useEffect, useMemo } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useInterval } from 'hooks/useInterval';

import { DOCS_LINK } from '../../constants';
import { MINT_GREEN, PASTEL_LIGHT_BLUE } from '../../constants/colors';
import { setConfigValues } from '../../redux/slices/config.slice';
import { GIT_PROVIDERS } from '../../enums/utils';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import Service from '../../components/service/index';
import Typography from '../../components/typography';
import { Link } from '../../components/service/service.styled';
import { formatDomain } from '../../utils/formatDomain';
import { checkReadiness } from '../../redux/thunks/readiness.thunk';
import { sendTrackEvent } from '../../redux/api';

import {
  AppConnector,
  AppIcon,
  Container,
  Header,
  LearnMoreLink,
  MetaphorColumn,
  MetaphorAppsContainer,
  ServicesContainer,
  MetaphorColumnUrls,
} from './services.styled';

export interface ServicesProps {
  argoUrl: string;
  argoWorkflowsUrl: string;
  atlantisUrl: string;
  domainName: string;
  githubOwner: string;
  gitlabOwner: string;
  gitProvider: string;
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
  kubefirstVersion,
  useTelemetry,
  vaultUrl,
  metaphor,
}) => {
  const { isTelemetryEnabled, metaphorUrls } = useAppSelector(({ config, validMetaphorSites }) => ({
    isTelemetryEnabled: config.isTelemetryEnabled,
    metaphorUrls: validMetaphorSites.sites,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setConfigValues({ isTelemetryEnabled: useTelemetry, kubefirstVersion }));
  }, [dispatch, useTelemetry, kubefirstVersion]);

  const gitTileProvider = useMemo(
    () => (gitProvider === GIT_PROVIDERS.GITHUB ? 'GitHub' : 'GitLab'),
    [gitProvider],
  );

  const gitLinks = useMemo(
    () => [
      `https://${gitProvider}.com/${githubOwner || gitlabOwner}/gitops`,
      `https://${gitProvider}.com/${githubOwner || gitlabOwner}/metaphor`,
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
    ],
    [argoUrl, argoWorkflowsUrl, atlantisUrl, gitLinks, gitTileProvider, vaultUrl],
  );

  const metaphorTile = useMemo(
    () => ({
      name: 'Metaphor',
      description: `A multi-environment demonstration space for frontend application best practices that’s easy to apply to other projects.`,
      links: [
        { url: metaphor.development },
        { url: metaphor.staging },
        { url: metaphor.production },
      ],
    }),
    [metaphor.development, metaphor.production, metaphor.staging],
  );

  const onClickLink = useCallback(
    (url: string, name: string) => {
      if (isTelemetryEnabled) {
        const event = `console.${name.toLowerCase()}.link`.replace(/ /g, '');
        sendTrackEvent({ event, properties: { url, type: 'link' } });
      }
    },
    [isTelemetryEnabled],
  );

  const formatMetaphorUrl = (link: string) => {
    const formattedUrl = formatDomain(link);

    return formattedUrl && formattedUrl.replace(`.${domainName}`, '');
  };

  const metaphorDnsResolution = ({ url }: { url: string }) => {
    if (!metaphorUrls.includes(url)) {
      dispatch(checkReadiness(url));
    }
  };

  useInterval(() => metaphorTile.links.map(metaphorDnsResolution), 20000);

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
          <Service key={name} name={name} {...rest} onClickLink={onClickLink} />
        ))}
        <Service
          name={metaphorTile.name}
          description={metaphorTile.description}
          onClickLink={onClickLink}
        >
          <MetaphorAppsContainer>
            <MetaphorColumn>
              {metaphorTile.links.map(({ url }) => (
                <AppIcon
                  key={url}
                  color={metaphorUrls.includes(url) ? MINT_GREEN : PASTEL_LIGHT_BLUE}
                >
                  <AppConnector />
                </AppIcon>
              ))}
            </MetaphorColumn>
            <MetaphorColumnUrls>
              {metaphorTile.links.map(({ url }) => {
                const disabled = !metaphorUrls.includes(url);
                return (
                  url && (
                    <Link
                      key={url}
                      href={url}
                      onClick={(e) => {
                        if (!disabled) {
                          onClickLink(url, 'metaphor');
                        } else {
                          e.preventDefault();
                          e.stopPropagation();
                        }
                      }}
                      disabled={disabled}
                      target="_blank"
                    >
                      <Typography variant="tooltip">{formatMetaphorUrl(url)}</Typography>
                      {disabled && (
                        <Box sx={{ display: 'flex', marginLeft: 2 }}>
                          <CircularProgress size={15} />
                        </Box>
                      )}
                    </Link>
                  )
                );
              })}
            </MetaphorColumnUrls>
          </MetaphorAppsContainer>
        </Service>
      </ServicesContainer>
    </Container>
  );
};

export default Services;
