import { gridItemContainerStyle, titleStyle } from '../../OperationInfo.style';
import Table from '../Table';
import { containerStyle, sixLabelBold } from './GeneralInformation.style';

const MOCK_DATA = [
  { uid: '1', title: 'Rig Name', value: 'Rig Alpha' },
  { uid: '2', title: 'Well Name', value: 'Well-01' },
  { uid: '3', title: 'Section (in)', value: '12¼"' },
  { uid: '4', title: 'Drilling Method', value: 'MPD' },
  { uid: '5', title: 'Max Flow Rate (l/min)', value: '3200' },
  { uid: '6', title: 'Max Hook Velocity (m/s)', value: '1.50' },
  { uid: '7', title: 'Max SPP (bar)', value: '350' },
];

const GeneralInformation = (): JSX.Element => (
  <div
    data-testid="at_operationInfo_generalInformation"
    css={[gridItemContainerStyle, containerStyle]}
  >
    <div css={titleStyle}>GENERAL INFORMATION</div>
    <Table
      isLoading={false}
      isAlternated={true}
      isTransposed={true}
      tableBodyStyle={sixLabelBold}
      columns={[
        { name: 'title', label: 'title', className: undefined },
        { name: 'value', label: 'value', className: undefined },
      ]}
      data={MOCK_DATA}
    />
  </div>
);

export default GeneralInformation;
