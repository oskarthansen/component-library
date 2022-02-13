import React, { PropsWithChildren } from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, Props>(function Button(
  props: PropsWithChildren<Props>,
  ref
) {
  const { children, type = 'button', ...rest } = props;

  return (
    <button ref={ref} type={type} {...rest}>
      {children}
    </button>
  );
});

export default Button;
