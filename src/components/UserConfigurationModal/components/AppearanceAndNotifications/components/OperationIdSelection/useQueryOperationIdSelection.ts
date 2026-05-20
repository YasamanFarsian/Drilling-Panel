import { useQuery } from 'react-query';
import { getOperation } from '@dt-advisory/api/operation/operation.query';
import { operationKeys } from '@dt-advisory/api/queryKeysFactories/operationKeys';
import { Option } from '@dt-advisory/components/DropDown';

const useQueryoperationIdSelection = () => {
  const { data, isLoading } = useQuery(operationKeys.all, () => getOperation({}));

  const options: Option<string>[] = (data?.operations ?? []).map((x) => ({
    value: x.id,
    label: x.name,
  }));
  return { options, isLoading };
};

export default useQueryoperationIdSelection;
