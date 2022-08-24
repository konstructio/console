import React, { FunctionComponent } from 'react';

import { TYPES } from '../../enums/typography';
import Text from '../text';

import { Container } from './tag.styled';

const { BODY } = TYPES;

export interface ITagProps {
  backgroundColor: string;
  color?: string;
  children: string;
}

const Tag: FunctionComponent<ITagProps> = ({ backgroundColor, color, children }) => (
  <Container backgroundColor={backgroundColor} color={color} data-testid="tag">
    <Text type={BODY}>{children}</Text>
  </Container>
);

export default Tag;
