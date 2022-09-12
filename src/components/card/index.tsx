import React, { FunctionComponent, useCallback } from 'react';
import { FiExternalLink } from 'react-icons/fi';

import useModal from '../../hooks/useModal';
import { TYPES } from '../../enums/typography';
import Text from '../text';
import Tag from '../tag';
import theme from '../../theme';
import CardDetails from '../cardDetails';

import { CardContent, Container, Image, Link, Tags, TextHeader } from './card.styled';

const {
  colors: { bleachedSilk, greenJelly, white },
} = theme;

export interface ICardProps {
  appName: string;
  children?: FunctionComponent;
  companyName?: string;
  hostedZoneName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tags: Array<any>;
  links: Array<string>;
  logo: string;
  password: string;
  username: string;
}

const Card: FunctionComponent<ICardProps> = ({
  appName,
  companyName,
  tags,
  links,
  hostedZoneName = '',
  logo,
  password,
  username,
}) => {
  const { isOpen, closeModal } = useModal(false);

  const getHostname = useCallback(
    (domain: string) => {
      const { hostname, pathname } =
        domain && domain.includes('http') ? new URL(domain) : { hostname: domain, pathname: '' };

      if (hostedZoneName && hostname && hostname.includes('metaphor')) {
        return hostname.replace(`.${hostedZoneName}`, '');
      } else if (hostname && hostname.includes('github')) {
        return `${hostname}${pathname}`;
      }

      return hostname;
    },
    [hostedZoneName],
  );

  return (
    <Container>
      <CardContent>
        <>
          <Image src={logo} />
          <TextHeader>
            <Text type={TYPES.TITLE}>{appName}</Text>
          </TextHeader>
          {links.map((domain) => (
            <Link href={domain} target="_blank" key={domain}>
              <Text type={TYPES.DISABLED}>{getHostname(domain)}</Text>
              <FiExternalLink />
            </Link>
          ))}
        </>
      </CardContent>
      <Tags>
        {tags.map(({ value, url, backgroundColor, color }) => (
          <Tag key={value} backgroundColor={backgroundColor} color={color} url={url}>
            {value}
          </Tag>
        ))}
      </Tags>
      {isOpen && (
        <CardDetails
          userName={username}
          password={password}
          appName={appName}
          links={links}
          logo={logo}
          companyName={companyName}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      )}
    </Container>
  );
};

export default Card;
