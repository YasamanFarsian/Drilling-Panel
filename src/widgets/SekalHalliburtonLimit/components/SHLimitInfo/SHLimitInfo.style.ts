import { css } from '@emotion/react';

export const containerStyle = css`
  display: flex;
  width: 100%;
  gap: 0 0.4vw;
  height: 100%;
`;
export const containerBoxStyle = css`
  display: flex;
  flex: 1;
  gap: 0 0.4vw;
  display: flex;
`;
export const containerTitleStyle = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const firstTitleColStyle = (isSingleWidget: boolean) => css`
  min-height: ${isSingleWidget ? '5vh' : '2.5vh'};
`;
