/* eslint-disable max-lines-per-function */
import { Typography } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import ToggleButtonGroup from '@dt-advisory/components/ToggleButtonGroup';
import { RoadmapStateType } from '@dt-advisory/store/Settings';
import { headerLabelStyle } from '../../RoadmapSetting.style';
import { toggleContainerStyle } from './StateToggleButton.style';

type StateToggleButtonPropsType = {
  state: RoadmapStateType;
  handleStateChange: (value: RoadmapStateType) => void;
  isSmallVersion?: boolean;
};

const StateToggleButton = ({
  handleStateChange,
  state,
  isSmallVersion,
}: StateToggleButtonPropsType): JSX.Element => {
  const { formatMessage } = useIntl();

  return (
    <div data-testid="state_toggle_button_1688535287388" css={toggleContainerStyle}>
      <Typography css={headerLabelStyle}>
        {formatMessage({ id: 'widget.roadmap.setting.state.title' })}
      </Typography>
      <ToggleButtonGroup
        data-testid="states_toggle_button_1688541767658"
        onChange={(_, value) => handleStateChange(value)}
        value={state}
        options={[
          {
            value: 'Automatic',
            label: formatMessage({ id: 'widget.roadmap.setting.state.automatic.label' }),
          },
          {
            value: 'Drilling',
            label: formatMessage({ id: 'widget.roadmap.setting.state.drilling.label' }),
          },
          {
            value: 'Tripping',
            label: formatMessage({ id: 'widget.roadmap.setting.state.tripping.label' }),
          },
        ]}
        isSmallVersion={isSmallVersion}
      />
    </div>
  );
};

export default StateToggleButton;
