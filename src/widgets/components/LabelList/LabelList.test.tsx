import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import LabelList, { LabelListPropsType } from './LabelList';

describe('LabelList', () => {
  const mockedProps: LabelListPropsType = {
    isSmallVersion: false,
    label: 'foo',
    mode: 'light',
    data: [
      { x: 10, y: 10 },
      { x: 20, y: 20 },
    ],
    maxY: 30,
    labelStyle: {
      color: { light: '#686868', dark: '#969696' },
      fontFamily: 'inherit',
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 15,
      backgroundColor: { light: '#F6F6F6', dark: '#1C2430' },
      backgroundPadding: { left: 5, right: 5, top: 3, bottom: 3 },
    },
    minDomain: { x: 1, y: 2 },
    maxDomain: { x: 100, y: 200 },
    holeDepth: 300,
  };

  it('should render without crashing', () => {
    const { queryByText } = renderWithThemeProviders(<LabelList {...mockedProps} />);
    expect(queryByText(mockedProps.label)).toBeInTheDocument();
  });
  it('should not render the label if data is empty', () => {
    const { queryByText } = renderWithThemeProviders(<LabelList {...mockedProps} data={[]} />);
    expect(queryByText(mockedProps.label)).toBeNull();
  });
});
