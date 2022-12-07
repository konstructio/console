import React, { FunctionComponent, useCallback } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { StaticImageData } from 'next/image';

import { TYPES } from '../../enums/typography';
import Text from '../text';
import Tag from '../tag';
import ArgoCDLogo from '../../assets/argocd.webp';
import GitLabLogo from '../../assets/gitlab.png';
import GitHubLogo from '../../assets/github.png';
import VaultLogo from '../../assets/vault.png';
import AtlantisLogo from '../../assets/atlantis.png';
import MetaphorLogo from '../../assets/metaphor.png';

import { CardContent, Container, Image, Link, Tags, TextHeader } from './card.styled';

const CARD_IMAGES: { [key: string]: StaticImageData } = {
  ['ArgoCDLogo']: ArgoCDLogo,
  ['GitLabLogo']: GitLabLogo,
  ['GitHubLogo']: GitHubLogo,
  ['VaultLogo']: VaultLogo,
  ['AtlantisLogo']: AtlantisLogo,
  ['MetaphorLogo']: MetaphorLogo,
};

export interface ICardProps {
  appName: string;
  children?: FunctionComponent;
  hostedZoneName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tags: Array<any>;
  links: Array<string>;
  logo: string;
  onClickLink: (url: string, serviceName: string) => void;
  onClickTag: (url: string, serviceName: string) => void;
}

const LOCAL_URL_TRANSFORMS: { [key: string]: string } = {
  'http://localhost:8200/ui/vault/auth?with=userpass': 'http://localhost:8200',
  'http://localhost:8080/applications/argo-workflows-cwfts':
    'http://localhost:8080/applications/argo-cwft-components',
  'http://localhost:8080/applications/argocd': 'http://localhost:8080/applications/argo',
};

const Card: FunctionComponent<ICardProps> = ({
  appName,
  tags,
  links,
  hostedZoneName = '',
  logo,
  onClickLink,
  onClickTag,
}) => {
  const logoImage = CARD_IMAGES[logo];
  const transformLocalValues = (domain: string): string => {
    const transformedDomain = LOCAL_URL_TRANSFORMS[domain];

    return transformedDomain || domain;
  };

  const transformLocalTagUrl = (url: string): string => {
    if (url && url.includes('//localhost')) {
      return transformLocalValues(url);
    }

    return url;
  };

  const getHostname = useCallback(
    (domain: string) => {
      if (domain && domain.includes('//localhost')) {
        return transformLocalValues(domain);
      }

      const { hostname, pathname } =
        domain && domain.includes('http') ? new URL(domain) : { hostname: domain, pathname: '' };

      if (hostedZoneName && hostname && hostname.includes('metaphor')) {
        return hostname.replace(`.${hostedZoneName}`, '');
      } else if (hostname && hostname.includes('github')) {
        return pathname.substring(1);
      }

      return hostname;
    },
    [hostedZoneName],
  );

  return (
    <Container data-testid="card-component">
      <CardContent>
        <Image src={logoImage} alt={appName} />
        <TextHeader>
          <Text type={TYPES.TITLE}>{appName}</Text>
        </TextHeader>
        {links &&
          links.map((domain) => (
            <Link
              href={domain}
              target="_blank"
              key={domain}
              onClick={() => onClickLink(domain, appName)}
            >
              <Text type={TYPES.DISABLED}>{getHostname(domain)}</Text>
              <FiExternalLink />
            </Link>
          ))}
      </CardContent>
      <Tags>
        {tags &&
          tags.map(({ value, url, backgroundColor, color }) => (
            <Tag
              key={value}
              backgroundColor={backgroundColor}
              color={color}
              url={transformLocalTagUrl(url)}
              onClick={() => onClickTag(url, appName)}
            >
              {value}
            </Tag>
          ))}
      </Tags>
    </Container>
  );
};

export default Card;
