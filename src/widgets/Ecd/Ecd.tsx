/* eslint-disable max-lines-per-function, @typescript-eslint/no-explicit-any */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { checkECDData } from '@dt-advisory/helpers/getSafeData';
import ErrorBoundaryProvider from '@dt-advisory/providers/ErrorBoundary';
import { useAxisLabelToggleStore } from '@dt-advisory/store/AxisLabelToggle';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import BaseWidget from '@dt-advisory/widgets/components/BaseWidget';
import Loading from '@dt-advisory/widgets/components/Loading';
import { useNoStreamingTimer } from '@dt-advisory/widgets/hooks/useNoStreamingTimer';
import { ADVWidgetType } from '../helpers/types';
import EcdChart from './components/EcdChart';
import { containerStyle } from './Ecd.style';
import { ECDStream } from './EcdTypes';

type EcdPropsType = ADVWidgetType & { widgetId: string };

const Ecd = ({
  isSmallVersion,
  noConnectionTimerLimit,
  widgetId,
  enableTooltips = false,
  numOfTicks = 5,
  useHostDataProvider,
}: ADVWidgetType): JSX.Element => {
  const { isConnected, data } = useHostDataProvider<ECDStream>();
  const isShowGraph = Boolean(isConnected && data);
  useNoStreamingTimer({
    data,
    type: WidgetsEnum.Ecd,
    keys: ['lastUpdated'],
    noConnectionTimerLimit,
  });
  const hideAxisLabel = useAxisLabelToggleStore((x) => x.hideAxisLabel.ecd);

  return (
    <BaseWidget
      name={WidgetsLoaderEnum.Ecd}
      title={<FormattedMessage id="widget.ecd.title" />}
      dropdown="ecd"
      zoomer="ecd"
      label={WidgetsEnum.Ecd}
      axisLabelToggle="ecd"
      widgetId={widgetId}
      hideLabel={hideAxisLabel}
    >
      <div css={containerStyle(!isShowGraph)}>
        {!isShowGraph ? (
          <Loading />
        ) : (
          <EcdChart
            widgetId={widgetId}
            data={data}
            isSmallVersion={isSmallVersion}
            numOfTicks={numOfTicks}
            enableTooltips={enableTooltips}
          />
        )}
      </div>
    </BaseWidget>
  );
};

const WrappedProviderEcd = (props: ADVWidgetType) => {
  const { HostDataProvider } = props;
  return (
    <ErrorBoundaryProvider forComponent>
      <HostDataProvider widgetType={WidgetsEnum.Ecd} checkSafeData={checkECDData} {...props}>
        <Ecd {...props} />
      </HostDataProvider>
    </ErrorBoundaryProvider>
  );
};
export default WrappedProviderEcd;
