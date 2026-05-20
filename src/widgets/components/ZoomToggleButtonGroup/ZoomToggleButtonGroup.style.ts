import { css } from '@emotion/react';
import { AppearanceEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { scalePxAsVh, scalePxAsVw } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

type ToggleGroupStylePropsType = { isStandalone: boolean; disabled?: boolean };
export const toggleGroupStyle: (props: ToggleGroupStylePropsType) => StyleFunction =
  (props: ToggleGroupStylePropsType) => (theme) => css`
    position: relative;
    z-index: 2;
    border-radius: ${theme.spacing(0.75)};
    border: none;
    align-items: center;
    height: 2.8rem;
    ${!props.isStandalone ? undefined : 'background: none !important'};
  `;

export const toggleButtonStyle: StyleFunction = (theme) => css`
  border: none;
  background-color: transparent;
  &:hover {
    background-color: transparent;
  }
  color: #3d3d3d;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2rem;
  padding: 4px;
  &.Mui-selected {
    border: none;
    background-color: ${theme.mode === AppearanceEnum.LIGHT ? '#FFFFFF' : '#1C2430'};
    box-shadow:
      0px 1px 8px rgba(0, 0, 0, 0.06),
      0px 1px 5px -1px rgba(0, 0, 0, 0.02),
    border-radius: ${theme.spacing(0.5)} !important;
    color: ${theme.mode === AppearanceEnum.LIGHT ? '#34a9cc' : '#FFFFFF'};
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 2rem;
    padding: ${theme.spacing(0.5, 1.25)};
    &:hover {
      background-color: ${theme.mode === AppearanceEnum.LIGHT ? '#FFFFFF' : '#1C2430'};
    }
  }
  &.Mui-disabled {
    border: none;
  }
`;

type ToggleIconButtonStylePropsType = {
  isStandalone: boolean;
  isSelected?: boolean;
  disabled?: boolean;
};
export const toggleIconButtonStyle: (props: ToggleIconButtonStylePropsType) => StyleFunction =
  (props: ToggleIconButtonStylePropsType) => (theme) => css`
    ${props.isStandalone
      ? `
        background: 'none !important' ;
        background-color: ${
          props.isSelected
            ? theme.common?.zoomButton?.selectedBackgroundColor
            : theme.common?.zoomButton?.unselectedBackgroundColor
        } ;
        &.MuiButtonBase-root {
          svg {
            opacity: ${props.disabled && 0.3};
            height: ${scalePxAsVh(22)}px;
            width: ${scalePxAsVh(22)}px;
          }
        padding: 0.4rem;
        border-radius: 50%;
        border: none;
        &.Mui-disabled {
          border: none;
        }
          & .MuiSvgIcon-root {
            svg {
              fill: ${'dark' === theme.mode ? '#000000' : '#A4A4A3'};
            }
          }       
      `
      : `
          padding: 4px;
          border: none;        
          background-color: transparent;
          &.Mui-disabled {
            border: none;
          }     
          &:hover {            
            background-color: transparent;
          }   
        `}
  `;
