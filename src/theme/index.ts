import { DefaultTheme } from 'styled-components';
export interface ITheme extends DefaultTheme {
  colors: {
    americanGreen: string;
    beluga: string;
    black: string;
    bleachedSilk: string;
    danger: string;
    dawnDeparts: string;
    gravelFint: string;
    naivePeach: string;
    transparentBlue: string;
    ultimateGrey: string;
    yellowOrange: string;
    white: string;
  };
}

const theme: ITheme = {
  colors: {
    americanGreen: '#3CB53A',
    beluga: '#F1F1F1',
    black: '#000000',
    bleachedSilk: '#F2F2F2',
    danger: '#F53A2A',
    dawnDeparts: '#CCF8FE',
    gravelFint: '#BBBBBB',
    naivePeach: '#FDE5D2',
    transparentBlue: '#DAD7FE',
    ultimateGrey: '#A9A9A9',
    yellowOrange: '#FAB203',
    white: '#FFFFFF',
  },
};

export default theme;
