import { getUnitLabelIdByUnitType, UnitTypeEnums } from '@dt-advisory/helpers/units/unitsHelper';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import React from 'react';
import { useIntl } from 'react-intl';
import DocGraph from './Doc/Doc';
import DownholeEmseGraph from './DownholeEmse/DownholeEmse';
import {
  containerStyle,
  thermsStyle,
  topGroupStyle,
  wrapperDivStyle,
  wrapperStyle,
} from './DrillingEfficiencyChart.style';
import Thermometer from './Thermometer/Thermometer';

const styles = {
  app: '',
  topGroup: '',
  wrapper: '',
  therms: '',
};

export type DrillingEfficiencyParams = {
  downholeMSE: number;
  doc: number;
  effLoss: number;
  bitHyd: number;
  downholeWOB: number;
  wobDrillingControlSystem: number;
};

// eslint-disable-next-line max-lines-per-function
export function DrillingEfficiencyChart({ data }: { data: DrillingEfficiencyParams }) {
  const prefixTestId = WidgetsLoaderEnum.Drillability;
  const { formatMessage } = useIntl();
  const thermometerData = [
    {
      labelId: 'widget.drillability.eff.label',
      defaultMessage: 'Eff.Loss(%)',
      unitId: getUnitLabelIdByUnitType(UnitTypeEnums.Proportion),
      range: { min: 0, max: 100 },
      hi: data.effLoss,
    },
    {
      labelId: '"widget.drillability.bithyd.label"',
      defaultMessage: 'Bit Hyd(HSI)',
      unitId: 'HSI', // No unit type mapping as of now to BE
      range: { min: 0, max: 7 },
      hi: data.bitHyd,
    },
    {
      labelId: 'widget.drillability.wob.label',
      defaultMessage: 'WOB(ton)',
      unitId: getUnitLabelIdByUnitType(UnitTypeEnums.Wob),
      range: { min: 0, max: 30 },
      lo: data.downholeWOB,
      hi: data.wobDrillingControlSystem,
    },
  ];

  return (
    <div css={containerStyle} className={styles.app}>
      <div css={topGroupStyle}>
        <div css={wrapperStyle} style={{ flexGrow: 2 }}>
          <div css={wrapperDivStyle}>
            <DownholeEmseGraph
              widgetName={WidgetsLoaderEnum.Drillability}
              val={data.downholeMSE}
              label={formatMessage({
                id: 'widget.drillability.emse.label',
                defaultMessage: 'Downhole eMSE',
              })}
            />
          </div>
        </div>
        <div css={wrapperStyle}>
          <div css={wrapperDivStyle}>
            <DocGraph
              widgetName={WidgetsLoaderEnum.Drillability}
              val={data.doc}
              label={formatMessage({
                id: 'widget.drillability.doc.label',
              })}
            />
          </div>
        </div>
      </div>
      <div css={thermsStyle}>
        {thermometerData.map((thermometer, index) => (
          <div key={index} css={wrapperStyle} className="wrapperLine">
            <div css={wrapperDivStyle}>
              <Thermometer
                widgetName={`${WidgetsLoaderEnum.Drillability}-${thermometer.labelId}`}
                label={formatMessage({
                  id: thermometer.labelId,
                  defaultMessage: thermometer.defaultMessage,
                })}
                range={thermometer.range}
                lo={thermometer.lo}
                hi={thermometer.hi}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
