import styled from '@emotion/styled';

export type StyledScrollbarPropsType = Record<string, never>;

const StyledScrollbar = styled.div(
  ({ theme }) => `
  overflow-y: auto;

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: ${theme.common.scrollbar.thumb} ${theme.common.scrollbar.track};

  /* Webkit browsers like Chrome, Safari */
  &::-webkit-scrollbar {
    width: 8px; /* Adjust vertical scrollbar size */
    height: 8px /* Adjust horizontal scrollbar size */
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.common.scrollbar.thumb}; /* Color of the scroll thumb */
    border-radius: 4px; /* Rounded corners */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${theme.common.scrollbar.thumbHover}; /* Color when hovering over scroll thumb */
  }

  &::-webkit-scrollbar-track {
    background: ${theme.common.scrollbar.track}; /* Color of the track */
  }

  &::-webkit-scrollbar-corner {
    background: ${theme.common.scrollbar.track}; /* Color of the track at insersection of vertical and horizontal */
  }
`,
);

export default StyledScrollbar;
