/* eslint-disable max-lines-per-function */
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import React from 'react';
import useDimensions from 'react-cool-dimensions';
import { FormattedMessage } from 'react-intl';
import { useSyncStateStore } from '@dt-advisory/store/SyncStateStore';
import StyledScrollbar from '../StyledScrollbar/StyledScrollbar';
import CasingArchitecture from './components/CasingArchitecture';
import Drillstring from './components/DrillString';
import GeneralInformation from './components/GeneralInformation';
import GeoPressure from './components/GeoPressure';
import MudReport from './components/MudReport';
import Trajectory from './components/Trajectory';
import TrippingLimits from './components/TrippingLimits';
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
import { useFetchOperationInfo } from './useFetchOperationInfo';

const INTERVAL_MS = 10000;
export type OperationInfoProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};

export function OperationInfo({ visible, setVisible }: OperationInfoProps) {
  const isAtLeastOneWidgetConnected = useSyncStateStore((x) => x.isAtLeastOneWidgetConnected);
  const { data, isLoading } = useFetchOperationInfo({
    enabled: visible && isAtLeastOneWidgetConnected,
    intervalMS: INTERVAL_MS,
  });

  const containerDimension = useDimensions();
  const headerDimension = useDimensions();

  const handleClose = () => setVisible(false);

  return (
    <Modal
      data-testid="operation-info-modal"
      open={visible}
      onClose={handleClose}
      aria-labelledby="operation-info-modal-title"
      aria-describedby="operation-info-modal-description"
    >
      <div ref={containerDimension.observe} css={paperStyle}>
        <div ref={headerDimension.observe} css={headerWrapperStyle}>
          <div css={iconContainerStyle}>
            <CloseIcon onClick={handleClose} />
          </div>
          <div css={titleContainerStyle}>
            <FormattedMessage id={'operationInfo.mainTitle'} />
          </div>
        </div>
        <StyledScrollbar css={containerStyle(containerDimension.height - headerDimension.height)}>
          <div css={bodyContainerStyle}>
            {/*
             ** general information
             ** last mud report
             */}
            <div css={container1c1rStyle}>
              <div css={container2c1rStyle}>
                <div>
                  <GeneralInformation data={data?.general} isLoading={isLoading} />
                </div>
                <div>
                  <MudReport data={data?.mudReport} isLoading={isLoading} />
                </div>
              </div>
              {/*
               ** casing architecture
               ** trajectory
               ** drillstring
               */}
              <div css={container1c2r2c1rStyle}>
                <div className="Col1">
                  <div className="r1">
                    <CasingArchitecture data={data?.casingArchitecture} isLoading={isLoading} />
                  </div>
                  <div className="r2">
                    <Trajectory data={data?.trajectory} isLoading={isLoading} />
                  </div>
                </div>
                <div className="Col2">
                  <Drillstring data={data?.drillString} isLoading={isLoading} />
                </div>
              </div>
              {/*
               ** geo pressure
               */}
              <div css={container1c1rStyle}>
                <GeoPressure data={data?.geoPressure} isLoading={isLoading} />
              </div>
              {/*
               ** tripping limits
               */}
              <div css={container1c1rStyle}>
                <TrippingLimits data={data?.trippingLimits} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </StyledScrollbar>
      </div>
    </Modal>
  );
}
