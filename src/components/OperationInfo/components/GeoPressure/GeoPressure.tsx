import { useState } from 'react';
import { gridItemContainerStyle, titleStyle } from '../../OperationInfo.style';
import Table from '../Table';
import GeoPressureToggler, { GeoPressureToggleValue } from './components/GeoPressureToggler';
import {
  containerStyle,
  geoPressureTogglerContainerStyle,
  tableStyle,
  wrapperStyle,
} from './GeoPressure.style';
import { GeoPressureWidget } from './GeoPressureWidget';

const COLUMNS = [
  { name: 'md', label: 'MD (m)', className: '' },
  { name: 'val', label: 'FIT (sg)', className: '' },
];

const FIT_DATA = [
  { uid: '1', md: '450.0', val: '1.52' },
  { uid: '2', md: '1200.0', val: '1.68' },
  { uid: '3', md: '2800.0', val: '1.85' },
];

const MOCK_GEO_DATA = {
  fitData: FIT_DATA,
  mudWeightData: [],
};

const GeoPressure = (): JSX.Element => {
  const [mode, setMode] = useState(GeoPressureToggleValue.MD);
  const handleToggle = () =>
    setMode((m) =>
      m === GeoPressureToggleValue.MD ? GeoPressureToggleValue.TVD : GeoPressureToggleValue.MD,
    );

  return (
    <div data-testid="at_operationInfo_geoPressure" css={[gridItemContainerStyle, containerStyle]}>
      <div css={wrapperStyle}>
        <div css={geoPressureTogglerContainerStyle}>
          <div css={titleStyle}>GEO-PRESSURE</div>
          <GeoPressureToggler value={mode} onToggle={handleToggle} />
        </div>
        <div />
        <GeoPressureWidget mode={mode} data={MOCK_GEO_DATA} />
        <div css={tableStyle}>
          <Table isLoading={false} isAlternated={false} columns={COLUMNS} data={FIT_DATA} />
        </div>
      </div>
    </div>
  );
};

export default GeoPressure;
