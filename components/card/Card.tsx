import React, { ComponentPropsWithoutRef, FC } from 'react';
import styled from 'styled-components';

import { CardContainer } from './Card.styled';

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  active?: boolean;
  withHoverEffect?: boolean;
}

const Card: FC<CardProps> = ({ children, ...rest }) => (
  <CardContainer {...rest}>{children}</CardContainer>
);

export default styled(Card)``;
