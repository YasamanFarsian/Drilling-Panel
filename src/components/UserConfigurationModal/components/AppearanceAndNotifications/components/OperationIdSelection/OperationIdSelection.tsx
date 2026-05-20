/* eslint-disable max-lines-per-function */
import { Box } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import { useIntl } from 'react-intl';
import DropDown from '@dt-advisory/components/DropDown';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import Title from '../Title';
import useQueryoperationIdSelection from './useQueryOperationIdSelection';

const OperationIdSelection = (): JSX.Element => {
  const { formatMessage } = useIntl();
  const { isLoading, options } = useQueryoperationIdSelection();
  const currentOpid = useSettingsStore((x) => x.settings.operationId);
  const updateSettings = useSettingsStore((x) => x.updateSettings);
  const handleChange = (opid: string) => {
    updateSettings('operationId', opid);
  };
  return (
    <Box
      data-testid="operation_id_selection_1676545036542"
      className="at_main_settings_operation"
      maxWidth={272}
    >
      <Title
        value={formatMessage({
          id: 'settings.general.operations.label',
          defaultMessage: 'Operation/Wellbore',
        })}
      />
      <DropDown
        name={'operation_id_selection'}
        viewportUnit
        options={options}
        value={currentOpid || ''}
        isLoading={isLoading}
        onChange={(event: SelectChangeEvent<string>) => handleChange(event.target.value)}
      />
    </Box>
  );
};

export default OperationIdSelection;
