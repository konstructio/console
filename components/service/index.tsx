import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { Box, CircularProgress } from '@mui/material';

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

export interface ServiceProps {
  description?: string;
  children?: React.ReactNode;
  image: string;
  name: string;
  links?: { [url: string]: boolean };
  onClickLink: (link: string, name: string) => void;
}

const Service: FunctionComponent<ServiceProps> = ({
  description,
  children,
  image,
  name,
  links,
  onClickLink,
}) => {
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
          <Typography variant="tooltip">{formatDomain(link, isMetaphor)}</Typography>
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
    [isMetaphor, name, onClickLink],
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
        <Image src={image} alt={name} width="32" height="32" />
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
