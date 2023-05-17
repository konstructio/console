import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { StaticImageData } from 'next/image';
import { Box, CircularProgress } from '@mui/material';

import ArgoCDLogo from '../../assets/argocd.svg';
import GitLabLogo from '../../assets/gitlab.svg';
import GitHubLogo from '../../assets/github.svg';
import VaultLogo from '../../assets/vault.svg';
import AtlantisLogo from '../../assets/atlantis.svg';
import MetaphorLogo from '../../assets/metaphor.svg';
import Typography from '../typography';
import { formatDomain } from '../../utils/url/formatDomain';
import Tooltip from '../tooltip';
import { MINT_GREEN, PASTEL_LIGHT_BLUE } from '../../constants/colors';

import {
  AppConnector,
  Container,
  Description,
  Header,
  Image,
  Link,
  Links,
  LiveAppIcon,
  Title,
} from './service.styled';

const CARD_IMAGES: { [key: string]: StaticImageData } = {
  ['Argo CD']: ArgoCDLogo,
  ['Argo Workflows']: ArgoCDLogo,
  ['GitLab']: GitLabLogo,
  ['GitHub']: GitHubLogo,
  ['Vault']: VaultLogo,
  ['Atlantis']: AtlantisLogo,
  ['Metaphor']: MetaphorLogo,
};

export interface ServiceProps {
  description?: string;
  domainName: string;
  children?: React.ReactNode;
  name: string;
  links?: { [url: string]: boolean };
  onClickLink: (link: string, name: string) => void;
}

const Service: FunctionComponent<ServiceProps> = ({
  description,
  domainName,
  children,
  name,
  links,
  onClickLink,
}) => {
  const serviceLogo = useMemo(() => CARD_IMAGES[name], [name]);
  const isMetaphor = useMemo(() => name === 'Metaphor', [name]);

  const serviceLink = useCallback(
    (link: string, isAvailable?: boolean) => {
      return link ? (
        <Link
          key={link}
          href={link}
          onClick={(e) => {
            if (isAvailable) {
              onClickLink(link, name);
            } else {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          target="_blank"
          disabled={!isAvailable}
        >
          <LiveAppIcon color={isAvailable ? MINT_GREEN : PASTEL_LIGHT_BLUE}>
            {isMetaphor && <AppConnector />}
          </LiveAppIcon>
          <Typography variant="tooltip">{formatDomain(link, domainName)}</Typography>
          {!isAvailable && (
            <Box sx={{ display: 'flex', marginLeft: 2 }}>
              <CircularProgress size={15} />
            </Box>
          )}
        </Link>
      ) : (
        <div />
      );
    },
    [domainName, isMetaphor, name, onClickLink],
  );

  const linksComponent = useMemo(
    () => (
      <Links>
        {links &&
          Object.keys(links)?.map((url) => {
            const isAvailable = links[url];
            const { origin, pathname } = (url?.includes('http') && new URL(url)) || {
              origin: '',
              pathname: '',
            };
            const shouldUseTooltip = pathname.length > 40 || origin.length > 40;
            const linkComponent = serviceLink(url, isAvailable);

            return shouldUseTooltip ? (
              <Tooltip title={url} placement="top" key={url}>
                {linkComponent}
              </Tooltip>
            ) : (
              linkComponent
            );
          })}
      </Links>
    ),
    [links, serviceLink],
  );

  return (
    <Container>
      <Header>
        <Image src={serviceLogo} alt={name} width="24" />
        <Title variant="subtitle2">{name}</Title>
        {/* <NextImage
          src={`https://argocd.mgmt-20.kubefirst.com/api/badge?name=${name.toLowerCase()}`}
          width={120}
          height={20}
          alt={name}
        /> */}
      </Header>
      <Description variant="body2">{description}</Description>
      {links && !children ? linksComponent : children}
    </Container>
  );
};

export default Service;
