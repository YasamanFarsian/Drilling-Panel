import { SmartRopDataKeyType } from '../../SmartAutoRopTypes';
import { SmartAutoRopInfoItemStateType } from './components/SmartAutoRopInfoItem';

export type GetDataStatePropsType = {
  dataKey: SmartRopDataKeyType;
  activeDataKeys: SmartRopDataKeyType[];
};

export const getDataState = ({
  dataKey,
  activeDataKeys,
}: GetDataStatePropsType): SmartAutoRopInfoItemStateType => {
  if (activeDataKeys.includes(dataKey)) {
    return 'active';
  }

  return 'idle';
};
