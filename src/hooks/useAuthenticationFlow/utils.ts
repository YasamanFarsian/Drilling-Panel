import { AuthInfoResponseType } from './authenticationInfo.query';

type IsURLQueryCustomerType = {
  queryIsCustomer: string | null;
  store?: AuthInfoResponseType;
};

export const isURLQueryNotCustomer = ({ queryIsCustomer }: IsURLQueryCustomerType): boolean => {
  return 'false' === queryIsCustomer;
};

export const isURLQueryCustomer = ({ queryIsCustomer }: IsURLQueryCustomerType): boolean => {
  return 'true' === queryIsCustomer;
};

export const isValidAuthInfo = (store?: AuthInfoResponseType): boolean => {
  if ('boolean' === typeof store?.isCustomer) {
    return true;
  }
  return false;
};
