/* eslint-disable max-lines, max-lines-per-function, max-nested-callbacks, complexity */
import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';
import create, { StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { LayoutType, WidgetConfigListType } from '@dt-advisory/api/settings/settings.types';
import fallbackUserConfiguration from '@dt-advisory/config/fallbackUserConfiguration.json';
import { userConfigPersistDataMigration } from './userConfigPersistDataMigration';
import {
  AppearanceEnum,
  ConvertedGridConfigType,
  DefaultUserConfigurationType,
  HeaderProperties,
  TemplateBodyType,
  TemplateToSaveType,
  WidgetLayoutEnum,
  WidgetsLoaderEnum,
} from './UserConfiguration.types';
import {
  areTemplateIdsEqual,
  areWidgetConfigsEqual,
  convertGridConfig,
  createNewTemplate,
  deleteTemplateById,
  duplicateTemplate,
  getNewLayout,
  getWidgetsToLoad,
  isTemplateEmpty,
  updateTemplateById,
  validateGridConfig,
} from './userConfigurationHelper';

// Local storage key
export const USER_CONFIGURATION_KEY = 'USER_CONFIGURATION';
export const DEFAULT_TEMPLATE_LAYOUT_ID = '1';

export type ConfigurationStoreType = {
  configIsLoaded: boolean;
  currentUserConfig?: DefaultUserConfigurationType;
  layout: WidgetLayoutEnum; // to load layout in dashboard
  widgetsToLoad: WidgetsLoaderEnum[]; // to load widgets in dashboard
  convertedGridConfig?: ConvertedGridConfigType;
  isEmptyTemplate: boolean;

  /**
   * used when opening/closing user settings modal
   * */
  isSettingsModalOpen: boolean;
  setSettingsModalOpen: (value: boolean) => void;

  /**
   * used in user layout and templates settings
   * */
  scrollToLastSnapNeeded: boolean;
  currentSelectedLayout: WidgetLayoutEnum;
  setCurrentSelectedLayout: (selectedLayout: WidgetLayoutEnum) => void;
  currentSelectedTemplateId: string;
  setCurrentSelectedTemplateId: (id: string) => void;
  // header properties
  updateHeaderConfig: (headerProperties: HeaderProperties[]) => void;
  // widget catalogue
  setWidgetCatalog: (
    apiWidgets: WidgetConfigListType | undefined,
    configWidgets: WidgetConfigListType | undefined,
    isLoaded: boolean,
  ) => void;
  // templates
  handleScrollToLastSnapSuccess: () => void;
  templatesToSave: TemplateToSaveType[];
  appendTemplate: (template: TemplateBodyType, apiId?: string) => void;
  getTemplateById: (id: string) => TemplateToSaveType | undefined;
  getDuplicateTemplateById: (id: string, newName: string) => TemplateBodyType | undefined;
  setTemplates: (apiLayouts: LayoutType[] | undefined, isLoaded: boolean) => void;
  getNewTemplate: (name: string) => TemplateBodyType;
  updateTemplateById: (id: string, data: TemplateBodyType) => void;
  deleteTemplateById: (id: string) => void;
  // use this when closing the user settings modal
  saveUserConfiguration: () => void;

  /**
   * used in user Appearance and notifications
   * */
  getAppearanceMode: () => AppearanceEnum | undefined;
  updateAppearanceMode: (mode: AppearanceEnum) => void;

  /**
   * used when loading dashboard
   * */
  getDefaultConfig: () => DefaultUserConfigurationType | undefined;
  setDefaultConfig: (config: DefaultUserConfigurationType) => void;
  // this needs to be called to load the layout and widgets on first load
  loadLayoutWidgets: () => void;
};

type ConfigurationStorePersistType = (
  config: StateCreator<ConfigurationStoreType>,
  options: PersistOptions<ConfigurationStoreType>,
) => StateCreator<ConfigurationStoreType>;

// https://github.com/pmndrs/zustand/issues/650#issuecomment-965916156
export const useUserConfigurationStore = create<ConfigurationStoreType>(
  (persist as ConfigurationStorePersistType)(
    (set, get) => ({
      isSettingsModalOpen: false,
      configIsLoaded: false,
      currentUserConfig: undefined,
      layout: WidgetLayoutEnum.OneRowThreeWidgets,
      widgetsToLoad: [],
      currentSelectedLayout: WidgetLayoutEnum.OneRowThreeWidgets,
      currentSelectedTemplateId: DEFAULT_TEMPLATE_LAYOUT_ID,
      templatesToSave: [],
      scrollToLastSnapNeeded: false,
      isEmptyTemplate: true,

      /**
       * used when opening/closing user settings modal
       * */
      setSettingsModalOpen: (value: boolean) => {
        set({
          isSettingsModalOpen: value,
        });
      },
      /**
       * used when loading dashboard
       * */

      getDefaultConfig: () => {
        return get().currentUserConfig;
      },

      setDefaultConfig: (config: DefaultUserConfigurationType) => {
        if (config) {
          const state = get();
          set({
            currentUserConfig: {
              ...config,
              prevSelectedTemplateId: state.currentSelectedTemplateId,
            },
            configIsLoaded: true,
          });
        }
      },
      loadLayoutWidgets: () => {
        const state = get();

        const currentUserConfig = state.currentUserConfig;

        if (!currentUserConfig) return;
        const gridConfig = currentUserConfig.gridConfig;
        const isValidGridConfig = validateGridConfig(gridConfig);
        if (!isValidGridConfig) {
          throw new Error('gridConfig is invalid');
        }

        const convertedGridConfig = convertGridConfig(gridConfig);
        // we determine layout
        const newLayout = getNewLayout(convertedGridConfig);

        //we get the widgets to in new layout
        const widgetsToLoad = getWidgetsToLoad(convertedGridConfig, currentUserConfig.widgetConfig);
        set({
          convertedGridConfig,
          layout: newLayout,
          widgetsToLoad,
        });
      },

      /**
       * used in user settings
       * */

      updateHeaderConfig: (headerProperties: HeaderProperties[]) => {
        const currentUserConfig = get().currentUserConfig;
        if (!currentUserConfig) return;
        set({
          currentUserConfig: {
            ...currentUserConfig,
            headerConfig: headerProperties,
          },
        });
      },

      setWidgetCatalog: (apiWidgets, configWidgets, isLoaded) => {
        const state = get();
        if (!state.currentUserConfig) return;
        let data: WidgetConfigListType = [];
        if (isLoaded && apiWidgets && apiWidgets.length > 0) {
          data = apiWidgets;
        } else if (
          configWidgets !== undefined &&
          state.currentUserConfig?.widgetCatalog.length !== configWidgets.length
        ) {
          data = configWidgets;
        } else if (state.currentUserConfig && state.currentUserConfig.widgetCatalog.length > 0) {
          data = state.currentUserConfig.widgetCatalog;
        } else {
          data = (fallbackUserConfiguration as DefaultUserConfigurationType).widgetCatalog;
        }
        set({
          currentUserConfig: {
            ...state.currentUserConfig,
            widgetCatalog: data,
          },
        });
      },

      // when user selects a layout
      setCurrentSelectedLayout: (selectedLayout: WidgetLayoutEnum) =>
        set({ currentSelectedLayout: selectedLayout }),

      // when user selects a template
      setCurrentSelectedTemplateId: (id: string) => set({ currentSelectedTemplateId: id }),
      appendTemplate: (template, apiId) => {
        const templatesToSave = get().templatesToSave;

        const templateWithId = {
          id: apiId ? apiId : uuidv4(),
          ...template,
        };

        set({
          templatesToSave: [...templatesToSave, templateWithId],
          scrollToLastSnapNeeded: true,
        });
      },
      getTemplateById: (id) => {
        const { templatesToSave } = get();

        return templatesToSave.find((template) => template.id === id);
      },
      getDuplicateTemplateById: (id: string, newName: string) => {
        const { templatesToSave } = get();

        return duplicateTemplate({ id, templatesToSave, newName });
      },
      setTemplates: (apiLayouts, isLoaded) => {
        const { templatesToSave, currentUserConfig } = get();
        const currentUserConfigLayout = currentUserConfig?.layouts;
        let data: TemplateToSaveType[] = [];
        if (isLoaded && apiLayouts && apiLayouts.length > 0) {
          data = apiLayouts;
        } else if (templatesToSave?.length > 0) {
          data = templatesToSave;
        } else if (currentUserConfigLayout && (currentUserConfigLayout.length ?? 0) > 0) {
          data = currentUserConfigLayout;
        } else {
          data = (fallbackUserConfiguration as DefaultUserConfigurationType).layouts;
        }
        set({ templatesToSave: data });
      },
      // when user create a template
      getNewTemplate: (name: string) => {
        const currentSelectedLayout = get().currentSelectedLayout;

        // get a default template body
        const newTemplate = createNewTemplate(name, currentSelectedLayout);

        return newTemplate;
      },

      handleScrollToLastSnapSuccess: () => {
        set({ scrollToLastSnapNeeded: false });
      },

      // when user updates a template
      updateTemplateById: (id: string, data: TemplateBodyType): void => {
        const templatesToSave = get().templatesToSave;

        set({
          templatesToSave: updateTemplateById(id, data, templatesToSave),
        });
      },

      // when user deletes a template
      deleteTemplateById: (id: string): void => {
        if (get().currentSelectedTemplateId === id) {
          get().setCurrentSelectedTemplateId(DEFAULT_TEMPLATE_LAYOUT_ID);
        }
        set(
          produce((state: ConfigurationStoreType) => {
            state.templatesToSave = deleteTemplateById(id, state.templatesToSave);
          }),
        );
      },

      // use this when closing the user settings modal
      saveUserConfiguration: (): void => {
        const state = get();
        const { currentUserConfig, currentSelectedTemplateId } = state;
        if (currentUserConfig && currentSelectedTemplateId) {
          const selectedTemplate = state.templatesToSave.find(
            (x) => x.id === currentSelectedTemplateId,
          );
          if (!selectedTemplate) {
            throw new Error(`Unable to find template with id: ${currentSelectedTemplateId}`);
          }
          if (!validateGridConfig(selectedTemplate.gridConfig)) {
            throw new Error(`gridConfig is invalid - template id: ${currentSelectedTemplateId}`);
          }
          const convertedGridConfig = convertGridConfig(selectedTemplate.gridConfig);
          const isEmptyTemplate = isTemplateEmpty(convertedGridConfig);

          const gridConfigsAreEqual = areWidgetConfigsEqual(
            currentUserConfig.widgetConfig,
            selectedTemplate.widgetConfig,
          );
          const isTemplateIdEqual = areTemplateIdsEqual({
            prevSelectedTemplateId: currentUserConfig.prevSelectedTemplateId,
            currentSelectedTemplateId,
          });
          if (convertedGridConfig && (!isTemplateIdEqual || !gridConfigsAreEqual)) {
            // we determine layout
            const newLayout = getNewLayout(convertedGridConfig);

            //we get the widgets to in new layout
            const widgetsToLoad = getWidgetsToLoad(
              convertedGridConfig,
              selectedTemplate.widgetConfig,
            );

            set(
              produce((stateToSet) => {
                stateToSet.convertedGridConfig = convertedGridConfig;
                stateToSet.isEmptyTemplate = isEmptyTemplate;
                stateToSet.layout = newLayout;
                stateToSet.widgetsToLoad = widgetsToLoad;

                if (stateToSet.currentUserConfig) {
                  stateToSet.currentUserConfig.gridConfig = selectedTemplate.gridConfig;
                  stateToSet.currentUserConfig.widgetConfig = selectedTemplate.widgetConfig;
                  stateToSet.currentUserConfig.prevSelectedTemplateId = currentSelectedTemplateId;
                }
              }),
            );
          }
        }
      },

      /**
       * used in user layout and templates settings
       * */
      getAppearanceMode: (): AppearanceEnum | undefined => {
        const currentUserConfig = get().currentUserConfig;
        if (currentUserConfig) {
          return currentUserConfig.appearance?.mode;
        }
        return undefined;
      },
      updateAppearanceMode: (mode: AppearanceEnum) => {
        const currentUserConfig = get().currentUserConfig;
        if (currentUserConfig) {
          set({
            currentUserConfig: {
              ...currentUserConfig,
              appearance: {
                ...currentUserConfig.appearance,
                mode,
              },
            },
          });
        }
      },
    }),
    {
      name: USER_CONFIGURATION_KEY,
      version: 9, // version must be always increased
      migrate: userConfigPersistDataMigration,
    },
  ),
);

/**
 * This enum is used for web socket path | no connection state (start timer) | reconnecting state (all web sockets are disconnected)
 * Values of this enum should match path for widget web socket
 * When we add a new widget this enum must be updated
 * */
export enum WidgetsEnum {
  Drillability = 'drillability', // matches path for WS
  Safeguards = 'safeguard', // matches path for WS
  Cutting = 'cuttingchart', // matches path for WS
  Ecd = 'ecd', // matches path for WS
  SekalHalliburtonLimit = 'sekalhalliburtonlimit',
  Wellbore = 'wellbore', // matches path for WS
  SmartAutoRop = 'smartautorop', // matches path for WS
  TransientMechanicalDrag = 'transientmechanicaldrag',
  TransientMechanicalTorque = 'transientmechanicaltorque',
  RoadmapDrag = 'roadmapdrag',
  RoadmapTorque = 'roadmaptorque',
}
