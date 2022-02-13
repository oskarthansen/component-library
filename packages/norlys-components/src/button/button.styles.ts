import { css } from 'styled-components';
// TODO: Lineheight should be fixed

// Primary button styles

const PRIMARY_BORDER_RADIUS = `22px`;
export const BUTTON_HOVER_SCALE = 'scaleX(1.025) scaleY(1.05)';

interface BaseStylesProps {
  disabled: boolean;
  loading?: boolean;
}

export const baseStyles = css<BaseStylesProps>`
  outline: none;
  border: none;
  cursor: pointer;
  position: relative;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
  border-radius: ${PRIMARY_BORDER_RADIUS};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  letter-spacing: 1px;
  text-align: center;
  text-decoration: none;
  line-height: 18px;
  text-transform: uppercase; // Maybe this should be removed?
  font-size: 14px;
  /* min-width: 160px; // Is this correct? */
  padding: 12px 40px;
  z-index: 1;
  transition: box-shadow 0.1s ease-in;
  box-shadow: ${({ disabled }) => !disabled && '0px 8px 24px rgba(0, 0, 0, 0.16)'};

  ${({ loading, disabled }) =>
    (loading || disabled) &&
    css`
      cursor: default;
      pointer-events: none;
    `};

  ${({ loading, disabled }) =>
    !disabled &&
    !loading &&
    css`
      &:before {
        content: '';
        outline: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        border-radius: ${PRIMARY_BORDER_RADIUS};
        /* transition: all 0.08s ease-in; */
        transition: all 150ms cubic-bezier(0, 0, 0.2, 1) 0ms;
      }

      &:hover {
        border-radius: 24px;
        box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.24);

        &::before {
          border-radius: 24px;
          transform: ${BUTTON_HOVER_SCALE};
        }
      }

      &:active {
        &::before {
          transform: scaleX(1) scaleY(1);
        }
      }
    `}
`;
