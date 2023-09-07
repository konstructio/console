import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

import Typography from '../typography';
import checkImageSrc from '../../assets/check-circle.svg';
import autoRenewImageSrc from '../../assets/auto-renew.svg';
import trashImageSrc from '../../assets/trash.svg';
import warningImageSrc from '../../assets/warning.svg';
import { noop } from '../../utils/noop';

import { TagContainer, IconImage, RemovalButton } from './tag.styled';

export const TAG_COLOR_OPTIONS = [
  'purple',
  'pink',
  'fuscia',
  'yellow',
  'indigo',
  'neon-green',
  'light-orange',
  'light-blue',
  'sky-blue',
  'dark-sky-blue',
  'green',
  'emerald',
  'grey',
] as const;

export const TAG_ICON_OPTONS = {
  'check': checkImageSrc,
  'auto-renew': autoRenewImageSrc,
  'trash': trashImageSrc,
  'warning': warningImageSrc,
};

export type TagColor = (typeof TAG_COLOR_OPTIONS)[number];

const TAG_COLOR_MAP: Record<TagColor | 'none', { bg: string; textColor: string }> = {
  'purple': { bg: '#ede9fe', textColor: '#6d28d9' },
  'pink': { bg: '#fce7f3', textColor: '#be185d' },
  'fuscia': { bg: '#fdf4ff', textColor: '#a21caf' },
  'yellow': { bg: '#fef9c3', textColor: '#a16207' },
  'indigo': { bg: '#e0e7ff', textColor: '#4338ca' },
  'neon-green': { bg: '#ecfccb', textColor: '#4d7c0f' },
  'light-orange': { bg: '#fef3c7', textColor: '#d97706' },
  'light-blue': { bg: '#ecfeff', textColor: '#0e7490' },
  'sky-blue': { bg: '#e0f2fe', textColor: '#0369a1' },
  'dark-sky-blue': { bg: '#dbeafe', textColor: '#1d4ed8' },
  'green': { bg: '#dcfce7', textColor: '#15803d' },
  'emerald': { bg: '#ecfdf5', textColor: '#047857' },
  'grey': { bg: '#f8fafc', textColor: '#71717a' },
  'none': { bg: 'transparent', textColor: '#71717a' },
};

export type TagIconOption = keyof typeof TAG_ICON_OPTONS;

export interface TagProps {
  text: string;
  bgColor?: TagColor;
  icon?: TagIconOption;
  removable?: boolean;
  onRemoval?: (tagText: string) => void;
}

const Tag: FunctionComponent<TagProps> = ({
  text,
  icon,
  removable,
  bgColor,
  onRemoval = noop,
  ...rest
}) => {
  const { bg, textColor } = TAG_COLOR_MAP[bgColor ?? 'none'];
  return (
    <TagContainer bg={bg} textColor={textColor} {...rest}>
      {icon && <IconImage src={TAG_ICON_OPTONS[icon]} alt={icon} width={16} height={16} />}
      <Typography variant="body3">{text}</Typography>
      {removable && (
        <RemovalButton onClick={() => onRemoval(text)}>
          <CloseIcon />
        </RemovalButton>
      )}
    </TagContainer>
  );
};

export default Tag;
