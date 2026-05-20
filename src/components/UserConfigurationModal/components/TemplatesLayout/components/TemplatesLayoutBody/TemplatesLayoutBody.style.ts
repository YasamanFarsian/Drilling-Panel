import { css } from '@emotion/react';
import { StyleFunction } from '@dt-advisory/styles/theme';

export const EMBLA_SLIDES_SPACING = 32;

export const emblaStyle: StyleFunction = (theme) => css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  .embla__viewport {
    overflow: hidden;
    flex-grow: 1;
  }

  .embla__container {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 33.3333%;
    height: 100%;
    padding-top: ${theme.spacing(1)};
    ${theme.breakpoints.up('xl')} {
      padding-top: ${theme.spacing(3)};
    }
    margin-left: ${-EMBLA_SLIDES_SPACING / 10}rem;

    .embla__slide {
      min-width: 0;
      padding-left: ${EMBLA_SLIDES_SPACING / 10}rem;

      &.embla__hideSlide {
        opacity: 0;
        pointer-events: none;
      }
    }
  }

  .embla__footer_hidden {
    pointer-events: none;
    visibility: hidden;
  }

  .embla__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: ${theme.spacing(3)};

    .embla__dots {
      display: flex;
      gap: 1.6rem;
      flex-wrap: wrap;

      .embla__dot {
        width: 3.2rem;
        border: 3px solid ${theme.userConfigSetting.layout.templateLayouts.embla.dot};
        border-radius: 3px;
      }

      .embla__dot--selected {
        border-color: ${theme.userConfigSetting.layout.templateLayouts.embla.dotSelected};
      }
    }

    .embla__button {
      position: relative;
      padding: ${theme.spacing(1.5)};

      .circle {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: ${theme.userConfigSetting.layout.templateLayouts.embla.buttonBg};
        border-radius: 50%;
        z-index: -1;
      }

      svg {
        color: ${theme.userConfigSetting.layout.templateLayouts.embla.buttonSvgColor};
      }

      &.Mui-disabled {
        opacity: 0.4;
      }
    }
  }
`;
