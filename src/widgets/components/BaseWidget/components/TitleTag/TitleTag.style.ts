import { css } from '@emotion/react';
import { RoadmapModelType } from '@dt-advisory/store/Settings';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVh, scalePxAsVw } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';
export const containerStyle: (model: RoadmapModelType) => StyleFunction =
  (model: RoadmapModelType) => (theme) => css`
    background-color: ${theme.roadmap.header.modelTagBg[model]};
    padding: 0 ${scalePxAsVw(10)}px;
    border-radius: ${scalePxAsVh(4)}px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 ${scalePxAsVh(10)}px;
    p {
      font-size: ${scalePxAsVw(theme.common.baseWidget.titleTagFontSize)}px;
      font-weight: 700;
      color: ${theme.roadmap.header.modelTagFont};
    }
  `;
