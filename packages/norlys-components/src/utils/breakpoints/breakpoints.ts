import { ScreenSizes, Theme } from '../../themes';

interface Props {
  theme: Theme;
}

export const up =
  (size: ScreenSizes | number) =>
  (props: Props): string => {
    const value = typeof size === 'number' ? size : props.theme.breakpoints.values[size];

    return `@media (min-width:${value}px)`;
  };

export const down =
  (size: ScreenSizes | number) =>
  (props: Props): string => {
    const value = typeof size === 'number' ? size : props.theme.breakpoints.values[size];

    return `@media (max-width:${value}px)`;
  };

export const between =
  (start: ScreenSizes | number, end: ScreenSizes | number) =>
  (props: Props): string => {
    const startValue = typeof start === 'number' ? start : props.theme.breakpoints.values[start];
    const endValue = typeof end === 'number' ? end : props.theme.breakpoints.values[end];

    return `@media (min-width:${startValue}px) and (max-width:${endValue}px)`;
  };

export const only =
  (size: ScreenSizes) =>
  (props: Props): string => {
    const keys = Object.keys(props.theme.breakpoints.values);

    if (keys.indexOf(size) + 1 < keys.length) {
      return between(size, keys[keys.indexOf(size) + 1] as ScreenSizes)(props);
    }

    return up(size)(props);
  };

export const width =
  (size: ScreenSizes) =>
  (props: Props): number => {
    return props.theme.breakpoints.values[size];
  };
