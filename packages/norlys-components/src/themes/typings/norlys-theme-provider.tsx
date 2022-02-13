import React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '..';
// import { between, down, only, up } from '../breakpoints';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const NorlysThemeProvider: React.FC<Props> = (props: Props) => {
  const { children } = props;
  return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
};

export default NorlysThemeProvider;

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
