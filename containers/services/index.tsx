import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { Box, CircularProgress } from '@mui/material';

import { setConfigValues } from '../../redux/slices/config.slice';
import { GIT_PROVIDERS } from '../../enums/utils';
import { useTrackMutation } from '../../redux/api';
import { selectIsTelemetryEnabled } from '../../redux/selectors/config.selector';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import Service from '../../components/service/index';
import Typography from '../../components/typography';
import { Link } from '../../components/service/service.styled';
import { formatDomain } from '../../utils/url';
import { checkReadiness } from '../../redux/actions/readiness.action';
import { selectMetaphorValidUrls } from '../../redux/selectors/readiness.selector';

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

const DOCS_LINK = 'https://docs.kubefirst.io';

export interface ServicesProps {
  argoUrl: string;
  argoWorkflowsUrl: string;
  atlantisUrl: string;
  domainName: string;
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
  gitProvider,
  kubefirstVersion,
  useTelemetry,
  vaultUrl,
  metaphor,
}) => {
  const [sendTrackEvent] = useTrackMutation();

  const isTelemetryEnabled = useAppSelector(selectIsTelemetryEnabled());
  const metaphorUrls = useAppSelector(selectMetaphorValidUrls());

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setConfigValues({ isTelemetryEnabled: useTelemetry, kubefirstVersion }));
  }, [dispatch, useTelemetry, kubefirstVersion]);

  const gitTileProvider = useMemo(
    () => (gitProvider === GIT_PROVIDERS.GITHUB ? 'GitHub' : 'GitLab'),
    [gitProvider],
  );

  const gitLinks = useMemo(
    () =>
      gitProvider === GIT_PROVIDERS.GITHUB
        ? ['https://github.com/kubefirst/gitops', 'https://github.com/kubefirst/metaphor-frontend']
        : [`https://gitlab.${domainName}`],
    [gitProvider, domainName],
  );

  const services = useMemo(
    () => [
      {
        name: 'Argo CD',
        description: `A GitOps oriented continuous delivery tool for managing all of our applications across our
  kubernetes clusters.`,
        links: [argoUrl],
      },
      {
        name: gitTileProvider,
        description: `The ${gitTileProvider} repository contains all the Infrastructure as Code and GitOps configurations.`,
        links: gitLinks,
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
        name: 'Vault',
        description: `Kubefirst’s secrets manager and identity provider.`,
        links: [vaultUrl],
      },
    ],
    [argoUrl, argoWorkflowsUrl, atlantisUrl, gitLinks, gitTileProvider, vaultUrl],
  );

  const metaphorTile = useMemo(
    () => ({
      name: 'Metaphor',
      description: `A multi-environment demonstration space for frontend application best practices that’s easy to apply to other projects.`,
      links: [
        { url: metaphor?.development, color: '#E2E8F0' },
        { url: metaphor?.staging, color: '#FCD34D' },
        { url: metaphor?.production, color: '#BBF7D0' },
      ],
    }),
    [metaphor?.development, metaphor?.production, metaphor?.staging],
  );

  const onClickLink = (url: string, name: string) => {
    if (isTelemetryEnabled) {
      const event = `console.${name.toLowerCase()}.link`.replace(/ /g, '');
      sendTrackEvent({ event, properties: { url, type: 'link' } });
    }
  };

  const formatMetaphorUrl = (link: string) => {
    const formattedUrl = formatDomain(link);

    return formattedUrl && formattedUrl.replace(`.${domainName}`, '');
  };

  const metaphorDnsResolution = async ({ url }: { url: string }) => {
    if (!metaphorUrls.includes(url)) {
      dispatch(checkReadiness({ url }));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => metaphorTile.links.map(metaphorDnsResolution), 20000);
    return () => clearInterval(interval);
  });

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
              {metaphorTile.links.map(({ color, url }) => (
                <AppIcon key={url} color={color}>
                  <AppConnector />
                </AppIcon>
              ))}
            </MetaphorColumn>
            <MetaphorColumnUrls>
              {metaphorTile.links.map(({ url }) => {
                const isDisabled = !metaphorUrls.includes(url);
                return (
                  url && (
                    <Link
                      key={url}
                      href={url}
                      onClick={(e) => {
                        if (!isDisabled) {
                          onClickLink(url, 'metaphor');
                        } else {
                          e.preventDefault();
                          e.stopPropagation();
                        }
                      }}
                      disabled={isDisabled}
                      target="_blank"
                    >
                      <Typography variant="tooltip">{formatMetaphorUrl(url)}</Typography>
                      {isDisabled && (
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
