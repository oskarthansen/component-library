import React from 'react';
import { themedRender, screen, userEvent } from '../../test-utils';
import Button from './button';
const children = 'the children';

describe('<Button />', () => {
  describe('children', () => {
    it('should render out the children inside the button', () => {
      const { container } = themedRender(<Button>{children}</Button>);

      expect(container.firstChild).toHaveTextContent(children);
    });
  });

  describe('type', () => {
    it('should set the correct type on the button', () => {
      const type = 'submit';
      const { container } = themedRender(<Button type={type}>{children}</Button>);

      expect(container.firstChild).toHaveAttribute('type', type);
    });

    it('should default to the button type', () => {
      const { container } = themedRender(<Button>{children}</Button>);

      expect(container.firstChild).toHaveAttribute('type', 'button');
    });
  });

  describe('ref', () => {
    it('should forward ref to the button', () => {
      const buttonRef = React.createRef<HTMLButtonElement>();
      const { container } = themedRender(<Button ref={buttonRef}>{children}</Button>);

      expect(container.firstChild).toBe(buttonRef.current);
    });
  });

  describe('disabled', () => {
    it('should default to false', () => {
      themedRender(<Button>{children}</Button>);

      const button = screen.getByRole('button', { name: /children/i });

      expect(button).not.toHaveAttribute('disabled');
    });
  });

  describe('onClick', () => {
    it('should call the onClick prop, when the button is clicked', () => {
      const onClick = jest.fn();
      themedRender(<Button onClick={onClick}>{children}</Button>);

      const button = screen.getByRole('button', { name: /children/i });

      if (!button) return;

      userEvent.click(button);

      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('rest', () => {
    it('should forward the rest of the props to the button', () => {
      const name = 'some name';
      const style = { color: 'red' };

      const { container } = themedRender(
        <Button name={name} style={style}>
          {children}
        </Button>
      );

      expect(container.firstChild).toHaveAttribute('name', name);
      expect(container.firstChild).toHaveStyle('color: red');
    });
  });
});
