import { between, down, only, up } from '../../utils/breakpoints';

export const screenSizes = ['mobile', 'tablet', 'laptop', 'desktop', 'largeScreen'] as const;
export type ScreenSizes = typeof screenSizes[number];
export type BackgroundType = 'light' | 'dark';
export type Breakpoints = Record<ScreenSizes, number>;
export const palette = [
  'strongRed',
  'strongBlue',
  'strongGreen',
  'strongPurple',
  'strongBrown',
  'strongYellow',
  'strongTurquoise',
  'subtleBrightRed',
  'subtleBrightBlue',
  'subtleBrightGreen',
  'subtleBrightPurple',
  'subtleBrightBrown',
  'subtleDarkBlue',
  'subtleDarkGreen',
  'grey100',
  'grey70',
  'grey40',
  'grey30',
  'grey10',
  'grey5',
  'grey0',
  'white'
] as const;
export type Palette = typeof palette[number];
export type ThemePalette = Record<Palette, string>;

export interface Theme {
  breakpoints: {
    values: Breakpoints;
    keys: typeof screenSizes;
    up: typeof up;
    down: typeof down;
    between: typeof between;
    only: typeof only;
  };
  palette: ThemePalette;
  typography: {
    weight: {
      light: number;
      regular: number;
      medium: number;
      bold: number;
    };
    fontFamily: {
      primary: string;
      secondary: string;
    };
  };
}

export default Theme;
