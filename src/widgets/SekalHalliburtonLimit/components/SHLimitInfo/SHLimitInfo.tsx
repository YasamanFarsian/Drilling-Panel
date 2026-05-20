/* eslint-disable complexity, max-lines-per-function */
import { getUnitLabelIdByUnitType, UnitTypeEnums } from '@dt-advisory/helpers/units/unitsHelper';

import { Box } from '@mui/material';
import { useIntl } from 'react-intl';
import useIsSingleWidget from '../../../hooks/useIsSingleWidget';
import { OrchestrianSHLimitParams } from '../../SekalHalliburtonLimitTypes';
import CategoryTitle from './CategoryTitle/CategoryTitle';
import ParametersLimitInfo from './ParametersLimitInfo/ParametersLimitInfo';
import {
  containerBoxStyle,
  containerStyle,
  containerTitleStyle,
  firstTitleColStyle,
} from './SHLimitInfo.style';

export default function SekalHalliburtonLimitInfo({ data }: { data: OrchestrianSHLimitParams }) {
  const { formatMessage } = useIntl();
  const removeDecimal = (value?: number) => ('number' === typeof value ? Math.floor(value) : value);

  const slowVelocityUnitLabelId = getUnitLabelIdByUnitType(UnitTypeEnums.Rop);
  const rotationalSpeedUnitLabelId = getUnitLabelIdByUnitType(UnitTypeEnums.RotationFrequency);
  const volumeFlowRateUnitLabelId = getUnitLabelIdByUnitType(UnitTypeEnums.FlowRate);
  const weightUnitLabelId = getUnitLabelIdByUnitType(UnitTypeEnums.Wob);
  const titleArray = [
    'widget.sekalhalliburtonlimit.infoLabel.dynamic.orchestratedlimit',
    'widget.sekalhalliburtonlimit.infoLabel.dynamic.sekallimit',
    'widget.sekalhalliburtonlimit.infoLabel.dynamic.halliburtonlimit',
    'widget.sekalhalliburtonlimit.infoLabel.dynamic.drillerlimit',
    'widget.sekalhalliburtonlimit.infoLabel.dynamic.measuredvalue',
  ];
  const isSingleWidget = useIsSingleWidget();
  return (
    <Box css={containerStyle}>
      <div css={containerTitleStyle}>
        <div css={containerTitleStyle}>
          <div css={firstTitleColStyle(isSingleWidget)}></div>
          {titleArray.map((id) => (
            <CategoryTitle key={id} label={formatMessage({ id })} />
          ))}
        </div>
      </div>
      <div css={containerBoxStyle}>
        <ParametersLimitInfo
          combinedLimit={{
            min: removeDecimal(data.orcflowmin),
            max: removeDecimal(data.orcflowmax),
          }}
          rangeSekal={{
            min: removeDecimal(data.orcsekalflowmin),
            max: removeDecimal(data.orcsekalflowmax),
          }}
          rangeHalliburton={{
            min: removeDecimal(data.orcexternalflowmin),
            max: removeDecimal(data.orcexternalflowmax),
          }}
          rangeDriller={{
            min: removeDecimal(data.orcdcsflowmin),
            max: removeDecimal(data.orcdcsflowmax),
          }}
          measuredValue={data.orcflowmeasured?.toFixed(0)}
          label={formatMessage(
            {
              id: 'widget.sekalhalliburtonlimit.infoLabel.dynamic.flowRate',
            },
            { unit: formatMessage({ id: volumeFlowRateUnitLabelId }) },
          )}
        />

        <ParametersLimitInfo
          combinedLimit={{ min: removeDecimal(data.orcropmin), max: removeDecimal(data.orcropmax) }}
          rangeSekal={{
            min: removeDecimal(data.orcsekalropmin),
            max: removeDecimal(data.orcsekalropmax),
          }}
          rangeHalliburton={{
            min: removeDecimal(data.orcexternalropmin),
            max: removeDecimal(data.orcexternalropmax),
          }}
          rangeDriller={{
            min: removeDecimal(data.orcdcsropmin),
            max: removeDecimal(data.orcdcsropmax),
          }}
          measuredValue={data.orcropmeasured?.toFixed(0)}
          label={formatMessage(
            {
              id: 'widget.sekalhalliburtonlimit.infoLabel.dynamic.rop',
            },
            { unit: formatMessage({ id: slowVelocityUnitLabelId }) },
          )}
        />
        <ParametersLimitInfo
          combinedLimit={{ min: removeDecimal(data.orcrpmmin), max: removeDecimal(data.orcrpmmax) }}
          rangeSekal={{
            min: removeDecimal(data.orcsekalrpmmin),
            max: removeDecimal(data.orcsekalrpmmax),
          }}
          rangeHalliburton={{
            min: removeDecimal(data.orcexternalrpmmin),
            max: removeDecimal(data.orcexternalrpmmax),
          }}
          rangeDriller={{
            min: removeDecimal(data.orcdcsrpmmin),
            max: removeDecimal(data.orcdcsrpmmax),
          }}
          measuredValue={data.orcrpmmeasured?.toFixed(0)}
          label={formatMessage(
            {
              id: 'widget.sekalhalliburtonlimit.infoLabel.dynamic.rpm',
            },
            { unit: formatMessage({ id: rotationalSpeedUnitLabelId }) },
          )}
        />

        <ParametersLimitInfo
          combinedLimit={{
            min: data.orcwobmin?.toFixed(1),
            max: data.orcwobmax?.toFixed(1),
          }}
          rangeSekal={{
            min: data.orcsekalwobmin?.toFixed(1),
            max: data.orcsekalwobmax?.toFixed(1),
          }}
          rangeHalliburton={{
            min: data.orcexternalwobmin?.toFixed(1),
            max: data.orcexternalwobmax?.toFixed(1),
          }}
          rangeDriller={{
            min: data.orcdcswobmin?.toFixed(1),
            max: data.orcdcswobmax?.toFixed(1),
          }}
          measuredValue={data.orcwobmeasured?.toFixed(1)}
          label={formatMessage(
            {
              id: 'widget.sekalhalliburtonlimit.infoLabel.dynamic.wob',
            },
            { unit: formatMessage({ id: weightUnitLabelId }) },
          )}
        />
      </div>
    </Box>
  );
}
