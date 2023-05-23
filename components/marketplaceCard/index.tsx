import React, { FunctionComponent, PropsWithChildren } from 'react';
import Image from 'next/image';

import Tag from '../tag';
import { MarketplaceApp } from '../../types/marketplace';
import Button from '../../components/button';
import Typography from '../typography';
import { VOLCANIC_SAND } from '../../constants/colors';

import { Card, Description, Header } from './marketplaceCard.styled';

export interface MarketplaceCardProps extends MarketplaceApp {
  onClick?: () => void;
  showSubmitButton?: boolean;
}

const MarketplaceCard: FunctionComponent<PropsWithChildren<MarketplaceCardProps>> = ({
  name,
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
        <Image alt={name} height={28} width={28} src={image_url} style={{ objectFit: 'contain' }} />
        <Typography
          variant="buttonSmall"
          sx={{ textTransform: 'capitalize' }}
          color={VOLCANIC_SAND}
        >
          {name}
        </Typography>
        {categories &&
          categories.map((category) => <Tag key={category} text={category} bgColor="purple" />)}
      </Header>
      <Description variant="body2">{description || children}</Description>
      {showSubmitButton && (
        <Button variant="outlined" color="secondary" onClick={onClick}>
          Add
        </Button>
      )}
    </Card>
  );
};

export default MarketplaceCard;
