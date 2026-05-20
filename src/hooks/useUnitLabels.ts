import { useIntl } from 'react-intl';
import { getUnitLabelIdByUnitType, UnitTypeEnums } from '../helpers/units/unitsHelper';

const useUnitLabels = () => {
  const { formatMessage } = useIntl();
  const getLabel = (label: string, key: UnitTypeEnums): string => {
    return formatMessage(
      {
        id: label,
      },
      { unit: formatMessage({ id: getUnitLabelIdByUnitType(key) }) },
    );
  };
  return {
    getLabel,
  };
};

export default useUnitLabels;
