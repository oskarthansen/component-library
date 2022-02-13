import 'jest-styled-components';
import React, { ComponentType, ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import { render as rtlRender, RenderOptions, RenderResult } from '../../utils/base-test-utils';
import lightTheme from './src/themes/light-theme';

const themedRender = (ui: ReactElement, options?: RenderOptions): RenderResult => {
  const Wrapper = ({ children }: { children: ReactElement }): ReactElement => {
    return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
  };

  return rtlRender(ui, { wrapper: Wrapper as ComponentType, ...options });
};

export * from '../../utils/base-test-utils';
export { themedRender, lightTheme };
