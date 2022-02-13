import 'styled-components';

import { Theme } from './src/themes/typings';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
