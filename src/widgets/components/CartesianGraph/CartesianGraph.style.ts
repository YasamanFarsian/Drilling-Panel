import { css } from '@emotion/react';

export const containerStyle = (inactive: boolean, inslips: boolean) => css`
  height: 100%;
  opacity: ${inactive || inslips ? 0.5 : 1};
  display: flex;
  justify-content: center;
`;
