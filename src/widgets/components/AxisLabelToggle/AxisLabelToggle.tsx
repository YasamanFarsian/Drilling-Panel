import React from 'react';
import { useAxisLabelToggleStore } from '@dt-advisory/store/AxisLabelToggle';
import { VisibilityOffOutlined, VisibilityOutlined, IconButton } from '@dt-advisory/shared/ui/Icon';
import { createIconSizes } from '../../shared/headerIconSizes';

export type AxisLabelTogglePropsType = {
  type: string;
};

const AxisLabelToggle = ({ type }: AxisLabelTogglePropsType): JSX.Element => {
  const { hideAxisLabel, toggle } = useAxisLabelToggleStore();
  function handleToggle() {
    toggle(type);
  }

  return (
    <IconButton>
      {hideAxisLabel[type] ? (
        <VisibilityOutlined
          className={createIconSizes().className}
          style={createIconSizes().style}
          data-testid="axis_label_toggle--button"
          onClick={handleToggle}
        />
      ) : (
        <VisibilityOffOutlined
          className={createIconSizes().className}
          style={createIconSizes().style}
          data-testid="axis_label_toggle--button"
          onClick={handleToggle}
        />
      )}
    </IconButton>
  );
};

export default AxisLabelToggle;
