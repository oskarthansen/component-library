import React from 'react';
import styled from 'styled-components';
import { Palette } from '../themes';
import getThemeColorOrString from '../utils/get-theme-color-or-string';

type Size = 'sm' | 'md' | 'lg' | number;
type Globals = 'inherit' | 'initial' | 'revert' | 'unset';
// eslint-disable-next-line @typescript-eslint/ban-types
type Color = Globals | Palette | (string & {});

export const sizeWrapper = {
  sm: '18px',
  md: '24px',
  lg: '30px'
};

interface StyledIconProps {
  size: Size;
  color: Color;
  styles?: string;
}

export const StyledIcon = styled.svg<StyledIconProps>`
  width: 20px;
  height: 20px;
  fill: currentColor;
  font-size: ${({ size }) => {
    if (typeof size === 'number') return `${size}px`;

    return sizeWrapper[size];
  }};

  color: ${({ color, theme }) => getThemeColorOrString(color, theme)};

  ${({ styles }) => styles};
`;

export interface Props {
  children?: React.ReactNode | React.ReactNode[];
  color?: Color;
  size?: Size;
  viewBox?: string;
  styles?: {
    root?: string;
  };
}

export const Icon: React.FC<Props & React.SVGProps<SVGElement>> = (props: Props) => {
  const {
    children,
    styles,
    color = 'inherit',
    size = 'md',
    viewBox = '0 0 20 20',
    ...rest
  } = props;

  return (
    <StyledIcon viewBox={viewBox} color={color} size={size} styles={styles?.root} {...rest}>
      {children}
    </StyledIcon>
  );
};

export default Icon;
