/* eslint-disable max-lines-per-function, complexity, @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { checkCuttingChartData } from '@dt-advisory/helpers/getSafeData';
import ErrorBoundaryProvider from '@dt-advisory/providers/ErrorBoundary';
import { useAxisLabelToggleStore } from '@dt-advisory/store/AxisLabelToggle';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import BaseWidget from '@dt-advisory/widgets/components/BaseWidget';
import Loading from '@dt-advisory/widgets/components/Loading';
import { useNoStreamingTimer } from '@dt-advisory/widgets/hooks/useNoStreamingTimer';
import { ADVWidgetType } from '../helpers/types';
import CuttingChart from './components/CuttingChart';
import { containerStyle } from './Cutting.style';
import { CuttingChartStreamMessage } from './CuttingTypes';

const Cutting = ({
  isSmallVersion,
  noConnectionTimerLimit,
  enableTooltips = false,
  useHostDataProvider,
}: ADVWidgetType): JSX.Element => {
  const { isConnected, data } = useHostDataProvider<CuttingChartStreamMessage>();
  const isShowGraph = Boolean(isConnected && data);
  useNoStreamingTimer({
    data,
    type: WidgetsEnum.Cutting,
    keys: ['lastUpdated'],
    noConnectionTimerLimit,
  });
  const hideAxisLabel = useAxisLabelToggleStore((x) => x.hideAxisLabel.cutting);

  return (
    <BaseWidget
      name={WidgetsLoaderEnum.Cutting}
      title={<FormattedMessage id="widget.cutting_chart.title" />}
      dropdown="cutting"
      label={WidgetsEnum.Cutting}
      axisLabelToggle="cutting"
      hideLabel={hideAxisLabel}
    >
      <div css={containerStyle(!isShowGraph)}>
        {!isShowGraph ? (
          <Loading />
        ) : (
          <CuttingChart
            isSmallVersion={isSmallVersion}
            data={data!}
            enableTooltips={enableTooltips}
          />
        )}
      </div>
    </BaseWidget>
  );
};

const WrappedProviderCutting = (props: ADVWidgetType) => {
  const { HostDataProvider } = props;
  return (
    <ErrorBoundaryProvider forComponent>
      <HostDataProvider
        widgetType={WidgetsEnum.Cutting}
        checkSafeData={checkCuttingChartData}
        {...props}
      >
        <Cutting {...props} />
      </HostDataProvider>
    </ErrorBoundaryProvider>
  );
};

export default WrappedProviderCutting;
