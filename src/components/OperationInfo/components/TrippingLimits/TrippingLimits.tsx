import { gridItemContainerStyle, subTitleStyle, titleStyle } from '../../OperationInfo.style';
import { getSection } from '../Table/helpers/tableHelper';
import { containerStyle, wrapperStyle } from './TrippingLimits.style';

const COLUMNS = [
  { name: 'fromDepth', label: 'From Depth (m)', className: '' },
  { name: 'toDepth', label: 'To Depth (m)', className: '' },
  { name: 'maxVelUpwards', label: 'Max Vel. Up (m/s)', className: '' },
  { name: 'maxVelDownwards', label: 'Max Vel. Down (m/s)', className: '' },
];

const WITH_CIRC = [
  { uid: '1', fromDepth: '0', toDepth: '1200', maxVelUpwards: '0.50', maxVelDownwards: '0.40' },
  { uid: '2', fromDepth: '1200', toDepth: '2800', maxVelUpwards: '0.35', maxVelDownwards: '0.30' },
  { uid: '3', fromDepth: '2800', toDepth: '3850', maxVelUpwards: '0.25', maxVelDownwards: '0.20' },
];

const WITHOUT_CIRC = [
  { uid: '1', fromDepth: '0', toDepth: '1200', maxVelUpwards: '0.40', maxVelDownwards: '0.35' },
  { uid: '2', fromDepth: '1200', toDepth: '2800', maxVelUpwards: '0.28', maxVelDownwards: '0.25' },
  { uid: '3', fromDepth: '2800', toDepth: '3850', maxVelUpwards: '0.20', maxVelDownwards: '0.18' },
];

const TrippingLimits = (): JSX.Element => (
  <div data-testid="at_operationInfo_trippingLimits" css={[gridItemContainerStyle, containerStyle]}>
    <div css={titleStyle}>STATIC TRIPPING LIMITS</div>
    <div css={wrapperStyle}>
      {getSection({
        subTitleStyle,
        titleKey: 'operationInfo.trippingLimits.withCirculation.title',
        isLoading: false,
        isAlternated: false,
        columns: COLUMNS,
        data: WITH_CIRC,
      })}
      {getSection({
        subTitleStyle,
        titleKey: 'operationInfo.trippingLimits.withoutCirculation.title',
        isLoading: false,
        isAlternated: false,
        columns: COLUMNS,
        data: WITHOUT_CIRC,
      })}
    </div>
  </div>
);

export default TrippingLimits;
