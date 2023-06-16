import React, { FunctionComponent, PropsWithChildren } from 'react';
import Image from 'next/image';

import Tag from '../tag';
import { GitOpsCatalogApp } from '../../types/gitOpsCatalog';
import Button from '../button';
import Typography from '../typography';
import { VOLCANIC_SAND } from '../../constants/colors';

import { App, Card, Categories, Description, Header } from './gitOpsCatalogCard.styled';

export interface gitOpsCatalogCardProps extends GitOpsCatalogApp {
  onClick?: () => void;
  showSubmitButton?: boolean;
}

const gitOpsCatalogCard: FunctionComponent<PropsWithChildren<gitOpsCatalogCardProps>> = ({
  display_name,
  categories,
  image_url,
  description,
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
      <Description variant="body2">{description || children}</Description>
      {showSubmitButton && (
        <Button variant="outlined" color="secondary" onClick={onClick}>
          Install
        </Button>
      )}
    </Card>
  );
};

export default gitOpsCatalogCard;
