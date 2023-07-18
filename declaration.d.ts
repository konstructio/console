import 'styled-components';
import '@mui/material/styles';

declare module '*.css' {
  const mapping: Record<string, string>;
  export default mapping;
}

declare module '*.webp' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}

declare module '*.svg' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}

declare module '*.png' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}

declare module '*.html' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}

// /** styled-components Overrides **/
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      americanGreen: string;
      athenaBlue: string;
      beluga: string;
      black: string;
      bleachedSilk: string;
      caribeanSea: string;
      chineseOrange: string;
      danger: string;
      dawnDeparts: string;
      ferntastic: string;
      gravelFint: string;
      gray: string;
      greenJelly: string;
      naivePeach: string;
      purpleCabbage: string;
      stomyShower: string;
      spunPearl: string;
      transparentBlue: string;
      ultimateGrey: string;
      yellowOrange: string;
      white: string;
      lightGrey: string;
      libertyBlue: string;
      fireBrick: string;
      magnolia: string;
      royanPurple: string;
      sefidWhite: string;
      pastelLightBlue: string;
      metro: string;
      exclusivePlum: string;

      // Kubefirst color palette
      americanBlue: string;
      childOfLight: string;
      moonlessMystery: string;
      jordyBlue: string;
      primary: string;
      saltboxBlue: string;
      volcanicSand: string;
      washMe: string;
      whiteSmoke: string;
    };
  }
}

/** MUI Overrides **/
declare module '@mui/material/styles' {
  interface TypographyVariants {
    typography: React.CSSProperties;
    h1: React.CSSProperties;
    h2: React.CSSProperties;
    h3: React.CSSProperties;
    h4: React.CSSProperties;
    h5: React.CSSProperties;
    h6: React.CSSProperties;
    subtitle1: React.CSSProperties;
    subtitle2: React.CSSProperties;
    subtitle3: React.CSSProperties;
    labelLarge: React.CSSProperties;
    labelMedium: React.CSSProperties;
    labelSmall: React.CSSProperties;
    buttonSmall: React.CSSProperties;
    body1: React.CSSProperties;
    body2: React.CSSProperties;
    body3: React.CSSProperties;
    tooltip: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    typography?: React.CSSProperties;
    h1?: React.CSSProperties;
    h2?: React.CSSProperties;
    h3?: React.CSSProperties;
    h4?: React.CSSProperties;
    h5?: React.CSSProperties;
    h6?: React.CSSProperties;
    subtitle1?: React.CSSProperties;
    subtitle2?: React.CSSProperties;
    subtitle3?: React.CSSProperties;
    labelLarge?: React.CSSProperties;
    labelMedium?: React.CSSProperties;
    labelSmall?: React.CSSProperties;
    buttonSmall?: React.CSSProperties;
    body1?: React.CSSProperties;
    body2?: React.CSSProperties;
    body3?: React.CSSProperties;
    tooltip?: React.CSSProperties;
  }
}

declare global {
  namespace Cypress {
    interface Chainable {
      openConsole(): Chainable<void>;
    }
  }
}
