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
  onClick: () => void;
}

const Tag: FunctionComponent<ITagProps> = ({ backgroundColor, color, children, url, onClick }) => (
  <Container backgroundColor={backgroundColor} color={color} data-testid="tag" onClick={onClick}>
    <Link href={url} target="_blank">
      <Text type={BODY}>{children}</Text>
    </Link>
  </Container>
);

export default Tag;
