import { act, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { mockdeDataCurrentUserConfig } from '@dt-advisory/helpers/tests/userConfigurationMockedData';
import { DEFAULT_TEMPLATE_LAYOUT_ID, useUserConfigurationStore } from './UserConfiguration';
import {
  AppearanceEnum,
  DefaultUserConfigurationType,
  HeaderProperties,
  TemplateBodyType,
  TemplateToSaveType,
  WidgetConfigType,
  WidgetLayoutEnum,
  WidgetsLoaderEnum,
} from './UserConfiguration.types';
import { WidgetConfigListType } from '@dt-advisory/api/settings/settings.types';

const apiWidgetsMockedData = [
  {
    key: WidgetsLoaderEnum.Safeguards,
  },
] as unknown as WidgetConfigType[];

const templateBodyMockedData = {
  name: 'foo',
  isEditable: true,
  gridConfig: [
    [0, 1, 2],
    [0, 1, 2],
  ],
  widgetConfig: [
    {
      key: 'Safeguards',
    },
    {
      key: 'Cutting',
    },
    {
      key: 'Ecd',
    },
  ],
} as unknown as TemplateBodyType;

const TemplateToSaveMockedData = [templateBodyMockedData] as unknown as TemplateToSaveType[];

describe('UserConfiguration', () => {
  it('should return correct values', () => {
    const { result } = renderHook(() => useUserConfigurationStore((x) => x));
    expect(result.current.isSettingsModalOpen).toEqual(false);
    expect(result.current.configIsLoaded).toEqual(false);
    expect(result.current.currentUserConfig).toEqual(undefined);
    expect(result.current.layout).toEqual(WidgetLayoutEnum.OneRowThreeWidgets);
    expect(result.current.widgetsToLoad).toEqual([]);
    expect(result.current.currentSelectedLayout).toEqual(WidgetLayoutEnum.OneRowThreeWidgets);
    expect(result.current.currentSelectedTemplateId).toEqual(DEFAULT_TEMPLATE_LAYOUT_ID);
    expect(result.current.templatesToSave).toEqual([]);
    expect(result.current.scrollToLastSnapNeeded).toEqual(false);
  });
  it('should set settings open modal to true', async () => {
    const { result } = renderHook(() => useUserConfigurationStore((x) => x));
    act(() => {
      result.current.setSettingsModalOpen(true);
    });
    await waitFor(() => expect(result.current.isSettingsModalOpen).toEqual(true));
  });

  it('should getAppearanceMode correctly when no currentUserConfig', async () => {
    const { result } = renderHook(() => useUserConfigurationStore((x) => x));
    act(() => {
      result.current.getAppearanceMode();
    });
    expect(result.current.currentUserConfig?.appearance.mode).toBeUndefined();
  });
  it('should get default config as undefined', async () => {
    const { result } = renderHook(() => useUserConfigurationStore((x) => x));
    const defaultConfig = result.current.getDefaultConfig();
    expect(defaultConfig).toEqual(undefined);
  });
  it('should set default config to undefined', async () => {
    const { result } = renderHook(() => useUserConfigurationStore((x) => x));
    act(() => {
      result.current.setDefaultConfig(undefined as unknown as DefaultUserConfigurationType);
    });
    await waitFor(() => expect(result.current.currentUserConfig).toBeUndefined());
  });
  it('should set default config', async () => {
    const { result } = renderHook(() => useUserConfigurationStore((x) => x));
    act(() => {
      result.current.setDefaultConfig({ foo: 'bar' } as unknown as DefaultUserConfigurationType);
    });
    await waitFor(() => expect(result.current.currentUserConfig).toMatchObject({ foo: 'bar' }));
    await waitFor(() => expect(result.current.configIsLoaded).toEqual(true));
  });

  it('should load layout config correctly', async () => {
    const { result } = renderHook(() => useUserConfigurationStore((x) => x));
    act(() => {
      result.current.setDefaultConfig(
        mockdeDataCurrentUserConfig as unknown as DefaultUserConfigurationType,
      );
    });
    act(() => {
      result.current.loadLayoutWidgets();
    });
    await waitFor(() => expect(result.current.convertedGridConfig).toMatchObject([0, 1, 2, 3]));
    await waitFor(() => expect(result.current.layout).toEqual(WidgetLayoutEnum.OneRowFourWidgets));
    await waitFor(() =>
      expect(result.current.widgetsToLoad).toEqual([
        WidgetsLoaderEnum.Safeguards,
        WidgetsLoaderEnum.Ecd,
        WidgetsLoaderEnum.Cutting,
        WidgetsLoaderEnum.Wellbore,
      ]),
    );
  });
  it('should load layout config with an error when gridConfig is invalid', async () => {
    const { result } = renderHook(() => useUserConfigurationStore((x) => x));
    mockdeDataCurrentUserConfig.gridConfig = [
      [1, 1, 1],
      [1, 1, 1],
    ];
    act(() => {
      result.current.setDefaultConfig(
        mockdeDataCurrentUserConfig as unknown as DefaultUserConfigurationType,
      );
    });
    expect(result.current.loadLayoutWidgets).toThrow('gridConfig is invalid');
  });
  it('should update HeaderConfig correctly', async () => {
    const { result } = renderHook(() => useUserConfigurationStore((x) => x));
    act(() => {
      result.current.setDefaultConfig(
        mockdeDataCurrentUserConfig as unknown as DefaultUserConfigurationType,
      );
    });
    act(() => {
      result.current.updateHeaderConfig(['foo', 'bar'] as unknown as HeaderProperties[]);
    });
    await waitFor(() =>
      expect(result.current.currentUserConfig?.headerConfig).toMatchObject(['foo', 'bar']),
    );
  });
  it('should setWidgetCatalog correctly', async () => {
    const { result } = renderHook(() => useUserConfigurationStore((x) => x));
    // with user config and widgetCatalog length > 0
    act(() => {
      result.current.setDefaultConfig(
        mockdeDataCurrentUserConfig as unknown as DefaultUserConfigurationType,
      );
    });
    //  should set widget catalog from api
    act(() => {
      result.current.setWidgetCatalog(apiWidgetsMockedData, undefined, true);
    });
    await waitFor(() =>
      expect(result.current.currentUserConfig?.widgetCatalog).toMatchObject(apiWidgetsMockedData),
    );
    //  should set widget catalog from userConfig
    act(() => {
      result.current.setWidgetCatalog(apiWidgetsMockedData, undefined, false);
    });
    await waitFor(() =>
      expect(result.current.currentUserConfig?.widgetCatalog).toMatchObject(apiWidgetsMockedData),
    );
    //  set widget catalog from userConfig to length 0
    act(() => {
      result.current.setDefaultConfig({
        widgetCatalog: [],
      } as unknown as DefaultUserConfigurationType);
    });
    // should set widget catalog from fallbackUserConfiguration
    act(() => {
      result.current.setWidgetCatalog(
        undefined,
        [{ key: 'Safeguards', widgetConfig: { hasSmallVersion: false } }] as WidgetConfigListType,
        false,
      );
    });
    await waitFor(() =>
      expect(result.current.currentUserConfig?.widgetCatalog[0]).toMatchObject({
        key: 'Safeguards',
        widgetConfig: { hasSmallVersion: false },
      }),
    );
  });
  it('should setCurrentSelectedLayout correctly', async () => {
    const { result } = renderHook(() => useUserConfigurationStore((x) => x));
    act(() => {
      result.current.setCurrentSelectedLayout(WidgetLayoutEnum.OneRowThreeWidgets);
    });
    await waitFor(() =>
      expect(result.current.currentSelectedLayout).toEqual(WidgetLayoutEnum.OneRowThreeWidgets),
    );
  });
  it('should setCurrentSelectedTemplateId correctly', async () => {
    const { result } = renderHook(() => useUserConfigurationStore((x) => x));
    act(() => {
      result.current.setCurrentSelectedTemplateId('foo');
    });
    await waitFor(() => expect(result.current.currentSelectedTemplateId).toEqual('foo'));
  });
  it('should appendTemplate, getTemplateById, getDuplicateTemplateById correctly', async () => {
    const { result } = renderHook(() => useUserConfigurationStore((x) => x));
    act(() => {
      result.current.appendTemplate(templateBodyMockedData, 'test-id');
    });
    await waitFor(() =>
      expect(result.current.templatesToSave.find((x) => x.name === 'foo')).toBeTruthy(),
    );
    await waitFor(() => expect(result.current.scrollToLastSnapNeeded).toEqual(true));
    expect(result.current.getTemplateById('test-id')).toBeTruthy();
    expect(result.current.getDuplicateTemplateById('test-id', 'foo2')).toMatchObject({
      ...templateBodyMockedData,
      name: 'foo2',
    });
  });
  it('should getNewTemplate correctly', async () => {
    const { result } = renderHook(() => useUserConfigurationStore((x) => x));
    expect(result.current.getNewTemplate('newFoo')).toBeTruthy();
  });
  it('should handleScrollToLastSnapSuccess correctly', async () => {
    const { result } = renderHook(() => useUserConfigurationStore((x) => x));
    act(() => {
      result.current.handleScrollToLastSnapSuccess();
    });
    expect(result.current.scrollToLastSnapNeeded).toEqual(false);
  });
  it('should updateTemplateById and deleteTemplateById correctly', async () => {
    const { result } = renderHook(() => useUserConfigurationStore((x) => x));
    act(() => {
      result.current.appendTemplate(templateBodyMockedData, 'test-id');
    });
    act(() => {
      result.current.updateTemplateById('test-id', {
        ...templateBodyMockedData,
        name: 'updatedName',
      });
    });
    await waitFor(() =>
      expect(result.current.templatesToSave.find((x) => x.id === 'test-id')?.name).toEqual(
        'updatedName',
      ),
    );

    act(() => {
      result.current.deleteTemplateById('test-id');
    });
    await waitFor(() =>
      expect(result.current.templatesToSave.find((x) => x.id === 'test-id')).toBeUndefined(),
    );

    const testIdSameAsSelected = 'test-id-same-as-selected';
    act(() => {
      result.current.updateTemplateById(testIdSameAsSelected, {
        ...templateBodyMockedData,
        name: 'updatedName',
      });
      result.current.setCurrentSelectedTemplateId(testIdSameAsSelected);
      result.current.deleteTemplateById(testIdSameAsSelected);
    });
    await waitFor(() =>
      expect(
        result.current.templatesToSave.find((x) => x.id === testIdSameAsSelected),
      ).toBeUndefined(),
    );
    await waitFor(() =>
      expect(result.current.currentSelectedTemplateId).toEqual(DEFAULT_TEMPLATE_LAYOUT_ID),
    );
  });
  it('should saveUserConfiguration correctly', async () => {
    const { result } = renderHook(() => useUserConfigurationStore((x) => x));
    act(() => {
      result.current.setDefaultConfig(
        mockdeDataCurrentUserConfig as unknown as DefaultUserConfigurationType,
      );
    });
    act(() => {
      result.current.appendTemplate(templateBodyMockedData, 'test-id');
      result.current.setCurrentSelectedTemplateId('test-id');
      result.current.saveUserConfiguration();
    });

    await waitFor(() =>
      expect(result.current.currentUserConfig?.gridConfig).toMatchObject(
        templateBodyMockedData.gridConfig,
      ),
    );

    await waitFor(() =>
      expect(result.current.currentUserConfig?.widgetConfig).toMatchObject(
        templateBodyMockedData.widgetConfig,
      ),
    );
    await waitFor(() =>
      expect(result.current.currentUserConfig?.prevSelectedTemplateId).toEqual(
        result.current.currentSelectedTemplateId,
      ),
    );
  });
  it('should saveUserConfiguration should throw error', async () => {
    const { result } = renderHook(() => useUserConfigurationStore((x) => x));
    act(() => {
      result.current.setDefaultConfig(
        mockdeDataCurrentUserConfig as unknown as DefaultUserConfigurationType,
      );
    });
    act(() => {
      result.current.appendTemplate(templateBodyMockedData, 'test-id');
      result.current.setCurrentSelectedTemplateId('test-id-2');
    });
    expect(result.current.saveUserConfiguration).toThrow(
      'Unable to find template with id: test-id-2',
    );
    act(() => {
      result.current.appendTemplate(
        {
          ...templateBodyMockedData,
          gridConfig: [
            [1, 1, 1],
            [1, 1, 1],
          ],
        },
        'test-id-3',
      );
      result.current.setCurrentSelectedTemplateId('test-id-3');
    });
    expect(result.current.saveUserConfiguration).toThrow(
      'gridConfig is invalid - template id: test-id',
    );
  });
  it('should getAppearanceMode correctly', async () => {
    const { result } = renderHook(() => useUserConfigurationStore((x) => x));
    act(() => {
      result.current.setDefaultConfig(
        mockdeDataCurrentUserConfig as unknown as DefaultUserConfigurationType,
      );
      result.current.getAppearanceMode();
    });
    expect(result.current.currentUserConfig?.appearance.mode).toEqual(AppearanceEnum.AUTO);
  });
  it('should updateAppearanceMode correctly', async () => {
    const { result } = renderHook(() => useUserConfigurationStore((x) => x));
    act(() => {
      result.current.setDefaultConfig(
        mockdeDataCurrentUserConfig as unknown as DefaultUserConfigurationType,
      );
      result.current.updateAppearanceMode(AppearanceEnum.LIGHT);
    });
    expect(result.current.currentUserConfig?.appearance.mode).toEqual(AppearanceEnum.LIGHT);
  });
});

describe('UserConfiguration: setTemplates', () => {
  it('should setTemplates correctly', async () => {
    const { result } = renderHook(() => useUserConfigurationStore((x) => x));
    act(() => {
      result.current.deleteTemplateById('test-id');
      result.current.deleteTemplateById('test-id');
      result.current.deleteTemplateById('test-id-3');
      result.current.setDefaultConfig({
        foo: 'bar',
        layouts: [{ id: '1', name: 'foobar', isEditable: true }],
      } as unknown as DefaultUserConfigurationType);
    });
    act(() => {
      result.current.setTemplates([], false);
    });

    await waitFor(() =>
      expect(result.current.templatesToSave.find((x) => x.name === 'foobar')).toBeTruthy(),
    );
  });
  it('should setTemplates from default config', async () => {
    const { result } = renderHook(() => useUserConfigurationStore((x) => x));
    act(() => {
      result.current.setDefaultConfig({
        bar: 'foo',
      } as unknown as DefaultUserConfigurationType);
    });
    act(() => {
      result.current.deleteTemplateById('1');
      result.current.setTemplates([], false);
    });
    await waitFor(() => {
      expect(result.current.templatesToSave.find((x) => x.name === 'DT Advisory 1')).toBeTruthy();
    });
  });
  it('should setTemplates correctly', async () => {
    const { result } = renderHook(() => useUserConfigurationStore((x) => x));
    act(() => {
      result.current.setTemplates(TemplateToSaveMockedData, true);
    });
    await waitFor(() =>
      expect(result.current.templatesToSave.find((x) => x.name === 'foo')).toBeTruthy(),
    );
    await waitFor(() =>
      expect(result.current.templatesToSave).toMatchObject(TemplateToSaveMockedData),
    );
    act(() => {
      result.current.setTemplates(TemplateToSaveMockedData, false);
    });
    await waitFor(() =>
      expect(result.current.templatesToSave.find((x) => x.name === 'foo')).toBeTruthy(),
    );
  });
});
