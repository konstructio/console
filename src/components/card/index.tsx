import React, { FunctionComponent, useCallback } from 'react';
import { FiExternalLink } from 'react-icons/fi';

import { TYPES } from '../../enums/typography';
import Text from '../text';
import Tag from '../tag';

import { CardContent, Container, Image, Link, Tags, TextHeader } from './card.styled';

export interface ICardProps {
  appName: string;
  children?: FunctionComponent;
  hostedZoneName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tags: Array<any>;
  links: Array<string>;
  logo: string;
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
}) => {
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
        <Image src={logo} />
        <TextHeader>
          <Text type={TYPES.TITLE}>{appName}</Text>
        </TextHeader>
        {links &&
          links.map((domain) => (
            <Link href={domain} target="_blank" key={domain}>
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
            >
              {value}
            </Tag>
          ))}
      </Tags>
    </Container>
  );
};

export default Card;
