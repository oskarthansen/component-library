import { between, down, only, up } from '../../utils/breakpoints';
import Theme, { screenSizes } from '../typings/theme';

export const lightTheme: Theme = {
  breakpoints: {
    values: {
      mobile: 580,
      tablet: 960,
      laptop: 1260,
      desktop: 1320,
      largeScreen: 1920
    },
    keys: screenSizes,
    up: up,
    down: down,
    between: between,
    only: only
  },
  palette: {
    strongRed: '#F8232D',
    strongBlue: '#0A77ED',
    strongGreen: '#25D287',
    strongPurple: '#755FFA',
    strongBrown: '#694F38',
    strongYellow: '#FFDB38',
    strongTurquoise: '#369993',
    subtleBrightRed: '#FFDEE5',
    subtleBrightBlue: '#D4EEFA',
    subtleBrightGreen: '#D3F4E8',
    subtleBrightPurple: '#E3E1FF',
    subtleBrightBrown: '#EEE7E2',
    subtleDarkBlue: '#002B6B',
    subtleDarkGreen: '#103C23',
    grey100: '#323232',
    grey70: '#707070',
    grey40: '#B5B6B8',
    grey30: '#D5D6D8',
    grey10: '#E5E6E8',
    grey5: '#F5F6F8',
    grey0: '#FFFFFF',
    white: '#FFFFFF'
  },
  typography: {
    weight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700
    },
    fontFamily: {
      primary: `'${'ITC Clearface'}', sans-serif`,
      secondary: `'${'Basis Grotesque Pro'}', sans-serif`
    }
  }
};

export default lightTheme;
