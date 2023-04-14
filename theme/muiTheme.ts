import { createTheme } from '@mui/material/styles';

import { DANGER, PRIMARY, WHITE } from '../constants/colors';

export const typographies: {
  [key: string]: {
    fontSize: number;
    fontWeight: number;
    lineHeight: string;
    letterSpacing?: number;
    textTransform?: string;
  };
} = {
  h1: {
    fontSize: 57,
    fontWeight: 400,
    lineHeight: '64px',
  },
  h2: {
    fontSize: 45,
    fontWeight: 400,
    lineHeight: '52px',
  },
  h3: {
    fontSize: 36,
    fontWeight: 400,
    lineHeight: '44px',
  },
  h4: {
    fontSize: 32,
    fontWeight: 400,
    lineHeight: '40px',
  },
  h5: {
    fontSize: 28,
    fontWeight: 400,
    lineHeight: '36px',
  },
  h6: {
    fontSize: 24,
    fontWeight: 500,
    lineHeight: '32px',
    letterSpacing: 0.15,
  },
  subtitle1: {
    fontSize: 22,
    fontWeight: 400,
    lineHeight: '28px',
  },
  subtitle2: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: 0.15,
  },
  subtitle3: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: 0.1,
  },
  labelLarge: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '16px',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  labelSmall: {
    fontSize: 11,
    fontWeight: 500,
    lineHeight: '16px',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  buttonSmall: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
    letterSpacing: 0.25,
  },
  body1: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: 0.5,
  },
  body2: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: 0.25,
  },
  body3: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '16px',
    letterSpacing: 0.4,
  },
  tooltip: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '22px',
  },
};

const palleteColors = {
  type: 'light',
  primary: {
    main: PRIMARY,
  },
  secondary: {
    main: WHITE,
  },
  error: {
    main: DANGER,
  },
};

export const muiTheme = createTheme({
  typography: { ...typographies },
  palette: palleteColors,
  components: {
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: () => ({
          height: '40px',
          fontWeight: 600,
          padding: '10px 16px',
          lineHeight: '20px',
          letterSpacing: '0.0025em',
          textTransform: 'capitalize',
          width: 'fit-content',
        }),
      },
    },
  },
});
