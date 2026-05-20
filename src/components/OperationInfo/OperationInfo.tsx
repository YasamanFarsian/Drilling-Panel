import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import StyledScrollbar from '../StyledScrollbar/StyledScrollbar';
import CasingArchitecture from './components/CasingArchitecture';
import Drillstring from './components/DrillString';
import GeneralInformation from './components/GeneralInformation';
import MudReport from './components/MudReport';
import Trajectory from './components/Trajectory';
import {
  bodyContainerStyle,
  container1c1rStyle,
  container1c2r2c1rStyle,
  container2c1rStyle,
  containerStyle,
  headerWrapperStyle,
  iconContainerStyle,
  paperStyle,
  titleContainerStyle,
} from './OperationInfo.style';

export type OperationInfoProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};

export function OperationInfo({ visible, setVisible }: OperationInfoProps) {
  const handleClose = () => setVisible(false);

  return (
    <Modal
      data-testid="operation-info-modal"
      open={visible}
      onClose={handleClose}
      aria-labelledby="operation-info-modal-title"
    >
      <div css={paperStyle}>
        <div css={headerWrapperStyle}>
          <div css={iconContainerStyle}>
            <CloseIcon onClick={handleClose} />
          </div>
          <div css={titleContainerStyle}>Summary of Configuration</div>
        </div>
        <StyledScrollbar css={containerStyle(600)}>
          <div css={bodyContainerStyle}>
            <div css={container1c1rStyle}>
              <div css={container2c1rStyle}>
                <GeneralInformation />
                <MudReport />
              </div>
              <div css={container1c2r2c1rStyle}>
                <div className="Col1">
                  <div className="r1">
                    <CasingArchitecture />
                  </div>
                  <div className="r2">
                    <Trajectory />
                  </div>
                </div>
                <div className="Col2">
                  <Drillstring />
                </div>
              </div>
            </div>
          </div>
        </StyledScrollbar>
      </div>
    </Modal>
  );
}
