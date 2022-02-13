import React from 'react';
import { render, screen, userEvent } from '../../test-utils';
import Button from './button';

const children = 'the children';

describe('<Button />', () => {
  describe('children', () => {
    it('should render out the children inside the button', () => {
      const { container } = render(<Button>{children}</Button>);

      expect(container.firstChild).toHaveTextContent(children);
    });
  });

  describe('type', () => {
    it('should set the correct type on the button', () => {
      const type = 'submit';
      const { container } = render(<Button type={type}>{children}</Button>);

      expect(container.firstChild).toHaveAttribute('type', type);
    });

    it('should default to the button type', () => {
      const { container } = render(<Button>{children}</Button>);

      expect(container.firstChild).toHaveAttribute('type', 'button');
    });
  });

  describe('ref', () => {
    it('should forward ref to the button', () => {
      const buttonRef = React.createRef<HTMLButtonElement>();
      const { container } = render(<Button ref={buttonRef}>{children}</Button>);

      expect(container.firstChild).toBe(buttonRef.current);
    });
  });

  describe('disabled', () => {
    it('should disable the button, if the disabled prop is true', () => {
      const onClick = jest.fn();
      render(
        <Button onClick={onClick} disabled>
          {children}
        </Button>
      );

      const button = screen.getByRole('button', { name: /children/i });
      userEvent.click(button);

      expect(button).toHaveAttribute('disabled');
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should default to false', () => {
      render(<Button>{children}</Button>);

      const button = screen.getByRole('button', { name: /children/i });

      expect(button).not.toHaveAttribute('disabled');
    });
  });

  describe('onClick', () => {
    it('should call the onClick prop, when the button is clicked', () => {
      const onClick = jest.fn();
      render(<Button onClick={onClick}>{children}</Button>);

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

      const { container } = render(
        <Button name={name} style={style}>
          {children}
        </Button>
      );

      expect(container.firstChild).toHaveAttribute('name', name);
      expect(container.firstChild).toHaveStyle('color: red');
    });
  });
});
