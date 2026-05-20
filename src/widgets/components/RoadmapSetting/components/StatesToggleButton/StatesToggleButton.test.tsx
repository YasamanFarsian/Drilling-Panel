import { fireEvent } from '@testing-library/react';
import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import { RoadmapStateType } from '@dt-advisory/store/Settings';
import StateToggleButton from './StateToggleButton';

describe('StateToggleButton', () => {
  const mockedProps = {
    handleStateChange: (value: RoadmapStateType) => void 0,
    state: 'Automatic' as const,
  };
  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <StateToggleButton {...mockedProps} />,
    );
    expect(getByTestId('state_toggle_button_1688535287388')).toBeInTheDocument();
  });

  it('should call handleModelChange after click on other options', () => {
    const handleChangeMock = jest.fn();
    const { getByText } = renderWithThemeAndLocaleProviders(
      <StateToggleButton {...mockedProps} handleStateChange={handleChangeMock} />,
    );
    fireEvent.click(getByText('Drilling'));
    expect(handleChangeMock).toHaveBeenCalledWith('Drilling');
    expect(handleChangeMock).toHaveBeenCalledTimes(1);
  });
});
