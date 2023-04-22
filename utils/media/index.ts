import { generateMedia } from 'styled-media-query';

import {
  BREAKPOINT_XS,
  BREAKPOINT_SM,
  BREAKPOINT_MD,
  BREAKPOINT_LG,
  BREAKPOINT_XL,
  BREAKPOINT_XXL,
} from '../../constants/breakpoints';

export const media = generateMedia({
  xs: `${BREAKPOINT_XS}px`,
  sm: `${BREAKPOINT_SM}px`,
  md: `${BREAKPOINT_MD}px`,
  lg: `${BREAKPOINT_LG}px`,
  xl: `${BREAKPOINT_XL}px`,
  xxl: `${BREAKPOINT_XXL}px`,
});
