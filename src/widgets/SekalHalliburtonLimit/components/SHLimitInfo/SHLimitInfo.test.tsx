import renderWithThemeAndLocaleProviders from '@dt-advisory/helpers/tests/renderWithContext';
import useIsSingleWidget from '@dt-advisory/widgets/hooks/useIsSingleWidget';
import { OrchestrianSHLimitParams } from '../../SekalHalliburtonLimitTypes';
import ParametersLimitInfo from './ParametersLimitInfo/ParametersLimitInfo';
import SekalHalliburtonLimitInfo from './SHLimitInfo';

jest.mock('@dt-advisory/widgets/hooks/useIsSingleWidget');

beforeEach(() => {
  jest.clearAllMocks();
  (useIsSingleWidget as jest.Mock).mockReturnValue(false);
});

const limitParams: OrchestrianSHLimitParams = {
  orchestrationType: 'sekallimit',
  // ... (unchanged)
};

describe('SekalHalliburtonLimit', () => {
  it('renders without crashing', () => {
    const { container } = renderWithThemeAndLocaleProviders(
      <SekalHalliburtonLimitInfo data={limitParams} />,
    );
    expect(container).toBeInTheDocument();
  });

  it('renders with all values provided', () => {
    const { container } = renderWithThemeAndLocaleProviders(
      <SekalHalliburtonLimitInfo data={limitParams} />,
    );
    expect(container).toBeInTheDocument();
  });

  it('renders with measured values as zero', () => {
    const zeroValues = {
      orcwobmeasured: 0,
      orcropmeasured: 0,
      orcflowmeasured: 0,
      orcrpmmeasured: 0,
    };
    const { container } = renderWithThemeAndLocaleProviders(
      <SekalHalliburtonLimitInfo data={{ ...limitParams, ...zeroValues }} />,
    );
    expect(container).toBeInTheDocument();
  });

  it.skip('renders with correct label for Flow Rate', () => {
    jest.mock('react-intl', () => ({
      ...jest.requireActual('react-intl'),
      useIntl: jest.fn().mockReturnValue({
        formatMessage: jest.fn((message) => 'Mocked Flow Rate Label'),
      }),
    }));
    const flowRateDataParam = {
      orcflowmin: 10,
      orcflowmax: 20,
      orcsekalflowmin: 5,
      orcsekalflowmax: 0,
      orcexternalflowmin: 8,
      orcexternalflowmax: 18,
      orcflowmeasured: 12,
      label: 'Flow Rate (I/min)',
    };
    const { getByText } = renderWithThemeAndLocaleProviders(
      <ParametersLimitInfo {...flowRateDataParam} />,
    );
    expect(getByText('Mocked Flow Rate Label')).toBeInTheDocument();
  });

  it('renders with undefined values', () => {
    const undefinedValues = {
      orcwobmeasured: undefined,
      orcropmeasured: undefined,
      orcflowmeasured: undefined,
      orcrpmmeasured: undefined,
    };
    const { container } = renderWithThemeAndLocaleProviders(
      <SekalHalliburtonLimitInfo data={{ ...limitParams, ...undefinedValues }} />,
    );
    expect(container).toBeInTheDocument();
  });

  it('renders with zero values', () => {
    const zeroValues = {
      orcwobmeasured: 0,
      orcropmeasured: 0,
      orcflowmeasured: 0,
      orcrpmmeasured: 0,
    };
    const { container } = renderWithThemeAndLocaleProviders(
      <SekalHalliburtonLimitInfo data={{ ...limitParams, ...zeroValues }} />,
    );
    expect(container).toBeInTheDocument();
  });
});
