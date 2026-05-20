import axiosInstance from '@dt-advisory/api/axiosInstance';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import {
  ConfigurationStoreType,
  useUserConfigurationStore,
} from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import {
  TemplateToSaveType,
  WidgetLayoutEnum,
} from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { screen, waitFor } from '@testing-library/react';
import TemplatesLayoutBody from './TemplatesLayoutBody';

jest.mock('@dt-advisory/store/UserConfiguration/UserConfiguration');
axiosInstance.get = jest.fn().mockReturnValue({ data: '[]' });

const mockUserConfigurationStore = (templatesToSave: TemplateToSaveType[]) => {
  const mockState: Partial<ConfigurationStoreType> = {
    templatesToSave,
    currentSelectedLayout: WidgetLayoutEnum.OneRowThreeWidgets,
    setTemplates: jest.fn(),
    getTemplateById: jest.fn(),
  };
  (useUserConfigurationStore as unknown as jest.Mock).mockImplementation((callback) =>
    callback(mockState),
  );
};

describe('TemplatesLayoutBody', () => {
  it('should render EmptyTempalteLayout if templateToSave is empty', async () => {
    mockUserConfigurationStore([]);
    renderWithThemeAndLocaleProviders(<TemplatesLayoutBody />);
    await waitFor(() =>
      expect(screen.getByTestId('empty_template_layout_1676562585410')).toBeInTheDocument(),
    );
  });

  it('should render template layout body if templateToSave is not empty', async () => {
    mockUserConfigurationStore([
      {
        id: '1',
        name: 'Dashboard Dev',
        isEditable: false,
        gridConfig: [
          [0, 1, 2],
          [0, 1, 2],
        ],
        widgetConfig: [
          {
            key: 'Cutting',
          },
          {
            key: 'Ecd',
          },
        ] as any,
      },
    ]);
    renderWithThemeAndLocaleProviders(<TemplatesLayoutBody />);

    await waitFor(() => {
      expect(screen.getByTestId('templates_layout_body')).toBeInTheDocument();
    });
  });
});
