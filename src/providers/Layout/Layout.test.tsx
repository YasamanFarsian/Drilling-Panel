import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import ConfigsProvider from '@dt-advisory/providers/Configs';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LayoutProvider from './Layout';

const renderSingleWidget = (widgetName: string) => {
  const { getByTestId } = renderWithThemeProviders(
    <MemoryRouter initialEntries={[`/widget/${widgetName}`]}>
      <Routes>
        <Route
          path="/widget/:widgetName"
          element={
            <ConfigsProvider>
              <LayoutProvider />
            </ConfigsProvider>
          }
        />
      </Routes>
    </MemoryRouter>,
  );
  expect(getByTestId('widget_layout')).toBeInTheDocument();
};

describe('Layout Provider', () => {
  it('should render without crashing', () => {
    renderWithThemeProviders(
      <MemoryRouter>
        <ConfigsProvider>
          <LayoutProvider />,
        </ConfigsProvider>
      </MemoryRouter>,
    );
  });
  it.each([
    'cutting',
    'ecd',
    'wellbore',
    'drillability',
    'transientmechanicaldrag',
    'transientmechanicaltorque',
    'smartautorop',
    'roadmapdrag',
    'roadmaptorque',
  ])('should render single %s chart without crashing', (widgetName) => {
    renderSingleWidget(widgetName);
  });
});
