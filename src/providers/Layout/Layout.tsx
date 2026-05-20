/* eslint-disable max-lines-per-function, complexity */
import WidgetLayout from '@dt-advisory/components/WidgetLayout';
import WidgetsLoader from '@dt-advisory/components/WidgetsLoader';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import {
  QueryStringWidgetType,
  WidgetLayoutEnum,
  WidgetsLoaderEnum,
} from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import {
  getDefaultNoConectionTimerLimit,
  isWidgetSmallVersion,
} from '@dt-advisory/store/UserConfiguration/userConfigurationHelper';
import React, { lazy, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import shortid from 'shortid';
import { useConfigs } from '../Configs';
import { getDataProviderForWidget } from './layoutDataProviderHelper';

// https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
const importView = async (widget: WidgetsLoaderEnum) => {
  const result = lazy(() =>
    import(`../../widgets/${widget}/index.ts`).catch((e) => import('../../components/NoWidget')),
  );
  return result;
};

type LayoutType = Record<string, never>; // provider value shape

const LayoutContext = React.createContext<LayoutType | undefined>(undefined);

type LayoutProviderPropsType = {
  children?: React.ReactNode;
};

export const useSingleWidgetQueryParam = () => {
  const params = useParams();
  const widgetToLoadSearch = params.widgetName as QueryStringWidgetType;
  const setHeaderVisible = useSettingsStore((x) => x.setHeaderVisible);

  const widgetMap: { [key in QueryStringWidgetType]?: WidgetsLoaderEnum } = {
    ecd: WidgetsLoaderEnum.Ecd,

    cutting: WidgetsLoaderEnum.Cutting,
    transientmechanicaldrag: WidgetsLoaderEnum.TransientMechanicalDrag,
    transientmechanicaltorque: WidgetsLoaderEnum.TransientMechanicalTorque,
    roadmapdrag: WidgetsLoaderEnum.RoadmapDrag,
    roadmaptorque: WidgetsLoaderEnum.RoadmapTorque,
    wellbore: WidgetsLoaderEnum.Wellbore,
    drillability: WidgetsLoaderEnum.Drillability,
    smartautorop: WidgetsLoaderEnum.SmartAutoRop,
    sekalhalliburtonlimit: WidgetsLoaderEnum.SekalHalliburtonLimit,
  };

  const widgetToLoad = widgetMap[widgetToLoadSearch];
  setHeaderVisible(!Boolean(widgetToLoad));

  return widgetToLoad;
};

const LayoutProvider = ({ children }: LayoutProviderPropsType): JSX.Element => {
  const { enableTooltips } = useConfigs();
  const widgetToLoad = useSingleWidgetQueryParam();
  const layout = useUserConfigurationStore((x) => x.layout);
  const widgetCatalog = useUserConfigurationStore((x) => x.currentUserConfig?.widgetCatalog);
  const widgetsToLoad = useUserConfigurationStore((x) => x.widgetsToLoad);
  const loadLayoutWidgets = useUserConfigurationStore((x) => x.loadLayoutWidgets);
  const currentConfig = useUserConfigurationStore((x) => x.currentUserConfig);
  const memoizedWidgetsToLoad = useMemo(() => widgetsToLoad, [widgetsToLoad]);
  const [widgetViews, setSidgetViews] = useState<JSX.Element[]>();
  const widgets = currentConfig?.widgetConfig;
  const currentLayout = widgetToLoad ? WidgetLayoutEnum.OneRowOneWidget : layout;

  // load layout and widgets
  useEffect(() => {
    loadLayoutWidgets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // when `loadLayoutWidgets` is called this will be triggered
  useEffect(() => {
    const currentWidgetsToLoad = widgetToLoad ? [widgetToLoad] : memoizedWidgetsToLoad;
    const loadWidgetViews = async () => {
      const promises = currentWidgetsToLoad.map(async (widgetView, index) => {
        const currentWidgetId =
          widgetToLoad ?? widgets?.[index]?.widgetConfig?.widgetId ?? shortid.generate();
        const View = await importView(widgetView);
        const isSmallVersion = widgetToLoad ?? isWidgetSmallVersion(index, layout);
        return (
          <View
            key={shortid.generate()}
            isSmallVersion={isSmallVersion}
            numOfTicks={5}
            widgetId={currentWidgetId}
            enableTooltips={enableTooltips}
            {...getDataProviderForWidget(widgetView)}
            noConnectionTimerLimit={getDefaultNoConectionTimerLimit(widgetView, widgetCatalog)}
          />
        );
      });
      Promise.all(promises).then(setSidgetViews);
    };
    if (Array.isArray(currentWidgetsToLoad) && currentWidgetsToLoad.length > 0) {
      loadWidgetViews();
    }
  }, [memoizedWidgetsToLoad, layout, widgetCatalog, widgetToLoad]);

  return (
    <LayoutContext.Provider value={undefined}>
      <React.Suspense fallback={<WidgetsLoader />}>
        <WidgetLayout layout={currentLayout}>{widgetViews}</WidgetLayout>
      </React.Suspense>
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
