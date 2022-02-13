import React from 'react';
import { themedRender } from '../../../test-utils';

import LoadingIndicator from './loading-indicator';

describe('<LoadingIndicator />', () => {
  describe('snapshot', () => {
    it('should match the snapshot', () => {
      const { container } = themedRender(<LoadingIndicator />);

      expect(container).toMatchSnapshot();
    });
  });
});
