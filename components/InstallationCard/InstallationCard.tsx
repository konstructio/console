import React, { ComponentPropsWithoutRef, FC } from 'react';
import styled, { css } from 'styled-components';

import { PASTEL_LIGHT_BLUE } from '../../constants/colors';
import Typography from '../typography';
import Column from '../Column/Column';
import { CardOptionInfo } from '../../types';

interface InstallationCardProps extends ComponentPropsWithoutRef<'div'> {
  active: boolean;
  info: CardOptionInfo;
}

const InstallationCard: FC<InstallationCardProps> = ({ active, info, ...rest }) => (
  <Card isActive={active} {...rest}>
    <CartTitle>
      <Typography variant="h6">{info.title}</Typography>
    </CartTitle>
    <CardDescription isActive={active}>
      <Typography variant="body2" sx={{ letterSpacing: 0 }}>
        {info.description}
      </Typography>
    </CardDescription>
  </Card>
);

export default styled(InstallationCard)``;

const Card = styled(Column)<{ isActive: boolean }>`
  background-color: ${({ theme }) => theme.colors.white};
  box-sizing: border-box;
  cursor: pointer;

  align-items: flex-start;
  padding: 20px;
  gap: 10px;

  width: 500px;
  height: 116px;

  border: 1px solid ${PASTEL_LIGHT_BLUE};
  border-radius: 12px;

  ${({ theme, isActive }) =>
    isActive &&
    css`
      border: 2px solid ${theme.colors.primary};
    `}
`;

const CardDescription = styled.div<{ isActive?: boolean }>`
  color: ${({ theme }) => theme.colors.saltboxBlue};
  max-width: 394px;
  letter-spacing: 0 !important;

  ${({ isActive, theme }) =>
    isActive &&
    css`
      color: ${theme.colors.volcanicSand};
    `}
`;

const CartTitle = styled.div``;
