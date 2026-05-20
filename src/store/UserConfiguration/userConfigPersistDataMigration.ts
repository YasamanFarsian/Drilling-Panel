import { ConfigurationStoreType } from './UserConfiguration';
import { TemplateToSaveType, WidgetsLoaderEnum } from './UserConfiguration.types';

// eslint-disable-next-line max-lines-per-function
export const userConfigPersistDataMigration = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  oldState: any,
  //fromVersion: number,
): ConfigurationStoreType => {
  const oldDefaultTemplateLayout: TemplateToSaveType[] = oldState.templatesToSave.slice(0, 4);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modifiedDefaultTemplateLayout: TemplateToSaveType[] = [
    { ...oldDefaultTemplateLayout[0], name: 'DT Advisory 1' },
    {
      ...oldDefaultTemplateLayout[1],
      name: 'DT Advisory 2',
      gridConfig: [
        [0, 1, 2],
        [0, 1, 3],
      ],
      widgetConfig: [
        {
          key: WidgetsLoaderEnum.Safeguards,
        },
        {
          key: WidgetsLoaderEnum.Wellbore,
        },
        {
          key: WidgetsLoaderEnum.Cutting,
        },
        {
          key: WidgetsLoaderEnum.Ecd,
        },
      ],
    },
    {
      ...oldDefaultTemplateLayout[2],
      name: 'DT Advisory 3',
      gridConfig: [
        [0, 1, 2],
        [0, 3, 4],
      ],
      widgetConfig: [
        {
          key: WidgetsLoaderEnum.Safeguards,
        },
        {
          key: WidgetsLoaderEnum.Cutting,
        },
        {
          key: WidgetsLoaderEnum.Wellbore,
        },
        {
          key: WidgetsLoaderEnum.Ecd,
        },
        {
          key: WidgetsLoaderEnum.TransientMechanicalDrag,
        },
      ],
    },
    {
      ...oldDefaultTemplateLayout[3],
      name: 'DT Advisory 4',
      gridConfig: [
        [0, 1, 2],
        [3, 4, 5],
      ],
      widgetConfig: [
        {
          key: WidgetsLoaderEnum.Cutting,
        },
        {
          key: WidgetsLoaderEnum.Wellbore,
        },
        {
          key: WidgetsLoaderEnum.TransientMechanicalTorque,
        },
        {
          key: WidgetsLoaderEnum.Ecd,
        },
        {
          key: WidgetsLoaderEnum.TransientMechanicalDrag,
        },
        {
          key: WidgetsLoaderEnum.SmartAutoRop,
        },
      ],
    },
  ];

  return {
    ...oldState,
    currentUserConfig: {
      ...oldState.currentUserConfig,
      layouts: [...modifiedDefaultTemplateLayout, ...oldState.currentUserConfig.layouts.slice(4)],
    },
    templatesToSave: [...modifiedDefaultTemplateLayout, ...oldState.templatesToSave.slice(4)],
  };
};
