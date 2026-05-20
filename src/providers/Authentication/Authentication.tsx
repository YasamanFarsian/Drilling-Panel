import { useIsAuthenticated } from '@azure/msal-react';
import React, { useMemo } from 'react';
import { useConfigs } from '@dt-advisory/providers/Configs';
import MsalAuthentication from '@dt-advisory/services/MsalAuthentication';

type AuthenticationType = {
  enableAuthentication: boolean;
  signOut: () => void;
  isAuthenticated: boolean;
}; // provider value shape

const AuthenticationContext = React.createContext<AuthenticationType | undefined>({
  enableAuthentication: false,
  signOut: () => void 0,
  isAuthenticated: false,
});

export const useAuthentication = (): AuthenticationType => {
  const context = React.useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error('useAuthentication can not be used outside AuthenticationProvider');
  }
  return context;
};

type AuthenticationProviderPropsType = {
  children: React.ReactNode;
};

const AuthenticationProvider = ({ children }: AuthenticationProviderPropsType): JSX.Element => {
  const configs = useConfigs();
  const isAuthenticated = useIsAuthenticated();

  const enableAuthentication = configs.enableAuthentication;
  const value = useMemo(
    () => ({
      enableAuthentication,
      signOut: () => MsalAuthentication.logout(),
      isAuthenticated,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [enableAuthentication, isAuthenticated],
  );

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
};

export default AuthenticationProvider;
