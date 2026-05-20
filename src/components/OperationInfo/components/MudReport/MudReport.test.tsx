import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import MudReport from './MudReport';

describe('MudReport', () => {
  const mockedProps = {
    isLoading: false,
    data: {
      fluidType: 'foo',
      gelStrength10min: 3,
      gelStrength10s: 3,
      mudSampleDensity: 3,
      mudSampleTemperature: 3,
      oilWaterRatio: 3,
      pressure: 3,
      stress3RPM: 3,
      stress6RPM: 3,
      stress30RPM: 3,
      stress60RPM: 3,
      stress100RPM: 3,
      stress200RPM: 3,
      stress300RPM: 3,
      stress600RPM: 3,
      temperature: 3,
    },
  };

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(<MudReport {...mockedProps} />);
    expect(getByTestId('at_operationInfo_mudReport')).toBeInTheDocument();
  });
});
