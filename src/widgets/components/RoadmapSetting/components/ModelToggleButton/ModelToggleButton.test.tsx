import { fireEvent } from '@testing-library/react';
import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import { RoadmapModelType } from '@dt-advisory/store/Settings';
import ModelToggleButtonm from './ModelToggleButton';

jest.mock('react-intl', () => ({
  ...jest.requireActual('react-intl'),
  useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }), // Directly test on translation key
}));

describe('ModelToggleButton', () => {
  const mockedProps = {
    handleModelChange: (value: RoadmapModelType) => void 0,
    model: 'Steadystate' as const,
  };
  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <ModelToggleButtonm {...mockedProps} />,
    );
    expect(getByTestId('model_toggle_button_1688535287388')).toBeInTheDocument();
  });

  it('should call handleModelChange after click on other options', () => {
    const handleChangeMock = jest.fn();
    const { getByText } = renderWithThemeAndLocaleProviders(
      <ModelToggleButtonm {...mockedProps} handleModelChange={handleChangeMock} />,
    );
    fireEvent.click(getByText('widget.roadmap.setting.model.transientKinetic.label'));
    expect(handleChangeMock).toHaveBeenCalledWith('TransientKinetic');
    expect(handleChangeMock).toHaveBeenCalledTimes(1);
  });
});
