/* eslint-disable complexity, max-lines-per-function */
import useIsSingleWidget from '../../../../hooks/useIsSingleWidget';
import { CategorylimitParams } from '../../../SekalHalliburtonLimitTypes';
import {
  borderlineStyle,
  dataInfoStyle,
  maxMinValueStyle,
  paramContainer,
  parameterTitleStyle,
} from './ParametersLimitInfo.style';

export default function ParametersLimitInfo({
  combinedLimit,
  rangeSekal,
  rangeHalliburton,
  measuredValue,
  rangeDriller,
  label,
}: CategorylimitParams) {
  const isSingleWidget = useIsSingleWidget();
  return (
    <div css={dataInfoStyle}>
      <div data-testid="parameter_title" css={parameterTitleStyle(isSingleWidget)}>
        {label}
      </div>

      <div css={paramContainer(true, true, isSingleWidget)}>
        <div css={maxMinValueStyle}>
          <div>{combinedLimit?.max ?? '--'}</div>
          <div css={borderlineStyle}></div>
          <div>{combinedLimit?.min ?? '--'}</div>
        </div>
      </div>

      <div css={paramContainer(false, false, isSingleWidget)}>
        <div css={maxMinValueStyle}>
          <div>{rangeSekal?.max ?? '--'}</div>
          <div css={borderlineStyle}></div>
          <div>{rangeSekal?.min ?? '--'}</div>
        </div>
      </div>
      <div css={paramContainer(false, false, isSingleWidget)}>
        <div css={maxMinValueStyle}>
          <div>{rangeHalliburton?.max ?? '--'}</div>
          <div css={borderlineStyle}></div>
          <div>{rangeHalliburton?.min ?? '--'}</div>
        </div>
      </div>
      <div css={paramContainer(false, false, isSingleWidget)}>
        <div css={maxMinValueStyle}>
          <div>{rangeDriller?.max ?? '--'}</div>
          <div css={borderlineStyle}></div>
          <div>{rangeDriller?.min ?? '--'}</div>
        </div>
      </div>
      <div css={paramContainer(false, true, isSingleWidget)}>
        <div css={maxMinValueStyle}>
          <div>{measuredValue ?? '--'}</div>
        </div>
      </div>
    </div>
  );
}
