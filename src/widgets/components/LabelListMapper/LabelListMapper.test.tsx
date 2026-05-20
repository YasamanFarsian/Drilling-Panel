import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import LabelListMapper from './LabelListMapper';
describe('LabelListMapper', () => {
  const linesData = [
    {
      data: [
        { x: 1, y: 2 },
        { x: 2, y: 2 },
      ],
      label: '0,0',
      lineColor: 'blue',
    },
  ];
  const maxY = 30;
  const labelStyle = {
    color: { light: '#686868', dark: '#969696' },
    fontFamily: 'inherit',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 15,
    backgroundColor: { light: '#F6F6F6', dark: '#1C2430' },
    backgroundPadding: { left: 5, right: 5, top: 1, bottom: 1 },
  };
  const minDomain = { x: 0, y: 10 };
  const maxDomain = { x: 10, y: 20 };
  it('should render without crashing', () => {
    const { queryByText } = renderWithThemeProviders(
      <LabelListMapper
        labelStyle={labelStyle}
        maxY={maxY}
        linesData={linesData}
        isSmallVersion={false}
        minDomain={minDomain}
        maxDomain={maxDomain}
        holeDepth={300}
      />,
    );
    expect(queryByText('0,0')).toBeInTheDocument();
  });
});
