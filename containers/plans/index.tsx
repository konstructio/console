import React, { FunctionComponent } from 'react';
import NextImage from 'next/image';

import { Container, Features } from './plans.styled';

import Typography from '@/components/typography';
import { BISCAY, SALTBOX_BLUE } from '@/constants/colors';
import Button from '@/components/button';
import { Product } from '@/types/product';
import CheckIcon from '@/assets/check.png';

export interface PlanProps {
  isActive?: boolean;
  onClick: () => void;
  product: Product;
}

const Plans: FunctionComponent<PlanProps> = ({ isActive, onClick, product }) => {
  const { name, description, images, metadata, features } = product;

  const { button, featuresTitle, priceLabel } = metadata;

  return (
    <Container isActive={isActive}>
      <img src={images[0]} alt="product" width={32} height={32} />
      <Typography variant="h6" color={BISCAY} sx={{ mt: 2, mb: 2 }}>
        {name}
      </Typography>
      <Typography variant="body2" color={SALTBOX_BLUE} sx={{ mb: 2, height: '38px' }}>
        {description}
      </Typography>
      <Typography variant="subtitle1" color={BISCAY}>
        {priceLabel}
      </Typography>
      <Button
        color="primary"
        variant="contained"
        sx={{ mt: 3, mb: 3, width: '100%' }}
        fullWidth
        disabled={isActive}
        onClick={onClick}
      >
        {isActive ? 'Current plan' : button}
      </Button>
      {featuresTitle && (
        <Typography variant="body2" color={SALTBOX_BLUE} sx={{ mb: 3 }}>
          {featuresTitle}
        </Typography>
      )}
      <Features>
        {features.map((feature, index) => {
          return (
            <Typography
              key={index}
              variant="subtitle3"
              color={BISCAY}
              sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: '12px' }}
            >
              <NextImage alt="check-icon" src={CheckIcon} /> {feature.name}
            </Typography>
          );
        })}
      </Features>
    </Container>
  );
};

export default Plans;
