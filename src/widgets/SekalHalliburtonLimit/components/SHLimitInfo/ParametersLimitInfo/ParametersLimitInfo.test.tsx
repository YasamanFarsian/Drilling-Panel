import renderWithThemeAndLocaleProviders from '@dt-advisory/helpers/tests/renderWithContext';
import useIsSingleWidget from '@dt-advisory/widgets/hooks/useIsSingleWidget';
import { CategorylimitParams } from '../../../SekalHalliburtonLimitTypes';
import ParametersLimitInfo from './ParametersLimitInfo';

jest.mock('@dt-advisory/widgets/hooks/useIsSingleWidget');

const validData: CategorylimitParams = {
  combinedLimit: { min: 10, max: 20 },
  rangeSekal: { min: 5, max: 15 },
  rangeHalliburton: { min: 8, max: 18 },
  measuredValue: 12,
  label: 'ROP (m/h)',
};

beforeEach(() => {
  jest.clearAllMocks();
  (useIsSingleWidget as jest.Mock).mockReturnValue(false);
});

describe('SekalHalliburtonLimit', () => {
  it('renders without crashing', () => {
    const { container } = renderWithThemeAndLocaleProviders(<ParametersLimitInfo {...validData} />);
    expect(container).toBeInTheDocument();
  });

  it('renders with valid data', () => {
    const { container, getByTestId } = renderWithThemeAndLocaleProviders(
      <ParametersLimitInfo {...validData} />,
    );

    expect(container).toBeInTheDocument();
    expect(getByTestId('parameter_title')).toHaveTextContent('ROP (m/h)');
  });

  it('renders with zero values', () => {
    const zeroValues: CategorylimitParams = {
      combinedLimit: { min: 0, max: 0 },
      rangeSekal: { min: 0, max: 0 },
      rangeHalliburton: { min: 0, max: 0 },
      measuredValue: 0,
      label: 'WOB (t)',
    };
    const { container, getByTestId } = renderWithThemeAndLocaleProviders(
      <ParametersLimitInfo {...zeroValues} />,
    );
    expect(container).toBeInTheDocument();
    expect(getByTestId('parameter_title')).toHaveTextContent('WOB (t)');
  });
});
