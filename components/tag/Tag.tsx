import React, { ComponentPropsWithoutRef, FC } from 'react';
import styled from 'styled-components';

import { TagContainer } from './Tag.styled';

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

export interface TagProps extends ComponentPropsWithoutRef<'div'> {
  text: string;
  bgColor?: TagColor;
}

const Tag: FC<TagProps> = ({ text, ...rest }) => <TagContainer {...rest}>{text}</TagContainer>;

export default styled(Tag)``;
