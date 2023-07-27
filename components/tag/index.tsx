import React, { FunctionComponent } from 'react';

import Typography from '../typography';
import checkImageSrc from '../../assets/check-circle.svg';
import autoRenewImageSrc from '../../assets/auto-renew.svg';
import trashImageSrc from '../../assets/trash.svg';
import warningImageSrc from '../../assets/warning.svg';

import { TagContainer, IconImage } from './tag.styled';

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

export const TAG_ICON_OPTONS = {
  'check': checkImageSrc,
  'auto-renew': autoRenewImageSrc,
  'trash': trashImageSrc,
  'warning': warningImageSrc,
};

export type TagColor = (typeof TAG_COLOR_OPTIONS)[number];

export interface TagProps {
  text: string;
  bgColor?: TagColor;
  icon?: keyof typeof TAG_ICON_OPTONS;
}

const Tag: FunctionComponent<TagProps> = ({ text, icon, ...rest }) => (
  <TagContainer {...rest}>
    {icon && <IconImage src={TAG_ICON_OPTONS[icon]} alt={icon} width={16} height={16} />}
    <Typography variant="body3">{text}</Typography>
  </TagContainer>
);

export default Tag;
