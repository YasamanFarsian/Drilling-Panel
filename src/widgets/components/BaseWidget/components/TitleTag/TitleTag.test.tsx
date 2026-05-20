import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import TitleTag, { TitleTagPropsType } from './TitleTag';

describe('TitleTag', () => {
  const mockedProps: TitleTagPropsType = {
    label: 'test',
    value: 'Steadystate',
  };

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(<TitleTag {...mockedProps} />);
    expect(getByTestId('title_tag_1689134109491')).toBeInTheDocument();
  });

  it('should render correct label', () => {
    renderWithThemeProviders(<TitleTag {...mockedProps} />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should render correct background-color for Steadystate', () => {
    const { getByTestId } = renderWithThemeProviders(<TitleTag {...mockedProps} />);
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(getByTestId('title_tag_1689134109491')).toHaveStyle('background-color: #F3FCF3');
  });

  it('should render correct  background-color for TransientKinetic', () => {
    const { getByTestId } = renderWithThemeProviders(
      <TitleTag {...mockedProps} value={'TransientKinetic'} />,
    );
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(getByTestId('title_tag_1689134109491')).toHaveStyle('background-color: #7C008340');
  });

  it('should render correct  background-color for TransientStatic', () => {
    const { getByTestId } = renderWithThemeProviders(
      <TitleTag {...mockedProps} value={'TransientStatic'} />,
    );
    expect(getByTestId('title_tag_1689134109491')).toHaveStyle('background-color: #E2892940');
  });
});
