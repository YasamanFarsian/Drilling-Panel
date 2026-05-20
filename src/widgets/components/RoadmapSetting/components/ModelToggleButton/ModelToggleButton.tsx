import { Typography } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import ToggleButtonGroup from '@dt-advisory/components/ToggleButtonGroup';
import { RoadmapModelType } from '@dt-advisory/store/Settings';
import { headerLabelStyle } from '../../RoadmapSetting.style';

type ModelToggleButtonPropsType = {
  model: RoadmapModelType;
  handleModelChange: (value: RoadmapModelType) => void;
  isSmallVersion?: boolean;
};

// eslint-disable-next-line max-lines-per-function
const ModelToggleButton = ({
  handleModelChange,
  model,
  isSmallVersion,
}: ModelToggleButtonPropsType): JSX.Element => {
  const { formatMessage } = useIntl();

  return (
    <div data-testid="model_toggle_button_1688535287388">
      <Typography css={headerLabelStyle}>
        {formatMessage({ id: 'widget.roadmap.setting.model.title' })}
      </Typography>
      <ToggleButtonGroup
        data-testid="threshold_base_toggle_1677143809761"
        onChange={(_, value) => handleModelChange(value)}
        value={model}
        options={[
          {
            value: 'Steadystate',
            label: formatMessage({ id: 'widget.roadmap.setting.model.steadystate.label' }),
          },
          {
            value: 'TransientKinetic',
            label: formatMessage({ id: 'widget.roadmap.setting.model.transientKinetic.label' }),
          },
          {
            value: 'TransientStatic',
            label: formatMessage({ id: 'widget.roadmap.setting.model.transientStatic.label' }),
          },
        ]}
        isSmallVersion={isSmallVersion}
      />
    </div>
  );
};

export default ModelToggleButton;
