import { DefaultTheme } from 'styled-components';
import { palette, Palette } from '../../themes/typings/theme';

// eslint-disable-next-line @typescript-eslint/ban-types
type Color = Palette | (string & {});

export const getThemeColorOrString = <T extends Color>(color: T, theme: DefaultTheme): string => {
  if (palette.includes(color as Palette)) {
    return theme.palette[color as Palette];
  } else {
    return color;
  }
};

export default getThemeColorOrString;
