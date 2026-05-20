import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useHostSettingsStore } from '@dt-advisory/store/HostSettingsStore';
import {
  barActiveStyle,
  barInactiveStyle,
  barStyle,
  containerStyle,
  contentContainerStyle,
  dataFieldDividerStyle,
  dataFieldLabelStyle,
  dataFieldRecommendedLabelStyle,
  dataFieldsContainerStyle,
  dataFieldStyle,
  dataFieldValueStyle,
  dataRecommendedValueStyle,
  infoItemLabelStyle,
} from './SmartAutoRopInfoItem.style';

type DataFieldPropsType = {
  label: 'recommended' | 'actual';
  value?: number;
  'data-testid': string;
  isEmbedded: boolean;
};

const DataField = ({ 'data-testid': dataTestId, label, value, isEmbedded }: DataFieldPropsType) => {
  const isRecommendedField = label === 'recommended';
  return (
    <div data-testid={dataTestId} css={isRecommendedField && dataFieldStyle(isEmbedded)}>
      <div
        data-testid="data_field--label"
        css={[
          dataFieldLabelStyle(isEmbedded),
          isRecommendedField && dataFieldRecommendedLabelStyle,
        ]}
      >
        <FormattedMessage id={`widget.smartAutoRop.info.dataFieldLabel.${label}`} />
      </div>
      <div
        data-testid="data_field--value"
        css={[
          dataFieldValueStyle(isEmbedded),
          isRecommendedField && dataRecommendedValueStyle(isEmbedded),
        ]}
      >
        {value ?? '--'}
      </div>
    </div>
  );
};

export type SmartAutoRopInfoItemStateType = 'active' | 'idle';

export type SmartAutoRopInfoItemPropsType = {
  label: string;
  targetVal?: number;
  actualVal?: number;
  state: SmartAutoRopInfoItemStateType;
  inactive: boolean;
  dataTestIdPrefix: string;
};

// eslint-disable-next-line max-lines-per-function
const SmartAutoRopInfoItem = ({
  label,
  targetVal,
  actualVal,
  state,
  inactive,
  dataTestIdPrefix,
}: SmartAutoRopInfoItemPropsType): JSX.Element => {
  const isEmbedded = useHostSettingsStore((x) => x.isEmbedded);
  return (
    <div
      data-testid={`${dataTestIdPrefix}-smart_auto_rop_info_item_1683623006994`}
      css={containerStyle(isEmbedded)}
    >
      <div
        data-testid={`${dataTestIdPrefix}-smart_auto_rop_info_item--bar`}
        css={[barStyle, inactive ? barInactiveStyle : state === 'active' && barActiveStyle]}
      />
      <div css={contentContainerStyle}>
        <div
          data-testid={`${dataTestIdPrefix}-smart_auto_rop_info_item--label`}
          css={infoItemLabelStyle(isEmbedded)}
        >
          {label}
        </div>
        <div css={dataFieldsContainerStyle}>
          <DataField
            data-testid={`${dataTestIdPrefix}-smart_auto_rop_info_item--data_field--recommended`}
            label="recommended"
            value={targetVal}
            isEmbedded={isEmbedded}
          />
          <div
            data-testid={`${dataTestIdPrefix}-smart_auto_rop_info_item--divider`}
            css={dataFieldDividerStyle(isEmbedded)}
          />
          <DataField
            data-testid={`${dataTestIdPrefix}-smart_auto_rop_info_item--data_field--actual`}
            label="actual"
            value={actualVal}
            isEmbedded={isEmbedded}
          />
        </div>
      </div>
    </div>
  );
};

export default SmartAutoRopInfoItem;
