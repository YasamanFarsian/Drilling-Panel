/* eslint-disable max-lines-per-function */
import ErrorBoundaryProvider from '@dt-advisory/providers/ErrorBoundary';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import BaseWidget from '@dt-advisory/widgets/components/BaseWidget';
import Loading from '@dt-advisory/widgets/components/Loading';
import { useInitialRoadmapSetting } from '@dt-advisory/widgets/hooks/useInitialRoadmapSetting';
import { useRoadmapTagTitle } from '@dt-advisory/widgets/hooks/useRoadmapTagTitle';
import { useRoadmapWidgetTitle } from '@dt-advisory/widgets/hooks/useRoadmapWidgetTitle';
import React from 'react';
import RoadmapSetting from '../components/RoadmapSetting';
import { ADVWidgetType } from '../helpers/types';
import RoadmapTorqueChart from './components/RoadmapTorqueChart';
import { mappingWsToChartData } from './helpers/roadmapTorqueHelper';
import { useRoadmapTorque } from './hooks/useRoadmapTorque';
import { containerStyle } from './RoadmapTorque.style';
import { RoadmapTorqueType } from './RoadmapTorqueTypes';

const RoadmapTorque = ({
  isSmallVersion,
  widgetId,
  noConnectionTimerLimit,
  numOfTicks = 5,
  enableTooltips = false,
  useHostDataProvider,
}: ADVWidgetType): JSX.Element => {
  useInitialRoadmapSetting(widgetId);
  const { isConnected, data: roadmapTorqueData } = useHostDataProvider<RoadmapTorqueType>();
  const { data, timer, isShowGraph, isOpenSetting, hideAxisLabel } = useRoadmapTorque({
    widgetId,
    noConnectionTimerLimit,
    numOfTicks,
    data: roadmapTorqueData,
    isConnected,
  });
  const titleTag = useRoadmapTagTitle(widgetId, timer);
  const widgetTitle = useRoadmapWidgetTitle({
    widgetId,
    lokaliseKey: 'roadmapTorque',
    isDrilling: data.isDrilling,
  });
  let content;
  if (!isShowGraph) {
    content = <Loading />;
  } else if (isOpenSetting) {
    content = (
      <RoadmapSetting
        widgetName={WidgetsLoaderEnum.RoadmapTorque}
        widgetId={widgetId}
        isSmallVersion={isSmallVersion}
      />
    );
  } else {
    content = (
      <RoadmapTorqueChart
        data={data}
        isSmallVersion={Boolean(isSmallVersion)}
        hideAxisLabel={hideAxisLabel}
        enableTooltips={enableTooltips}
      />
    );
  }

  return (
    <BaseWidget
      name={WidgetsLoaderEnum.RoadmapTorque}
      title={widgetTitle}
      label={WidgetsEnum.RoadmapTorque}
      dropdown="roadmapTorque"
      settings="roadmapTorque"
      widgetId={widgetId}
      axisLabelToggle={widgetId}
      hideLabel={hideAxisLabel}
      titleTag={titleTag}
    >
      <div
        data-testid={`container_${WidgetsLoaderEnum.RoadmapTorque}`}
        css={containerStyle(!isShowGraph)}
      >
        {content}
      </div>
    </BaseWidget>
  );
};

const WrappedProviderRoadmapTorque = (props: ADVWidgetType) => {
  const { HostDataProvider } = props;
  return (
    <ErrorBoundaryProvider forComponent>
      <HostDataProvider
        widgetType={WidgetsEnum.RoadmapTorque}
        mappingFn={mappingWsToChartData}
        {...props}
      >
        <RoadmapTorque {...props} />
      </HostDataProvider>
    </ErrorBoundaryProvider>
  );
};

export default WrappedProviderRoadmapTorque;
