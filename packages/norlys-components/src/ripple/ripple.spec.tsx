import React from 'react';

import { render, fireEvent } from '../../test-utils';

import Ripple from './ripple';

describe('<Ripple />', () => {
  describe('active ripples', () => {
    it('should have no active ripples initially', () => {
      const { container } = render(<Ripple />);
      const ripples = container.querySelectorAll('span');

      expect(ripples.length).toBe(0);
    });

    it('should add ripples on click events', () => {
      const { container } = render(<Ripple />);

      fireEvent.mouseDown(container.firstChild);

      expect(container.querySelectorAll('span').length).toBe(1);

      fireEvent.mouseDown(container.firstChild);

      expect(container.querySelectorAll('span').length).toBe(2);
    });
  });

  describe('color', () => {
    it('should have no color by default', () => {
      const { container } = render(<Ripple />);

      fireEvent.mouseDown(container.firstChild);

      const ripple = container.querySelector('span');

      expect(ripple).not.toHaveStyleRule('background-color');
    });

    it('should use the specified color', () => {
      const color = '#f00';
      const { container } = render(<Ripple color={color} />);

      fireEvent.mouseDown(container.firstChild);

      const ripple = container.querySelector('span');

      expect(ripple).toHaveStyle(`background-color: ${color}`);
    });
  });

  describe('opacity', () => {
    it('should use the default opacity if none is specified', () => {
      const defaultOpacity = 1;
      const { container } = render(<Ripple />);

      fireEvent.mouseDown(container.firstChild);

      const ripple = container.querySelector('span');

      expect(ripple).toHaveStyle(`opacity: ${defaultOpacity}`);
    });

    it('should use the specified opacity', () => {
      const opacity = 0.5;
      const { container } = render(<Ripple opacity={opacity} />);

      fireEvent.mouseDown(container.firstChild);

      const ripple = container.querySelector('span');

      expect(ripple).toHaveStyle(`opacity: ${opacity}`);
    });
  });

  describe('duration', () => {
    it('should use the default duration if none is specified', () => {
      const defaultDuration = 1000;
      const { container } = render(<Ripple />);

      fireEvent.mouseDown(container.firstChild);

      const ripple = container.querySelector('span');

      expect(ripple).toHaveStyle(`animation-duration: ${defaultDuration}ms`);
    });

    it('should use the specified duration', () => {
      const duration = 5000;
      const { container } = render(<Ripple duration={duration} />);

      fireEvent.mouseDown(container.firstChild);

      const ripple = container.querySelector('span');

      expect(ripple).toHaveStyle(`animation-duration: ${duration}ms`);
    });
  });

  describe('parent click events', () => {
    it('should trigger a ripple if parent parses a click event', () => {
      const clickEvent = {
        container: {
          height: 0,
          width: 0,
          x: 0,
          y: 0,
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          toJSON: null
        },
        pageX: 0,
        pageY: 0
      };

      const { container } = render(<Ripple clickEvent={clickEvent} />);

      const ripples = container.querySelectorAll('span');

      expect(ripples.length).toBe(1);
    });
  });
});
