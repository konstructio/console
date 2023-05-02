import React, { FunctionComponent } from 'react';

import { TagContainer } from './tag.styled';

export const TAG_COLOR_OPTIONS = [
  'neon-green',
  'light-orange',
  'pink',
  'light-blue',
  'sky-blue',
  'dark-sky-blue',
  'purple',
  'yellow',
  'green',
] as const;

export type TagColor = (typeof TAG_COLOR_OPTIONS)[number];

export interface TagProps {
  text: string;
  bgColor?: TagColor;
}

const Tag: FunctionComponent<TagProps> = ({ text, ...rest }) => (
  <TagContainer {...rest} variant="body3">
    {text}
  </TagContainer>
);

export default Tag;
