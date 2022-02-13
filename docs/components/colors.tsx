import React from 'react';
import styled from 'styled-components';
import { lightTheme } from '../../packages/norlys-components/src/themes/light-theme';

const ColorsRoot = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media only screen and (max-width: 932px) {
    display: block;
  }
`;

const Color = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  height: 75px;
  width: 75px;
  border-radius: 10px;
  margin-right: 20px;
  flex-shrink: 0;
`;

const ColorContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 50%;
  margin-bottom: 20px;
`;

const Typo = styled.p`
  font-family: 'Basis Grotesque Pro', sans-serif;

  margin: 5px;
`;

export const Colors = () => {
  const { palette: colors } = lightTheme;

  return (
    <ColorsRoot>
      {Object.keys(colors).map((key, index) => {
        return (
          <ColorContainer key={key + index}>
            <Color color={colors[key]} />
            <div>
              <Typo>
                <strong>HEX:</strong> {colors[key]}
              </Typo>
              <Typo>
                <strong>Name:</strong> {key}
              </Typo>
            </div>
          </ColorContainer>
        );
      })}
    </ColorsRoot>
  );
};

export default Colors;
