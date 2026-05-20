import { useParams } from 'react-router-dom';
import { useSettingsStore } from '@dt-advisory/store/Settings';

export const useOperationParam = () => {
  const updateSettings = useSettingsStore((x) => x.updateSettings);
  const { id } = useParams<{ id: string }>();
  if (id) {
    updateSettings('operationId', id);
  }
};
