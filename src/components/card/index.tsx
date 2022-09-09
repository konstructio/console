import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { FiExternalLink } from 'react-icons/fi';

import useModal from '../../hooks/useModal';
import { TYPES } from '../../enums/typography';
import Text from '../text';
import Tag from '../tag';
import theme from '../../theme';
import Modal from '../modal';
import CardDetails from '../cardDetails';

import { CardContent, Container, Image, Link, Tags, TextHeader, ThreeDots } from './card.styled';

const {
  colors: { bleachedSilk, greenJelly, white },
} = theme;

export interface ICardProps {
  appName: string;
  children?: FunctionComponent;
  companyName?: string;
  hostedZoneName: string;
  links: Array<string>;
  logo: string;
  password: string;
  username: string;
}

const Card: FunctionComponent<ICardProps> = ({
  appName,
  companyName,
  links,
  hostedZoneName = '',
  logo,
  password,
  username,
}) => {
  const { isOpen, openModal, closeModal } = useModal(false);

  const hasCredentials = useMemo(() => username || password, [username, password]);

  const getHostname = useCallback(
    (domain: string) => {
      const { hostname, pathname } =
        domain && domain.includes('http') ? new URL(domain) : { hostname: domain, pathname: '' };

      if (hostedZoneName && hostname && hostname.includes('metaphor')) {
        return hostname.replace(hostedZoneName, '');
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
          {hasCredentials && <ThreeDots onClick={openModal} />}
        </>
      </CardContent>
      <Tags>
        <Tag backgroundColor={bleachedSilk}>Docs</Tag>
        <Tag backgroundColor={greenJelly} color={white}>
          Argo CD
        </Tag>
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
