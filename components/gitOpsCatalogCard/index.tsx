import React, { FunctionComponent, PropsWithChildren } from 'react';
import Image from 'next/image';
import { Box, CircularProgress } from '@mui/material';

import Tag, { TagColor } from '../tag';
import { AppCategory, GitOpsCatalogApp } from '../../types/gitOpsCatalog';
import Button from '../button';
import Typography from '../typography';
import { VOLCANIC_SAND } from '../../constants/colors';

import {
  App,
  Body,
  Card,
  Category,
  Description,
  Header,
  Installing,
} from './gitOpsCatalogCard.styled';

export const CATEGORY_LABEL_CONFIG: Record<AppCategory, { color: TagColor; label?: string }> = {
  [AppCategory.APP_MANAGEMENT]: { color: 'purple', label: 'App Management' },
  [AppCategory.ARCHITECTURE]: { color: 'pink' },
  [AppCategory.CI_CD]: { color: 'yellow', label: 'CI/CD' },
  [AppCategory.DATABASE]: { color: 'purple' },
  [AppCategory.FIN_OPS]: { color: 'light-blue' },
  [AppCategory.INFRASTRUCTURE]: { color: 'grey' },
  [AppCategory.MONITORING]: { color: 'emerald' },
  [AppCategory.OBSERVABIILITY]: { color: 'light-orange' },
  [AppCategory.SECURITY]: { color: 'dark-sky-blue' },
  [AppCategory.STORAGE]: { color: 'green' },
  [AppCategory.TESTING]: { color: 'neon-green' },
  [AppCategory.QUEUEING]: { color: 'sky-blue' },
  [AppCategory.KUBESHOP]: { color: 'sky-blue' },
};

export type GitOpsCatalogCardProps = PropsWithChildren<GitOpsCatalogApp> & {
  isInstalling?: boolean;
  onClick?: () => void;
  showSubmitButton?: boolean;
};

const GitOpsCatalogCard: FunctionComponent<GitOpsCatalogCardProps> = ({
  display_name,
  category,
  image_url,
  description,
  isInstalling,
  onClick,
  showSubmitButton = true,
  children,
}) => {
  const { color, label } = CATEGORY_LABEL_CONFIG[category ?? AppCategory.APP_MANAGEMENT] ?? [];
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
        {category && (
          <Category>
            <Tag key={category} text={label ?? category} bgColor={color} />
          </Category>
        )}
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
