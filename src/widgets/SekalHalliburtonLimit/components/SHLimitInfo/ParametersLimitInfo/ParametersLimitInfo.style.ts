import { StyleFunction } from '@dt-advisory/styles/theme';
import { css } from '@emotion/react';

export const dataInfoStyle: StyleFunction = (theme) => css`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${theme.sekalHalliburtonLimit.infoItem.backgroundColor};
  padding: 0.4vw;
  box-sizing: border-box;
  height: auto;
  gap: 0.6vh 0.35vw;
  border-radius: 0.8em;
`;

export const paramContainer: (
  isCombined?: boolean,
  islargerFont?: boolean,
  isSingleWidget?: boolean,
) => StyleFunction =
  (isCombined = false, islargerFont = false, isSingleWidget) =>
  (theme) =>
    css`
      background: ${theme.sekalHalliburtonLimit.infoItem.dataBackgroundColor};
      border: 1px solid
        ${isCombined
          ? `${theme.sekalHalliburtonLimit.infoItem.borderCombinedColor}`
          : `${theme.sekalHalliburtonLimit.infoItem.borderColor}`};
      border-radius: 0.7rem;
      font-weight: ${isCombined ? '700' : '400'};
      line-height: ${isCombined ? '1.5em' : '2.1em'};
      font-size: ${islargerFont
        ? isSingleWidget
          ? '1.75vw'
          : '0.65vw'
        : isSingleWidget
        ? '1.5vw'
        : '0.6vw'};
      flex-grow: 1;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      text-align: center;
    `;
export const maxMinValueStyle = css`
  width: 100%;
  padding: 0 0.8em;
`;

export const parameterTitleStyle = (isSingleWidget: boolean) => css`
  font-size: ${isSingleWidget ? '1.3vw' : '0.5vw'};
  text-align: center;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const borderlineStyle: StyleFunction = (theme) => css`
  background-color: ${theme.sekalHalliburtonLimit.infoItem.borderColor};
  width: 100%;
  height: 1px;
`;
