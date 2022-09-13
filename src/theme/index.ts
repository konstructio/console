import { DefaultTheme } from 'styled-components';
export interface ITheme extends DefaultTheme {
  colors: {
    americanGreen: string;
    beluga: string;
    black: string;
    bleachedSilk: string;
    chineseOrange: string;
    danger: string;
    dawnDeparts: string;
    gravelFint: string;
    greenJelly: string;
    naivePeach: string;
    purpleCabbage: string;
    stomyShower: string;
    transparentBlue: string;
    ultimateGrey: string;
    yellowOrange: string;
    white: string;

    // Kubefirst color palette
    americanBlue: string;
    jordyBlue: string;
  };
}

const theme: ITheme = {
  colors: {
    americanBlue: '#3C356C',
    americanGreen: '#3CB53A',
    beluga: '#F1F1F1',
    black: '#000000',
    bleachedSilk: '#F2F2F2',
    chineseOrange: '#F06F3C',
    danger: '#F53A2A',
    dawnDeparts: '#CCF8FE',
    gravelFint: '#BBBBBB',
    greenJelly: '#2E9485',
    jordyBlue: '#7AA5E2',
    naivePeach: '#FDE5D2',
    purpleCabbage: '#3636A1',
    stomyShower: '#0487AF',
    transparentBlue: '#DAD7FE',
    ultimateGrey: '#A9A9A9',
    yellowOrange: '#FAB203',
    white: '#FFFFFF',
  },
};

export default theme;
