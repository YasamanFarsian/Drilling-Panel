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
import RoadmapDragChart from './components/RoadmapDragChart';
import { mappingWsToChartData } from './helpers/roadmapDragHelper';
import { useRoadmapDrag } from './hooks/useRoadmapDrag';
import { containerStyle } from './RoadmapDrag.style';
import { RoadmapDragType } from './RoadmapDragTypes';

const RoadmapDrag = ({
  isSmallVersion,
  widgetId,
  noConnectionTimerLimit,
  numOfTicks = 5,
  enableTooltips = false,
  useHostDataProvider,
}: ADVWidgetType): JSX.Element => {
  useInitialRoadmapSetting(widgetId);
  const { isConnected, data: roadmapDragData } = useHostDataProvider<RoadmapDragType>();
  const { data, timer, isShowGraph, isOpenSetting, hideAxisLabel } = useRoadmapDrag({
    widgetId,
    noConnectionTimerLimit,
    numOfTicks,
    data: roadmapDragData,
    isConnected,
  });
  const titleTag = useRoadmapTagTitle(widgetId, timer);
  const widgetTitle = useRoadmapWidgetTitle({
    widgetId,
    lokaliseKey: 'roadmapDrag',
    isDrilling: data?.isDrilling,
  });

  let content;
  if (!isShowGraph) {
    content = <Loading />;
  } else if (isOpenSetting) {
    content = <RoadmapSetting widgetId={widgetId} isSmallVersion={isSmallVersion} />;
  } else {
    content = (
      <RoadmapDragChart
        data={data}
        isSmallVersion={Boolean(isSmallVersion)}
        hideAxisLabel={hideAxisLabel}
        enableTooltips={enableTooltips}
      />
    );
  }

  return (
    <BaseWidget
      name={WidgetsLoaderEnum.RoadmapDrag}
      title={widgetTitle}
      dropdown="roadmapDrag"
      settings="roadmapDrag"
      widgetId={widgetId}
      label={WidgetsEnum.RoadmapDrag}
      axisLabelToggle={widgetId}
      hideLabel={hideAxisLabel}
      titleTag={titleTag}
    >
      <div
        data-testid={`container_${WidgetsLoaderEnum.RoadmapDrag}`}
        css={containerStyle(!isShowGraph)}
      >
        {content}
      </div>
    </BaseWidget>
  );
};

const WrappedProviderRoadmapDrag = (props: ADVWidgetType) => {
  const { HostDataProvider } = props;
  return (
    <ErrorBoundaryProvider forComponent>
      <HostDataProvider
        widgetType={WidgetsEnum.RoadmapDrag}
        mappingFn={mappingWsToChartData}
        {...props}
      >
        <RoadmapDrag {...props} />
      </HostDataProvider>
    </ErrorBoundaryProvider>
  );
};

export default WrappedProviderRoadmapDrag;
