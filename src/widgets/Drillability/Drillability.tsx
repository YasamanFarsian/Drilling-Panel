import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import BaseWidget from '@dt-advisory/widgets/components/BaseWidget';
import Loading from '@dt-advisory/widgets/components/Loading';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { getDrillabilitySafeData } from '../helpers/drillabilityHelper';
import { ADVWidgetType } from '../helpers/types';
import { baseWidgetStyle, containerStyle } from './Drillability.style';
import { ActiveDrillabilityType, DrillabilityType } from './DrillabilityTypes';
import { DrillingEfficiencyChart } from './DrillingEfficiency/DrillingEfficiencyChart';

export type DrillabilityPropsType = Record<string, never>;

export type DrillingEfficiencyParams = {
  wobDrillingControlSystem: number;
  wobb: number;
  dmse: number;
  dstem: number;
  doc: number;
};

// eslint-disable-next-line max-lines-per-function
const Drillability = ({ useHostDataProvider }: ADVWidgetType): JSX.Element => {
  const { isConnected, data } = useHostDataProvider<DrillabilityType>();
  const isShowGraph = Boolean(isConnected && data);

  return (
    <BaseWidget
      name={WidgetsLoaderEnum.Drillability}
      css={baseWidgetStyle}
      title={<FormattedMessage id="widget.drillability.title" defaultMessage="drillability" />}
    >
      <div
        data-testid={`container_${WidgetsLoaderEnum.Drillability}`}
        css={containerStyle(!isShowGraph)}
      >
        {!isShowGraph ? (
          <Loading />
        ) : (
          <>
            <DrillingEfficiencyChart
              data={data as ActiveDrillabilityType}
            ></DrillingEfficiencyChart>
          </>
        )}
      </div>
    </BaseWidget>
  );
};

const WrappedProviderDrillability = (props: ADVWidgetType) => {
  const { HostDataProvider } = props;
  return (
    <HostDataProvider
      widgetType={WidgetsEnum.Drillability}
      checkSafeData={getDrillabilitySafeData}
      {...props}
    >
      <Drillability {...props} />
    </HostDataProvider>
  );
};
export default WrappedProviderDrillability;
