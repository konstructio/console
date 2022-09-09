import React, { FunctionComponent, HTMLAttributes, PropsWithChildren } from 'react';

import theme from '../../theme';
import { TYPES, FONT_WEIGHTS, SIZES, SIZE_DEFINITIONS } from '../../enums/typography';

import { TextStyled } from './text.styled';

const { BODY, DISABLED, TITLE, SUBTITLE } = TYPES;

export const TYPOGRAPHIES = {
  [BODY]: {
    color: theme.colors.black,
    ...SIZE_DEFINITIONS[SIZES.S0],
    fontWeight: FONT_WEIGHTS.REGULAR,
  },
  [DISABLED]: {
    color: theme.colors.gravelFint,
    fontWeight: FONT_WEIGHTS.REGULAR,
    ...SIZE_DEFINITIONS[SIZES.S0],
  },
  [TITLE]: {
    color: theme.colors.black,
    ...SIZE_DEFINITIONS[SIZES.S4],
    fontWeight: FONT_WEIGHTS.REGULAR,
  },
  [SUBTITLE]: {
    color: theme.colors.black,
    ...SIZE_DEFINITIONS[SIZES.S1],
    fontWeight: FONT_WEIGHTS.MEDIUM,
  },
};

export interface IText {
  children: JSX.Element | string;
  fontWeight?: FONT_WEIGHTS;
  size?: SIZES;
  style?: React.CSSProperties;
  type?: TYPES;
}

const Text: FunctionComponent<IText> = ({
  children,
  fontWeight,
  size,
  type = TYPES.BODY,
  ...rest
}) => {
  const typography = TYPOGRAPHIES[type] || TYPOGRAPHIES[BODY];
  let typographyProps = {
    ...rest,
    ...typography,
    fontWeight: fontWeight ? fontWeight : typography.fontWeight,
  };

  if (size) {
    typographyProps = {
      ...typographyProps,
      ...SIZE_DEFINITIONS[size],
    };
  }

  return <TextStyled {...typographyProps}>{children}</TextStyled>;
};

export default Text;
