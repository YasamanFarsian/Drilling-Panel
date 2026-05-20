import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';

export const containerStyle: (isEmbedded: boolean) => StyleFunction =
  (isEmbedded) => (theme) => css`
    display: flex;
    border: ${isEmbedded ? '0.09259259259vh' : '0.0520835vw'} solid
      ${theme.smartAutoRop.infoItem.borderColor}; //1px on default screen
    border-radius: ${isEmbedded ? '0.3703703704vh' : '0.20833325vw'}; //4px on default screen
    padding: ${isEmbedded ? '0.7407407407vh' : '0.4166665vw'}; //8px on default screen
  `;

export const contentContainerStyle: StyleFunction = () => css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const barStyle: StyleFunction = (theme) => css`
  margin-right: 0.625vw; //12px on default screen
  border-left: 0.104167vw solid ${theme.smartAutoRop.infoItem.barColor}; //2px on default screen
`;

export const barActiveStyle: StyleFunction = (theme) => css`
  border-color: ${theme.smartAutoRop.infoItem.barActiveColor};
`;

export const barInactiveStyle: StyleFunction = (theme) => css`
  border-color: ${theme.smartAutoRop.infoItem.barInactiveColor};
`;

export const infoItemLabelStyle = (isEmbedded: boolean) => css`
  font-weight: 700;
  font-size: ${isEmbedded ? '1.11110vh' : '0.625vw'}; //12px on default screen
  line-height: ${isEmbedded ? '1.38888vh' : '0.78125vw'}; //15px on default screen
`;

export const dataFieldsContainerStyle = css`
  display: flex;
`;

export const dataFieldStyle = (isEmbedded: boolean) => css`
  min-width: ${isEmbedded ? '6.94443vh' : '3.90625vw'}; //75px on default screen
`;

export const dataFieldLabelStyle = (isEmbedded: boolean) => css`
  line-height: ${isEmbedded ? '1.38888vh' : '0.78125vw'}; //15px on default screen
  font-size: ${isEmbedded ? '0.92592vh' : '0.520835vw'}; //10px on default screen
  font-weight: 400;
`;
export const dataFieldRecommendedLabelStyle: StyleFunction = (theme) => css`
  color: ${theme.smartAutoRop.infoItem.dataField.recommendedLabel};
`;

export const dataFieldValueStyle = (isEmbedded: boolean) => css`
  font-weight: 700;
  font-size: ${isEmbedded ? '1.48148vh' : '0.833335vw'}; //16px on default screen
  line-height: ${isEmbedded ? '2.22221vh' : '1.25vw'}; //24px on default screen
`;

export const dataRecommendedValueStyle = (isEmbedded: boolean) => css`
  font-size: ${isEmbedded ? '2.03703vh' : '1.145835vw'}; //22px on default screen
`;

export const dataFieldDividerStyle: (isEmbedded: boolean) => StyleFunction =
  (isEmbedded) => (theme) => css`
    border-left: 0.0520835vw solid ${theme.smartAutoRop.infoItem.dataField.divider}; //1px on default screen
    margin: 0 ${isEmbedded ? '0.7407407407vh' : '0.4166665vw'}; // 0 8px on default screen
  `;
