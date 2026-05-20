import { useSearchParams } from 'react-router-dom';
import { useHostSettingsStore } from '@dt-advisory/store/HostSettingsStore';

export type QueryParamsOutputType = {
  isEmbedded: boolean;
  accessToken: string | null;
};

export const useQueryParams = () => {
  const updateHostAccessToken = useHostSettingsStore((x) => x.updateHostAccessToken);
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('accessToken');
  updateHostAccessToken(accessToken);
  return {
    accessToken,
  };
};
