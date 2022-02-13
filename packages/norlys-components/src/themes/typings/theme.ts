// import { between, down, only, up } from '../breakpoints';

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
  // breakpoints: {
  //   values: Breakpoints;
  //   keys: typeof screenSizes;
  //   up: typeof up;
  //   down: typeof down;
  //   between: typeof between;
  //   only: typeof only;
  // };
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

// type Colors = Record<string, string>;

// interface Props {
//   colors: Colors;
// }

// const NorlysThemeProvider = (props: Props) => {
//   const { colors } = props;

//   const colorKeys = Object.keys(colors);
//   type ColorKeys = typeof colorKeys[number];
//   type ThemeType = Record<Palette, string>;

//   return { colorKeys, ColorKeys, ThemeType };
// };

// // Idea:
// What if colors in the theme were generic?
// So - you could give a array of theme colors, and the library would then make it
// typesafe to use in components

// 1. Component: <NorlysThemeProvider colors={colors} />
// 2. Props: colors object:
// 3. type Colors = Record<T, string>
