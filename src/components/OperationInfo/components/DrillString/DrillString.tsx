import { Box } from '@mui/material';
import { gridItemContainerStyle, titleStyle } from '../../OperationInfo.style';
import { getSection } from '../Table/helpers/tableHelper';
import { containerStyle, legendStyle } from './DrillString.style';

const COLUMNS = [
  { name: 'element', label: 'Element', className: '' },
  { name: 'od', label: 'Max OD / Body (in)', className: '' },
  { name: 'id', label: 'ID (in)', className: '' },
  { name: 'length', label: 'Length (m)', className: '' },
  { name: 'linWeight', label: 'Lin. Weight (kg/m)', className: '' },
];

const DATA = [
  { uid: '1', element: 'Bit', od: '8.50', id: '-', length: '0.3', linWeight: '-' },
  { uid: '2', element: 'Motor', od: '8.00', id: '2.75', length: '8.5', linWeight: '125.0' },
  { uid: '3', element: 'MWD', od: '6.75', id: '2.81', length: '9.2', linWeight: '98.0' },
  {
    uid: '4',
    element: 'Drill Collar',
    od: '6.50',
    id: '2.81',
    length: '180.0',
    linWeight: '158.0',
  },
  { uid: '5', element: 'HWDP', od: '5.00', id: '3.00', length: '150.0', linWeight: '62.0' },
  { uid: '6', element: 'Drill Pipe', od: '5.00', id: '4.28', length: '3500.0', linWeight: '19.5' },
];

const DrillString = (): JSX.Element => (
  <div data-testid="at_operationInfo_drillstring" css={[gridItemContainerStyle, containerStyle]}>
    {getSection({
      subTitleStyle: titleStyle,
      titleKey: 'operationInfo.drillstring.title',
      isLoading: false,
      isAlternated: false,
      columns: COLUMNS,
      data: DATA,
    })}
    <Box css={legendStyle}>
      <div>
        <span>Displacement Type: </span>Open Ended
      </div>
      <div>
        <span>Bit TFA (cm²): </span>3.14
      </div>
    </Box>
  </div>
);

export default DrillString;
