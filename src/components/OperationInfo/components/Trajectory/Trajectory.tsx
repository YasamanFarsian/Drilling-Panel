import { gridItemContainerStyle, subTitleStyle, titleStyle } from '../../OperationInfo.style';
import { getSection } from '../Table/helpers/tableHelper';
import { containerStyle, wrapperStyle } from './Trajectory.style';

const COLUMNS_PLANNED = [
  { name: 'plannedMD', label: 'MD (m)', className: '' },
  { name: 'plannedIncl', label: 'Incl (°)', className: '' },
  { name: 'plannedAz', label: 'Az (°)', className: '' },
  { name: 'plannedTVD', label: 'TVD (m)', className: '' },
];

const COLUMNS_ACTUAL = [
  { name: 'actualMD', label: 'MD (m)', className: '' },
  { name: 'actualIncl', label: 'Incl (°)', className: '' },
  { name: 'actualAz', label: 'Az (°)', className: '' },
  { name: 'actualTVD', label: 'TVD (m)', className: '' },
];

const PLANNED_DATA = [
  { uid: '1', plannedMD: '4200.0', plannedIncl: '32.5', plannedAz: '214.0', plannedTVD: '3560.0' },
];
const ACTUAL_DATA = [
  { uid: '1', actualMD: '3850.0', actualIncl: '30.1', actualAz: '212.5', actualTVD: '3280.0' },
];

const Trajectory = (): JSX.Element => (
  <div data-testid="at_operationInfo_trajectory" css={[gridItemContainerStyle, containerStyle]}>
    <div css={titleStyle}>TRAJECTORY</div>
    <div css={wrapperStyle}>
      {getSection({
        subTitleStyle,
        titleKey: 'operationInfo.trajectory.plannedTDSurvey.title',
        isLoading: false,
        isAlternated: false,
        columns: COLUMNS_PLANNED,
        data: PLANNED_DATA,
      })}
      {getSection({
        subTitleStyle,
        titleKey: 'operationInfo.trajectory.lastActualSurvey.title',
        isLoading: false,
        isAlternated: false,
        columns: COLUMNS_ACTUAL,
        data: ACTUAL_DATA,
      })}
    </div>
  </div>
);

export default Trajectory;
