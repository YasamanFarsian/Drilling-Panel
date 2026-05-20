import renderWithThemeAndLocaleProviders from '@dt-advisory/helpers/tests/renderWithContext';
import useIsSingleWidget from '@dt-advisory/widgets/hooks/useIsSingleWidget';
import CategoryTitle from './CategoryTitle';

jest.mock('@dt-advisory/widgets/hooks/useIsSingleWidget');

beforeEach(() => {
  jest.clearAllMocks();
  (useIsSingleWidget as jest.Mock).mockReturnValue(false);
});

describe('CategoryTitle Component', () => {
  it('renders without crashing', () => {
    const { container } = renderWithThemeAndLocaleProviders(
      <CategoryTitle label="Combined Limit" />,
    );
    expect(container).toBeInTheDocument();
  });

  it('renders a given title correctly', () => {
    const { getByText } = renderWithThemeAndLocaleProviders(
      <CategoryTitle label="Halliburton Limit" />,
    );
    expect(getByText('Halliburton Limit')).toBeInTheDocument();
  });
});
