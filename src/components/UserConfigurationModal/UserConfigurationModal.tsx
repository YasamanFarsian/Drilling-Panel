import { operationHeaderKeys } from '@dt-advisory/api/queryKeysFactories/operationHeaderKeys';
import ErrorBoundaryProvider from '@dt-advisory/providers/ErrorBoundary';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { useIntl } from 'react-intl';
import { useQueryClient } from 'react-query';

import { useSettingsStore } from '@dt-advisory/store/Settings';
import { useSyncStateStore } from '@dt-advisory/store/SyncStateStore';
import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import UserSettings from './components/UserSettings';
import {
  headerStyle,
  iconContainerStyle,
  modalStyle,
  titleStyle,
} from './UserConfigurationModal.style';

export type UserConfigurationModalPropsType = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};

// eslint-disable-next-line max-lines-per-function
const UserConfigurationModal = ({
  visible,
  setVisible,
}: UserConfigurationModalPropsType): JSX.Element => {
  const operationId = useSettingsStore((x) => x.settings.operationId);
  const saveUserConfiguration = useUserConfigurationStore((x) => x.saveUserConfiguration);

  const resetWidgetSyncStates = useSyncStateStore((x) => x.resetWidgetSyncStates);
  const queryClient = useQueryClient();
  const { formatMessage } = useIntl();

  const handleClose = () => {
    setVisible(false);
    // refetch header config values
    void queryClient.invalidateQueries(operationHeaderKeys.getOperationHeader(operationId));
    // reset no connection

    // reset widgetSyncStates
    resetWidgetSyncStates();
    // save to user store
    saveUserConfiguration();
  };
  return (
    <Modal data-testid="user-configuration-modal" open={visible} onClose={handleClose}>
      <div css={modalStyle}>
        <div css={headerStyle}>
          <div css={titleStyle}>
            {formatMessage({ id: 'userConfiguration.settings.title', defaultMessage: 'Settings' })}
          </div>
          <div css={iconContainerStyle}>
            <CloseIcon onClick={handleClose} />
          </div>
        </div>
        <ErrorBoundaryProvider forComponent>
          <UserSettings />
        </ErrorBoundaryProvider>
      </div>
    </Modal>
  );
};

export default UserConfigurationModal;
