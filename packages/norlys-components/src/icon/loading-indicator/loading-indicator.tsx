import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Palette } from '../../themes/typings/theme';
import Icon, { Props as IconProps } from '../icon';

type Globals = 'inherit' | 'initial' | 'revert' | 'unset';
// eslint-disable-next-line @typescript-eslint/ban-types
type Color = Globals | Palette | (string & {});

interface Props extends IconProps {
  duration?: string;
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

interface LoadingIndicatorRootProps {
  color: Color;
  duration: string;
}

// TODO: This works: (props) => <Icon {...props} /> - Why?
// Not working: styled(Icon)
const LoadingIndicatorRoot = styled((props) => <Icon {...props} />)<LoadingIndicatorRootProps>`
  animation: ${({ duration }) =>
    css`
      ${rotate} ${duration} linear infinite
    `};

  ellipse {
    fill: ${({ color }) => color};
  }
`;

export const LoadingIndicator: React.FC<Props & React.SVGProps<SVGElement>> = (props: Props) => {
  const { color = 'white', duration = '0.8s', ...rest } = props;
  return (
    <LoadingIndicatorRoot color={color} duration={duration} {...rest}>
      <ellipse opacity="0.7" cx="18.0002" cy="9.99587" rx="1.99977" ry="1.99976" />
      <ellipse opacity="0.3" cx="2.00024" cy="9.99587" rx="1.99977" ry="1.99976" />
      <ellipse opacity="0.05" cx="16.0002" cy="15.9959" rx="1.99977" ry="1.99976" />
      <ellipse opacity="0.2" cx="4.00415" cy="15.9959" rx="1.99977" ry="1.99976" />
      <ellipse opacity="0.6" cx="16.0002" cy="3.99977" rx="1.99977" ry="1.99976" />
      <ellipse opacity="0.4" cx="4.00415" cy="3.99977" rx="1.99977" ry="1.99976" />
      <ellipse opacity="0.1" cx="10.0042" cy="17.9998" rx="1.99977" ry="1.99976" />
      <ellipse opacity="0.5" cx="10.0042" cy="1.99977" rx="1.99977" ry="1.99976" />
    </LoadingIndicatorRoot>
  );
};

export default LoadingIndicator;
