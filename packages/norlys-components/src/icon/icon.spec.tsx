import React from 'react';
import { themedRender, lightTheme as theme } from '../../test-utils';

import Icon, { sizeWrapper } from './icon';

const children = 'The children';

describe('<Icon />', () => {
  describe('children', () => {
    it('should render out the children inside the icons svg wrapper', () => {
      const { container } = themedRender(<Icon>{children}</Icon>);

      expect(container.firstChild).toHaveTextContent(children);
    });
  });

  describe('color', () => {
    it('should set the correct color on the icon - strong red', () => {
      const { container } = themedRender(<Icon color="strongBlue">{children}</Icon>);

      expect(container.firstChild).toHaveStyleRule('color', theme.palette.strongBlue);
    });

    it('should set the correct color on the icon - secondary', () => {
      const { container } = themedRender(<Icon color="grey30">{children}</Icon>);

      expect(container.firstChild).toHaveStyleRule('color', theme.palette.grey30);
    });

    it('should set the correct color on the icon - inherit', () => {
      const { container } = themedRender(<Icon color="inherit">{children}</Icon>);

      expect(container.firstChild).toHaveStyleRule('color', 'inherit');
    });

    it('should default to inherit', () => {
      const { container } = themedRender(<Icon>{children}</Icon>);

      expect(container.firstChild).toHaveStyleRule('color', 'inherit');
    });
  });

  describe('size', () => {
    it('should set the correct size from a predefined sm size value', () => {
      const size = 'sm';
      const { container } = themedRender(<Icon size={size}>{children}</Icon>);

      expect(container.firstChild).toHaveStyleRule('font-size', sizeWrapper[size]);
    });

    it('should set the correct size from a predefined md size value', () => {
      const size = 'md';
      const { container } = themedRender(<Icon size={size}>{children}</Icon>);

      expect(container.firstChild).toHaveStyleRule('font-size', sizeWrapper[size]);
    });

    it('should set the correct size from a predefined lg size value', () => {
      const size = 'lg';
      const { container } = themedRender(<Icon size={size}>{children}</Icon>);

      expect(container.firstChild).toHaveStyleRule('font-size', sizeWrapper[size]);
    });

    it('should render the font size in pixels, when a number is provided', () => {
      const size = 44;
      const { container } = themedRender(<Icon size={size}>{children}</Icon>);

      expect(container.firstChild).toHaveStyleRule('font-size', `${size}px`);
    });

    it('should default to the md size', () => {
      const { container } = themedRender(<Icon>{children}</Icon>);

      expect(container.firstChild).toHaveStyleRule('font-size', sizeWrapper['md']);
    });
  });

  describe('viewbox', () => {
    it('should set the correct viewbox on the icon', () => {
      const viewBox = '0 0 40 40';
      const { container } = themedRender(<Icon viewBox={viewBox}>{children}</Icon>);

      expect(container.firstChild).toHaveAttribute('viewBox', viewBox);
    });

    it('should default the viewBox to 0 0 20 20', () => {
      const defaultViewBox = '0 0 20 20';
      const { container } = themedRender(<Icon>{children}</Icon>);

      expect(container.firstChild).toHaveAttribute('viewBox', defaultViewBox);
    });
  });

  describe('styles', () => {
    it('should add the correct root styles', () => {
      const styles = {
        root: `
          padding: 10px;
          margin-left: auto;
        `
      };

      const { container } = themedRender(<Icon styles={styles}>{children}</Icon>);

      expect(container.firstChild).toHaveStyleRule('padding', '10px');
      expect(container.firstChild).toHaveStyleRule('margin-left', 'auto');
    });
  });

  describe('rest', () => {
    it('should pass on the rest of the props to the svg element', () => {
      const { container } = themedRender(
        <Icon xmlns="http://www.w3.org/2000/svg" stroke="red">
          {children}
        </Icon>
      );

      expect(container.firstChild).toHaveAttribute('stroke', 'red');
      expect(container.firstChild).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    });
  });
});
