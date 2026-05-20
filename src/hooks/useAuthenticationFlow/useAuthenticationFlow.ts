import { isURLQueryCustomer, isURLQueryNotCustomer, isValidAuthInfo } from './utils';
import fetchAuthenticationInfo, { AuthInfoResponseType } from './authenticationInfo.query';
import useLocalStorage from './useLocalStorage';
import useURLQuery from './useURLQuery';

type UseAuthenticationFlowReturnType = {
  getIsCustomer: (baseAPIUrl: string) => Promise<AuthInfoResponseType>;
  logout: () => void;
};

/* eslint-disable max-lines-per-function */
const useAthenticationFlow = (key?: string): UseAuthenticationFlowReturnType => {
  const KEY = key ?? 'isCustomer';
  const URLquery = useURLQuery();
  const URLqueryIsCustomer = URLquery.get(KEY);
  const [localStorageIsCustomer, setLocalStorageIsCustomer] = useLocalStorage(
    'authInfo',
    undefined,
  );

  const logout = () => {
    setLocalStorageIsCustomer(undefined);
  };

  const getAuthInfo = async (
    baseAPIUrl: string,
    queryIsCustomer: string | null,
  ): Promise<AuthInfoResponseType> => {
    const currentDefaultIsCustomerValue = queryIsCustomer === 'true';
    const defaultValue = { isCustomer: currentDefaultIsCustomerValue, redirectUrl: '' };
    let authInfo: AuthInfoResponseType = defaultValue;
    try {
      const resp = await fetchAuthenticationInfo(baseAPIUrl);
      if (resp) {
        authInfo = resp;
      }
    } catch (e) {
      console.error(e);
    }
    setLocalStorageIsCustomer(authInfo);
    return authInfo;
  };

  const getIsCustomer = async (baseAPIUrl: string): Promise<AuthInfoResponseType> => {
    if ('string' === typeof URLqueryIsCustomer) {
      if (
        isURLQueryCustomer({
          queryIsCustomer: URLqueryIsCustomer,
        })
      ) {
        // Overwrite to isCustomer = true
        const newStorage = {
          ...localStorageIsCustomer,
          isCustomer: true,
        };
        setLocalStorageIsCustomer(newStorage);
        return newStorage;
      } else if (
        isURLQueryNotCustomer({
          queryIsCustomer: URLqueryIsCustomer,
        })
      ) {
        // Overwrite to isCustomer = false
        const newStorage = {
          ...localStorageIsCustomer,
          isCustomer: false,
        };
        setLocalStorageIsCustomer(newStorage);
        return newStorage;
      }
    }
    if (isValidAuthInfo(localStorageIsCustomer)) {
      return localStorageIsCustomer;
    } else {
      const resp = await getAuthInfo(baseAPIUrl, URLqueryIsCustomer);
      return resp;
    }
  };

  return {
    getIsCustomer,
    logout,
  };
};

export default useAthenticationFlow;
