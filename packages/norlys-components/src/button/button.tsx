import { Button as BaseButton } from '@norlys/base-components';
import React, { PropsWithChildren } from 'react';
import styled, {
  css,
  DefaultTheme,
  FlattenInterpolation,
  Interpolation,
  ThemeProps
} from 'styled-components';

import { Palette } from '..';
import LoadingIndicator from '../icon/loading-indicator/loading-indicator';
import Ripple, { ClickEvent } from '../ripple';
import { lightTheme } from '../themes';
import getThemeColorOrString from '../utils/get-theme-color-or-string';
import { baseStyles, BUTTON_HOVER_SCALE } from './button.styles';

// TODO: Implement light and dark themes
type Globals = 'inherit' | 'initial' | 'revert' | 'unset';

// const variant = ['light', 'dark'] as const;
// type Variant = typeof variant[number];
// eslint-disable-next-line @typescript-eslint/ban-types
type Color = Globals | Palette | (string & {});

interface Theme {
  backgroundColor?: {
    default?: Color;
    disabled?: Color;
  };
  textColor?: {
    default?: Color;
    disabled?: Color;
  };
  ripple?: {
    color?: Color;
    opacity?: number;
  };
  loadingSpinnerColor?: {
    default?: Color;
    disabled?: Color;
  };
}

// TODO: Put this function in utils, when package is created
export const convertHexToRGBA = (hexCode: string, opacity: number): string => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity / 100})`;
};

// Lightbutton theme is the default
export const lightButtonTheme = {
  backgroundColor: {
    default: 'subtleDarkGreen',
    disabled: convertHexToRGBA(lightTheme.palette.grey100, 8)
  },
  ripple: {
    color: lightTheme.palette.subtleBrightGreen,
    opacity: 0.2
  },
  textColor: {
    default: 'white',
    disabled: convertHexToRGBA(lightTheme.palette.grey100, 20)
  },
  loadingSpinnerColor: {
    default: 'white',
    disabled: 'grey100'
  }
};

const rippleStyles = css`
  &:hover {
    transform: ${BUTTON_HOVER_SCALE};
  }
  &:active {
    transform: scaleX(1) scaleY(1);
  }
`;

interface ButtonRootProps {
  styles?: string;
  disabled: boolean;
  $backgroundColor: {
    default: Color;
    disabled: Color;
  };
}

// TODO: Documentation: Basestyles is for base styles
// TODO: Other styles, in button.tsx is the styles, that can be customized.
const ButtonRoot = styled(BaseButton)<ButtonRootProps>`
  ${baseStyles}

  background-color: ${({ $backgroundColor, theme }) =>
    getThemeColorOrString($backgroundColor.default, theme)};
  &:before {
    background-color: ${({ $backgroundColor, theme }) =>
      getThemeColorOrString($backgroundColor.default, theme)};
  }
  &:disabled {
    background-color: ${({ $backgroundColor, theme }) =>
      getThemeColorOrString($backgroundColor.disabled, theme)};
  }

  ${({ styles }) => styles};
`;

const ButtonLoadingIndicator = styled((props) => <LoadingIndicator {...props} />)`
  position: absolute;
  left: 10px;
`;

export interface ButtonInnerContentProps {
  disabled: boolean;
  styles?: string;
  textColor: {
    default: Color;
    disabled: Color;
  };
}

const ButtonInnerContent = styled.span<ButtonInnerContentProps>`
  z-index: 1;
  user-select: none;
  color: ${({ textColor, disabled, theme }) =>
    disabled
      ? getThemeColorOrString(textColor.disabled, theme)
      : getThemeColorOrString(textColor.default, theme)};

  ${({ styles }) => styles};
`;
// Todo: Should not forward props. variant, loading
export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  theme?: Theme;
  component?: React.ElementType;
  styles?: {
    root?: string;
    innerContent?: string;
    ripple?: Interpolation<React.CSSProperties> | FlattenInterpolation<ThemeProps<DefaultTheme>>;
  };
}

const Button = React.forwardRef<HTMLButtonElement, Props>(function Button(
  props: PropsWithChildren<Props>,
  ref
) {
  const {
    children,
    type = 'button',
    component,
    loading = false,
    disabled = false,
    styles,
    theme,
    ...rest
  } = props;

  // Overriding the default styles with the provided button theme styles
  const { backgroundColor, ripple, textColor, loadingSpinnerColor }: typeof lightButtonTheme = {
    backgroundColor: {
      ...lightButtonTheme.backgroundColor,
      ...theme?.backgroundColor
    },
    ripple: {
      ...lightButtonTheme.ripple,
      ...theme?.ripple
    },
    textColor: {
      ...lightButtonTheme.textColor,
      ...theme?.textColor
    },
    loadingSpinnerColor: {
      ...lightButtonTheme.loadingSpinnerColor,
      ...theme?.loadingSpinnerColor
    }
  };

  const loadingIndicatorColor = disabled
    ? loadingSpinnerColor.disabled
    : loadingSpinnerColor.default;

  const [clickEvent, setClickEvent] = React.useState<ClickEvent>();

  const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    if (event?.currentTarget) {
      setClickEvent({
        container: event.currentTarget.getBoundingClientRect(),
        pageX: event.pageX,
        pageY: event.pageY
      });
    }
  };

  return (
    <ButtonRoot
      disabled={disabled}
      as={component}
      ref={ref}
      styles={styles?.root}
      type={type}
      onMouseDown={handleMouseDown}
      loading={loading}
      $backgroundColor={backgroundColor}
      {...rest}
    >
      <ButtonInnerContent styles={styles?.innerContent} textColor={textColor} disabled={disabled}>
        {loading && <ButtonLoadingIndicator color={loadingIndicatorColor} />}
        {children}
      </ButtonInnerContent>
      {!loading && (
        <Ripple
          color={ripple.color}
          opacity={ripple.opacity}
          clickEvent={clickEvent}
          styles={styles?.ripple ?? rippleStyles}
        />
      )}
    </ButtonRoot>
  );
});

export default Button;

// TODO: Should we specify proptypes or disable warning?
// TODO: Alternative: https://www.npmjs.com/package/babel-plugin-typescript-to-proptypes
// Button.propTypes = {
//   children: PropTypes.node,
//   loading: PropTypes.bool,
//   type: PropTypes.oneOf(['button', 'submit', 'reset']),
//   component: PropTypes.oneOf<React.ElementType>([]),
//   disabled: PropTypes.bool,
//   styles: PropTypes.object,
//   theme: PropTypes.object
// };
