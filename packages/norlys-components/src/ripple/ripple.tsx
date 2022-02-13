import React from 'react';
import styled, {
  DefaultTheme,
  FlattenInterpolation,
  Interpolation,
  ThemeProps
} from 'styled-components';

const RippleRoot = styled.div<Props>`
  ${({ styles }) => styles}

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  overflow: hidden;
  border-radius: inherit;

  span {
    transform: scale(0);
    border-radius: 100%;
    position: absolute;
    opacity: ${(props) => props.opacity};
    background-color: ${(props) => props.color};
    animation-name: ripple;
    animation-duration: ${(props) => props.duration}ms;
  }

  @keyframes ripple {
    to {
      opacity: 0;
      transform: scale(2);
    }
  }
`;

const useDebouncedRippleCleanUp = (
  rippleCount: number,
  duration: number,
  cleanUpFunction: { (): void }
) => {
  const bounceRef = React.useRef<NodeJS.Timeout>();

  React.useLayoutEffect(() => {
    let bounceTimer = bounceRef.current as NodeJS.Timeout;
    if (rippleCount > 0) {
      clearTimeout(bounceTimer);

      bounceTimer = setTimeout(() => {
        cleanUpFunction();
        clearTimeout(bounceTimer);
      }, duration * 4);
    }

    return () => clearTimeout(bounceTimer);
  }, [rippleCount, duration, cleanUpFunction]);
};

interface Props {
  color?: string;
  duration?: number;
  opacity?: number;
  clickEvent?: ClickEvent;
  styles?: Interpolation<React.CSSProperties> | FlattenInterpolation<ThemeProps<DefaultTheme>>;
}

const Ripple: React.FC<Props> = (props: Props) => {
  const { color, duration = 1000, opacity = 1, clickEvent, styles } = props;
  const [rippleArray, setRippleArray] = React.useState<RippleDef[]>([]);

  useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
    setRippleArray([]);
  });

  const addRipple = (clickEvent: ClickEvent) => {
    const rippleContainer = clickEvent.container;

    const size =
      rippleContainer.width > rippleContainer.height
        ? rippleContainer.width
        : rippleContainer.height;
    const x = clickEvent.pageX - window.scrollX - rippleContainer.x - size / 2;
    const y = clickEvent.pageY - window.scrollY - rippleContainer.y - size / 2;

    const newRipple: RippleDef = { x, y, size };

    setRippleArray((oldRipples) => [...oldRipples, newRipple]);
  };

  const handleOnMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    if (!clickEvent) {
      addRipple({
        container: event.currentTarget.getBoundingClientRect(),
        pageX: event.pageX,
        pageY: event.pageY
      });
    }
  };

  React.useEffect(() => {
    if (clickEvent) {
      addRipple(clickEvent);
    }
  }, [clickEvent]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <RippleRoot
      duration={duration}
      color={color}
      opacity={opacity}
      styles={styles}
      onMouseDown={handleOnMouseDown}
    >
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => {
          return (
            <span
              key={'span' + index}
              style={{
                top: ripple.y || 0,
                left: ripple.x || 0,
                width: ripple.size,
                height: ripple.size
              }}
            />
          );
        })}
    </RippleRoot>
  );
};

export interface ClickEvent {
  container: DOMRect;
  pageX: number;
  pageY: number;
}

interface RippleDef {
  x: number;
  y: number;
  size: number;
}

export default Ripple;
