import React, { FunctionComponent, PropsWithChildren } from 'react';
import Image from 'next/image';
import { Box, CircularProgress } from '@mui/material';

import Tag from '../tag';
import { GitOpsCatalogApp } from '../../types/gitOpsCatalog';
import Button from '../button';
import Typography from '../typography';
import { VOLCANIC_SAND } from '../../constants/colors';

import {
  App,
  Body,
  Card,
  Categories,
  Description,
  Header,
  Installing,
} from './gitOpsCatalogCard.styled';

export interface GitOpsCatalogCardProps extends GitOpsCatalogApp {
  isInstalling?: boolean;
  onClick?: () => void;
  showSubmitButton?: boolean;
}

const GitOpsCatalogCard: FunctionComponent<PropsWithChildren<GitOpsCatalogCardProps>> = ({
  display_name,
  categories,
  image_url,
  description,
  isInstalling,
  onClick,
  showSubmitButton = true,
  children,
}) => {
  return (
    <Card>
      <Header>
        <App>
          <Image
            alt={display_name}
            height={32}
            width={32}
            src={image_url}
            style={{ objectFit: 'contain' }}
          />
          <Typography
            variant="subtitle2"
            sx={{ textTransform: 'capitalize', fontWeight: 600 }}
            color={VOLCANIC_SAND}
          >
            {display_name}
          </Typography>
        </App>
        <Categories>
          {categories &&
            categories.map((category) => <Tag key={category} text={category} bgColor="purple" />)}
        </Categories>
      </Header>
      <Body>
        <Description variant="body2">{description || children}</Description>
        {showSubmitButton && !isInstalling && (
          <Button variant="outlined" color="secondary" onClick={onClick}>
            Install
          </Button>
        )}
        {isInstalling && (
          <Installing>
            <Box sx={{ display: 'flex' }}>
              <CircularProgress size={20} />
            </Box>
            <Typography variant="body2" color={VOLCANIC_SAND}>
              Please wait a few moments while we finish installing your app.
            </Typography>
          </Installing>
        )}
      </Body>
    </Card>
  );
};

export default GitOpsCatalogCard;
