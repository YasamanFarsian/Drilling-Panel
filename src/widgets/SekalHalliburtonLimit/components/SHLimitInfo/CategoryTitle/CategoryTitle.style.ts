import { StyleFunction } from '@dt-advisory/styles/theme';
import { css } from '@emotion/react';

export const containerTitleStyle = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const titleLimitsStyle: (isSingleWidget?: boolean) => StyleFunction =
  (isSingleWidget) => (theme) =>
    css`
      display: flex;
      font-size: ${isSingleWidget ? '1.6em' : '0.6vw'};
      font-weight: 700;
      color: ${theme.sekalHalliburtonLimit.infoItem.titleColor};
      padding-right: 1vw;
      align-items: center;
    `;
export const limitsStyle = css`
  display: flex;
  flex: 1;
  justify-content: space-between;
`;
export const minmaxStyle = (isSingleWidget: boolean) => css`
  font-size: ${isSingleWidget ? '1.3em' : '0.43vw'};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
`;
export const maxStyleLabel = css`
  display: flex;
  height: 100%;
  align-items: flex-end;
`;
export const minStyleLabel = css`
  display: flex;
  height: 100%;
  align-items: flex-start;
`;
export const borderlineStyle: StyleFunction = (theme) => css`
  background-color: ${theme.sekalHalliburtonLimit.infoItem.borderColor};
  width: 100%;
  height: 1px;
  display: flex;
`;
