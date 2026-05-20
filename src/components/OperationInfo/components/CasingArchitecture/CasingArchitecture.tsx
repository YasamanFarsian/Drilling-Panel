import { gridItemContainerStyle, titleStyle } from '../../OperationInfo.style';
import Table from '../Table';
import { containerStyle, tableStyle } from './CasingArchitecture.style';

const COLUMNS = [
  { name: 'fromDepth', label: 'From Depth (m)', className: '' },
  { name: 'toDepth', label: 'To Depth (m)', className: '' },
  { name: 'od', label: 'OD (in)', className: '' },
  { name: 'id', label: 'ID (in)', className: '' },
];

const DATA = [
  { uid: '1', fromDepth: '0', toDepth: '450', od: '20.00', id: '19.12' },
  { uid: '2', fromDepth: '450', toDepth: '1200', od: '13.38', id: '12.42' },
  { uid: '3', fromDepth: '1200', toDepth: '2800', od: '9.63', id: '8.68' },
];

const CasingArchitecture = (): JSX.Element => (
  <div
    data-testid="at_operationInfo_casingArchitecture"
    css={[gridItemContainerStyle, containerStyle]}
  >
    <div css={titleStyle}>CASING ARCHITECTURE</div>
    <Table
      isLoading={false}
      isAlternated={false}
      tableBodyStyle={tableStyle}
      columns={COLUMNS}
      data={DATA}
    />
  </div>
);

export default CasingArchitecture;
