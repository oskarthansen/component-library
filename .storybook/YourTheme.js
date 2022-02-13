import { create } from '@storybook/theming';
import stellarLogo from './public/images/stellar-logo.png';


export default create({
  base: 'light',
  brandTitle: 'Stellar',
  brandImage: stellarLogo,
  appBg: 'white',
  barBg: 'white',
  inputBg: 'white',
  appContentBg: 'white',

});