import { generateMedia } from 'styled-media-query';

export const BREAKPOINT_XS = 480;
export const BREAKPOINT_SM = 768;
export const BREAKPOINT_MD = 1024;
export const BREAKPOINT_LG = 1280;
export const BREAKPOINT_XL = 1440;
export const BREAKPOINT_XXL = 1820;

export const media = generateMedia({
  xs: `${BREAKPOINT_XS}px`,
  sm: `${BREAKPOINT_SM}px`,
  md: `${BREAKPOINT_MD}px`,
  lg: `${BREAKPOINT_LG}px`,
  xl: `${BREAKPOINT_XL}px`,
  xxl: `${BREAKPOINT_XXL}px`,
});
