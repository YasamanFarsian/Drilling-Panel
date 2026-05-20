import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';

export const containerStyle: (isEmbedded: boolean, isSmallVersion?: boolean) => StyleFunction =
  (isEmbedded, isSmallVersion?: boolean) => () => {
    const eightPixelInViewportUnit = isEmbedded ? '0.7407407407vh' : '0.4166665vw'; // 8px on default screen
    const gapBigVersionValue = isEmbedded ? '1.4814814815vh' : '0.833335vw'; // 8px for small 16px for large on default screen
    return css`
      padding-bottom: ${isSmallVersion ? 0 : eightPixelInViewportUnit};
      display: grid;
      grid-template-columns: ${isSmallVersion
        ? '11.667vw' //224px on default screen
        : 'repeat(2, 1fr)'};
      grid-template-rows: ${isSmallVersion ? 'repeat(4, auto)' : 'repeat(2, auto)'};
      grid-auto-flow: column;
      gap: ${isSmallVersion ? eightPixelInViewportUnit : gapBigVersionValue};
      ${isSmallVersion && 'margin-right: 0.833335vw'}//16px on default screen
    `;
  };
