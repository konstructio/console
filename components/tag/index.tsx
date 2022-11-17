import React, { FunctionComponent } from 'react';

import { TYPES } from '../../enums/typography';
import Text from '../text';

import { Container, Link } from './tag.styled';

const { BODY } = TYPES;

export interface ITagProps {
  backgroundColor: string;
  color?: string;
  children: string;
  url: string;
}

const Tag: FunctionComponent<ITagProps> = ({ backgroundColor, color, children, url }) => (
  <Container backgroundColor={backgroundColor} color={color} data-testid="tag">
    <Link href={url} target="_blank">
      <Text type={BODY}>{children}</Text>
    </Link>
  </Container>
);

export default Tag;
