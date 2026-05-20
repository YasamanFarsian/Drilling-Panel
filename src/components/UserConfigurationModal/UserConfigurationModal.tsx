import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
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

const UserConfigurationModal = ({
  visible,
  setVisible,
}: UserConfigurationModalPropsType): JSX.Element => {
  const handleClose = () => setVisible(false);

  return (
    <Modal data-testid="user-configuration-modal" open={visible} onClose={handleClose}>
      <div css={modalStyle}>
        <div css={headerStyle}>
          <div css={titleStyle}>Settings</div>
          <div css={iconContainerStyle}>
            <CloseIcon onClick={handleClose} />
          </div>
        </div>
        <UserSettings />
      </div>
    </Modal>
  );
};

export default UserConfigurationModal;
