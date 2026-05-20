import React from 'react';
import { FormattedMessage } from 'react-intl';
import ErrorBoundaryProvider from '@dt-advisory/providers/ErrorBoundary';
import { useAxisLabelToggleStore } from '@dt-advisory/store/AxisLabelToggle';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import BaseWidget from '@dt-advisory/widgets/components/BaseWidget';
import Loading from '@dt-advisory/widgets/components/Loading';
import { getTransientMechanicalDragSafeData } from '@dt-advisory/widgets/helpers/transientHelpers';
import { useNoStreamingTimer } from '@dt-advisory/widgets/hooks/useNoStreamingTimer';
import { ADVWidgetType } from '../helpers/types';
import TransientMechanicalDragChart from './components/TransientMechanicalDragChart/TransientMechanicalDragChart';
import { containerStyle } from './TransientMechanicalDrag.style';
import { TransientMechanicalDragType } from './TransientMechanicalDragTypes';

// eslint-disable-next-line max-lines-per-function
const TransientMechanicalDrag = ({
  isSmallVersion,
  noConnectionTimerLimit,
  numOfTicks = 5,
  enableTooltips = false,
  useHostDataProvider,
}: ADVWidgetType): JSX.Element => {
  const { isConnected, data } = useHostDataProvider<TransientMechanicalDragType>();
  useNoStreamingTimer({
    data,
    type: WidgetsEnum.TransientMechanicalDrag,
    keys: ['lastUpdated'],
    noConnectionTimerLimit,
  });
  const isShowGraph = Boolean(isConnected && data);
  const hideAxisLabel = useAxisLabelToggleStore((x) => x.hideAxisLabel.transientMechanicalDrag);

  return (
    <BaseWidget
      name={WidgetsLoaderEnum.TransientMechanicalDrag}
      title={
        <FormattedMessage
          id="widget.transientmechanicaldrag.title"
          defaultMessage="transientmechanicaldrag"
        />
      }
      label={WidgetsEnum.TransientMechanicalDrag}
      axisLabelToggle="transientMechanicalDrag"
      dropdown="transientmechanicaldrag"
      hideLabel={hideAxisLabel}
    >
      <div
        data-testid={`container_${WidgetsLoaderEnum.TransientMechanicalDrag}`}
        css={containerStyle(!isShowGraph)}
      >
        {!isShowGraph ? (
          <Loading />
        ) : (
          <TransientMechanicalDragChart
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

const WrappedProviderTransientMechanicalDrag = (props: ADVWidgetType) => {
  const { HostDataProvider } = props;
  return (
    <ErrorBoundaryProvider forComponent>
      <HostDataProvider
        widgetType={WidgetsEnum.TransientMechanicalDrag}
        checkSafeData={getTransientMechanicalDragSafeData}
        {...props}
      >
        <TransientMechanicalDrag {...props} />
      </HostDataProvider>
    </ErrorBoundaryProvider>
  );
};

export default WrappedProviderTransientMechanicalDrag;
