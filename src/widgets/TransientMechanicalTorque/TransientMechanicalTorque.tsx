/* eslint-disable max-lines-per-function */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import ErrorBoundaryProvider from '@dt-advisory/providers/ErrorBoundary';
import { useAxisLabelToggleStore } from '@dt-advisory/store/AxisLabelToggle';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import BaseWidget from '@dt-advisory/widgets/components/BaseWidget';
import Loading from '@dt-advisory/widgets/components/Loading';
import { getTransientMechanicalTorqueSafeData } from '@dt-advisory/widgets/helpers/transientHelpers';
import { useNoStreamingTimer } from '@dt-advisory/widgets/hooks/useNoStreamingTimer';
import { ADVWidgetType } from '../helpers/types';
import TransientMechanicalTorqueChart from './components/TransientMechanicalTorqueChart/TransientMechanicalTorqueChart';
import { containerStyle } from './TransientMechanicalTorque.style';
import { TransientMechanicalTorqueType } from './TransientMechanicalTorqueTypes';

const TransientMechanicalTorque = ({
  isSmallVersion,
  noConnectionTimerLimit,
  enableTooltips = false,
  numOfTicks = 5,
  useHostDataProvider,
}: ADVWidgetType): JSX.Element => {
  const { isConnected, data } = useHostDataProvider<TransientMechanicalTorqueType>();
  useNoStreamingTimer({
    data,
    type: WidgetsEnum.TransientMechanicalTorque,
    keys: ['lastUpdated'],
    noConnectionTimerLimit,
  });
  const isShowGraph = Boolean(isConnected && data);
  const hideAxisLabel = useAxisLabelToggleStore((x) => x.hideAxisLabel.transientMechanicalTorque);

  return (
    <BaseWidget
      name={WidgetsLoaderEnum.TransientMechanicalTorque}
      title={
        <FormattedMessage
          id="widget.transientmechanicaltorque.title"
          defaultMessage="transientmechanicaltorque"
        />
      }
      label={WidgetsEnum.TransientMechanicalTorque}
      dropdown="transientmechanicaltorque"
      axisLabelToggle="transientMechanicalTorque"
      hideLabel={hideAxisLabel}
    >
      <div
        data-testid={`container_${WidgetsLoaderEnum.TransientMechanicalTorque}`}
        css={containerStyle(!isShowGraph)}
      >
        {!isShowGraph ? (
          <Loading />
        ) : (
          <TransientMechanicalTorqueChart
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

const WrappedProviderTransientMechanicalTorque = (props: ADVWidgetType) => {
  const { HostDataProvider } = props;
  return (
    <ErrorBoundaryProvider forComponent>
      <HostDataProvider
        widgetType={WidgetsEnum.TransientMechanicalTorque}
        checkSafeData={getTransientMechanicalTorqueSafeData}
        {...props}
      >
        <TransientMechanicalTorque {...props} />
      </HostDataProvider>
    </ErrorBoundaryProvider>
  );
};

export default WrappedProviderTransientMechanicalTorque;
