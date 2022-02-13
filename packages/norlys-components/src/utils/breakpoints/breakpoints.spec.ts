import { up, down, between, only, width } from './breakpoints';
import theme from '../../themes/light-theme';

describe('breakpoints mixin', () => {
  describe('up', () => {
    it('should work for mobile', () => {
      expect(up('mobile')({ theme })).toEqual('@media (min-width:580px)');
    });

    it('should work for tablet', () => {
      expect(up('tablet')({ theme })).toEqual('@media (min-width:960px)');
    });

    it('should work for laptop', () => {
      expect(up('laptop')({ theme })).toEqual('@media (min-width:1260px)');
    });

    it('should work for desktop', () => {
      expect(up('desktop')({ theme })).toEqual('@media (min-width:1320px)');
    });

    it('should work for largeScreen', () => {
      expect(up('largeScreen')({ theme })).toEqual('@media (min-width:1920px)');
    });

    it('should work for number', () => {
      const value = 350;
      expect(up(value)({ theme })).toEqual(`@media (min-width:${value}px)`);
    });
  });

  describe('down', () => {
    it('should work for mobile', () => {
      expect(down('mobile')({ theme })).toEqual('@media (max-width:580px)');
    });

    it('should work for tablet', () => {
      expect(down('tablet')({ theme })).toEqual('@media (max-width:960px)');
    });

    it('should work for laptop', () => {
      expect(down('laptop')({ theme })).toEqual('@media (max-width:1260px)');
    });

    it('should work for desktop', () => {
      expect(down('desktop')({ theme })).toEqual('@media (max-width:1320px)');
    });

    it('should work for largeScreen', () => {
      expect(down('largeScreen')({ theme })).toEqual('@media (max-width:1920px)');
    });

    it('should work for number', () => {
      const value = 350;

      expect(down(value)({ theme })).toEqual(`@media (max-width:${value}px)`);
    });
  });

  describe('between', () => {
    it('should work between two predefined breakpoints', () => {
      expect(between('tablet', 'desktop')({ theme })).toEqual(
        '@media (min-width:960px) and (max-width:1320px)'
      );
    });

    it('should work with two numbers', () => {
      expect(between(300, 700)({ theme })).toEqual(
        '@media (min-width:300px) and (max-width:700px)'
      );
    });

    it('should work with a number and a predefined breakpoint', () => {
      expect(between(300, 'laptop')({ theme })).toEqual(
        '@media (min-width:300px) and (max-width:1260px)'
      );
    });

    it('should work for the largest breakpoints', () => {
      expect(between('desktop', 'largeScreen')({ theme })).toEqual(
        '@media (min-width:1320px) and (max-width:1920px)'
      );
    });
  });

  describe('only', () => {
    it('should work for xs', () => {
      expect(only('mobile')({ theme })).toEqual('@media (min-width:580px) and (max-width:960px)');
    });

    it('should work for tablet', () => {
      expect(only('tablet')({ theme })).toEqual('@media (min-width:960px) and (max-width:1260px)');
    });

    it('should work for laptop', () => {
      expect(only('laptop')({ theme })).toEqual('@media (min-width:1260px) and (max-width:1320px)');
    });

    it('should work for desktop', () => {
      expect(only('desktop')({ theme })).toEqual(
        '@media (min-width:1320px) and (max-width:1920px)'
      );
    });

    it('should work for largeScreen', () => {
      expect(only('largeScreen')({ theme })).toEqual('@media (min-width:1920px)');
    });
  });

  describe('width', () => {
    it('should work for xs', () => {
      expect(width('mobile')({ theme })).toEqual(580);
    });

    it('should work for tablet', () => {
      expect(width('tablet')({ theme })).toEqual(960);
    });

    it('should work for laptop', () => {
      expect(width('laptop')({ theme })).toEqual(1260);
    });

    it('should work for desktop', () => {
      expect(width('desktop')({ theme })).toEqual(1320);
    });

    it('should work for largeScreen', () => {
      expect(width('largeScreen')({ theme })).toEqual(1920);
    });
  });
});
