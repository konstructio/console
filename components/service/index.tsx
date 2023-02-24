import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { StaticImageData } from 'next/image';

import ArgoCDLogo from '../../assets/argocd.svg';
import GitLabLogo from '../../assets/gitlab.svg';
import GitHubLogo from '../../assets/github.svg';
import VaultLogo from '../../assets/vault.svg';
import AtlantisLogo from '../../assets/atlantis.svg';
import MetaphorLogo from '../../assets/metaphor.svg';
import Typography from '../typography';
import { formatDomain } from '../../utils/url';
import Tooltip from '../tooltip';

import { Container, Description, Header, Image, Link, Links, Title } from './service.styled';

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
  children?: React.ReactNode;
  name: string;
  links?: Array<string>;
  onClickLink: (link: string, name: string) => void;
}

const Service: FunctionComponent<ServiceProps> = ({
  description,
  children,
  name,
  links,
  onClickLink,
}) => {
  const serviceLogo = useMemo(() => CARD_IMAGES[name], [name]);

  const serviceLink = useCallback(
    (link: string) => (
      <Link key={link} href={link} onClick={() => onClickLink(link, name)} target="_blank">
        <Typography variant="tooltip">{formatDomain(link)}</Typography>
      </Link>
    ),
    [name, onClickLink],
  );

  const linksComponent = useMemo(
    () => (
      <Links>
        {links?.map((link) => {
          const { origin, pathname } = (link?.includes('http') && new URL(link)) || {
            origin: '',
            pathname: '',
          };
          const shouldUseTooltip = pathname.length > 40 || origin.length > 40;
          const linkComponent = serviceLink(link);

          return shouldUseTooltip ? (
            <Tooltip title={link} placement="top">
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
      </Header>
      <Description variant="body2">{description}</Description>
      {links && !children ? linksComponent : children}
    </Container>
  );
};

export default Service;
