/* eslint-disable max-lines-per-function, complexity, @typescript-eslint/no-explicit-any */
import { checkWellboreData } from '@dt-advisory/helpers/getSafeData';
import { UnitTypeEnums } from '@dt-advisory/helpers/units/unitsHelper';
import useUnitLabels from '@dt-advisory/hooks/useUnitLabels';
import ErrorBoundaryProvider from '@dt-advisory/providers/ErrorBoundary';
import { useAxisLabelToggleStore } from '@dt-advisory/store/AxisLabelToggle';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import BaseWidget from '@dt-advisory/widgets/components/BaseWidget';
import Loading from '@dt-advisory/widgets/components/Loading';
import { useTheme } from '@mui/styles';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { ADVWidgetType } from '../helpers/types';
import { mapToCurrentDTO } from './hooks/useWellboreStream';
import useWellboreChartAdapter from './useWellboreChartAdapter';
import { wellboreStyle } from './Wellbore.style';
import { wellboreAppearance } from './WellboreChartAppearance';
import { WellboreChart } from './WellboreChartSVG';
import { NewWellboreDTO, WellboreStreamMessage } from './WellboreTypes';

const Wellbore = ({ useHostDataProvider }: ADVWidgetType): JSX.Element => {
  const { mode } = useTheme();
  const hideAxisLabel = useAxisLabelToggleStore((x) => x.hideAxisLabel.wellbore);

  const { isConnected, data } = useHostDataProvider<WellboreStreamMessage>();
  const isShowGraph = Boolean(isConnected && data);

  const ref = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const offsetWidth = ref.current?.offsetWidth;
  const offsetHeight = ref.current?.offsetHeight;

  useLayoutEffect(() => {
    if (offsetWidth && offsetHeight) {
      setDimensions({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }
  }, [offsetWidth, offsetHeight, hideAxisLabel]);

  const params = useWellboreChartAdapter(isConnected, data);
  const { getLabel } = useUnitLabels();
  const appearance = {
    ...wellboreAppearance[mode],
    axisLabelY: getLabel('widget.wellbore.axis.y.dynamic.label', UnitTypeEnums.Length),
  };

  return (
    <BaseWidget
      name={WidgetsLoaderEnum.Wellbore}
      title={<FormattedMessage id="widget.wellbore_chart.title" />}
      dropdown="wellbore"
      zoomer="wellbore"
      label={WidgetsEnum.Wellbore}
      axisLabelToggle="wellbore"
      hideLabel={hideAxisLabel}
    >
      <div ref={ref} css={wellboreStyle(!isShowGraph)}>
        {!isShowGraph ? (
          <Loading />
        ) : (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
              <WellboreChart
                hideAxisLabel={hideAxisLabel}
                data={params}
                size={dimensions}
                appearance={appearance}
              />
            </div>
          </div>
        )}
      </div>
    </BaseWidget>
  );
};

const checkWellboreSafeData = (data: any) => {
  return checkWellboreData(mapToCurrentDTO(data as NewWellboreDTO));
};

const WrapProviderWellBore = (props: ADVWidgetType) => {
  const { HostDataProvider } = props;
  return (
    <ErrorBoundaryProvider forComponent>
      <HostDataProvider
        widgetType={WidgetsEnum.Wellbore}
        checkSafeData={checkWellboreSafeData}
        {...props}
      >
        <Wellbore {...props} />
      </HostDataProvider>
    </ErrorBoundaryProvider>
  );
};

export default WrapProviderWellBore;
