import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';

export const containerStyle: (showWellbore: boolean) => StyleFunction = (showWellbore) => (theme) =>
  css`
    height: 100%;
    display: grid;    
    grid-gap: ${theme.spacing(4)};
    grid-template-columns: ${
      //showWellbore ? '1fr minmax(10rem, 42%) 1fr' : 'minmax(10rem, 42%) 1fr 1fr'
      '1fr 1fr 1fr'
    };
    grid-template-rows: 100%,
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },  
  `;

export const sectionStyle = css`
  height: 100%;
`;
