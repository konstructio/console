import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';

import { CardContainer } from './card.styled';

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  active?: boolean;
  withHoverEffect?: boolean;
}

const Card: FunctionComponent<CardProps> = ({ children, ...rest }) => (
  <CardContainer {...rest}>{children}</CardContainer>
);

export default Card;
