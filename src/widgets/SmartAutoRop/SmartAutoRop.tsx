import { getConvertedDataSmartAutoRop } from '@dt-advisory/helpers/units/unitsHelper';
import ErrorBoundaryProvider from '@dt-advisory/providers/ErrorBoundary';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import BaseWidget, { WidgetStatusEnum } from '@dt-advisory/widgets/components/BaseWidget';
import Loading from '@dt-advisory/widgets/components/Loading';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ADVWidgetType } from '../helpers/types';
import SmartAutoRopChart from './components/SmartAutoRopChart';
import SmartAutoRopInformation from './components/SmartAutoRopInformation';
import SmartAutoRopSetting from './components/SmartAutoRopSetting';
import { useSmartAutoRop } from './hooks/useSmartAutoRop';
import { containerStyle } from './SmartAutoRop.style';
import { SmartAutoRopType } from './SmartAutoRopTypes';

// eslint-disable-next-line max-lines-per-function, complexity
const SmartAutoRop = ({
  isSmallVersion,
  noConnectionTimerLimit,
  useHostDataProvider,
}: ADVWidgetType): JSX.Element => {
  const { isConnected, data } = useHostDataProvider<SmartAutoRopType>();
  const {
    hideInformation,
    status,
    isShowGraph,
    activeDataKeys,
    indicatorData,
    infoData,
    isOpenSetting,
  } = useSmartAutoRop({ noConnectionTimerLimit, data, isConnected });

  let content;
  if (!isShowGraph) {
    content = <Loading />;
  } else if (isOpenSetting) {
    content = <SmartAutoRopSetting />;
  } else {
    content = (
      <>
        {!hideInformation && (
          <SmartAutoRopInformation
            data={infoData}
            inactive={status == WidgetStatusEnum.INACTIVE}
            activeDataKeys={activeDataKeys}
            isSmallVersion={isSmallVersion}
          />
        )}
        <SmartAutoRopChart
          inactive={status == WidgetStatusEnum.INACTIVE}
          activeDataKeys={activeDataKeys}
          indicatorData={indicatorData}
        />
      </>
    );
  }

  return (
    <BaseWidget
      name={WidgetsLoaderEnum.SmartAutoRop}
      widgetStatus={status}
      label={WidgetsEnum.SmartAutoRop}
      title={<FormattedMessage id="widget.smartAutoRop.title" defaultMessage="smartautorop" />}
      axisLabelToggle="smartAutoRop"
      settings="smartAutoRop"
      hideLabel={hideInformation}
    >
      <div
        data-testid={`container_${WidgetsLoaderEnum.SmartAutoRop}`}
        css={containerStyle(!isShowGraph, isSmallVersion)}
      >
        {content}
      </div>
    </BaseWidget>
  );
};

const WrapProviderSmartAutoRop = (props: ADVWidgetType) => {
  const { HostDataProvider } = props;
  return (
    <ErrorBoundaryProvider forComponent>
      <HostDataProvider
        widgetType={WidgetsEnum.SmartAutoRop}
        checkSafeData={getConvertedDataSmartAutoRop}
        {...props}
      >
        <SmartAutoRop {...props} />
      </HostDataProvider>
    </ErrorBoundaryProvider>
  );
};

export default WrapProviderSmartAutoRop;
