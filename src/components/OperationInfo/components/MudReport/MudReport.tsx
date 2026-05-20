import { gridItemContainerStyle, titleStyle } from '../../OperationInfo.style';
import Table from '../Table';
import { containerStyle, sevenLabelBold, tableContainerStyle } from './MudReport.style';

const COLUMNS = [
  { name: 'title', label: 'title', className: '' },
  { name: 'value', label: 'value', className: '' },
];

const FIRST_DATA = [
  { uid: '1', title: 'Mud Sample Density (sg)', value: '1.42' },
  { uid: '2', title: 'Mud Sample Temp (°C)', value: '28.0' },
  { uid: '3', title: 'Fluid Type', value: 'OBM' },
  { uid: '4', title: 'Oil/Water Ratio', value: '80/20' },
  { uid: '5', title: 'Rheology Temp (°C)', value: '50' },
  { uid: '6', title: 'Rheology Pressure (bar)', value: '1' },
  { uid: '7', title: 'Gel Strength', value: '' },
  { uid: '8', title: '10 s (Pa)', value: '4.2' },
  { uid: '9', title: '10 min (Pa)', value: '8.5' },
];

const SECOND_DATA = [
  { uid: '1', title: 'Stress (lb/100ft²)', value: '' },
  { uid: '2', title: '3 rpm', value: '3.1' },
  { uid: '3', title: '6 rpm', value: '4.8' },
  { uid: '4', title: '30 rpm', value: '14.0' },
  { uid: '5', title: '60 rpm', value: '22.5' },
  { uid: '6', title: '100 rpm', value: '34.0' },
  { uid: '7', title: '200 rpm', value: '58.0' },
  { uid: '8', title: '300 rpm', value: '81.0' },
  { uid: '9', title: '600 rpm', value: '148.0' },
];

const MudReport = (): JSX.Element => (
  <div data-testid="at_operationInfo_mudReport" css={[gridItemContainerStyle, containerStyle]}>
    <div css={titleStyle}>LAST MUD REPORT</div>
    <div css={tableContainerStyle}>
      <Table
        isLoading={false}
        isAlternated
        isTransposed
        tableBodyStyle={sevenLabelBold}
        columns={COLUMNS}
        data={FIRST_DATA}
      />
      <Table isLoading={false} isAlternated isTransposed columns={COLUMNS} data={SECOND_DATA} />
    </div>
  </div>
);

export default MudReport;
