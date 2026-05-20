/* eslint-disable max-lines-per-function, complexity */
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import FullPageLoading from '@dt-advisory/components/FullPageLoading';
import MsalConfigErrorScreen from '@dt-advisory/components/MsalConfigErrorScreen';
import { useAuthenticationFlow } from '@dt-advisory/hooks/useAuthenticationFlow';
import { useConfigs } from '@dt-advisory/providers/Configs';
import { useEmbedder } from '@dt-advisory/providers/Embedder';
import MsalAuthentication from '@dt-advisory/services/MsalAuthentication';
import React, { useEffect, useState } from 'react';

enum MsalConfigStatus {
  Initializing = 'Initializing',
  Idle = 'Idle',
  Error = 'Error',
}

type SetupMsalConfigReturnType = {
  status: MsalConfigStatus;
  enableAuthentication: boolean;
  msalInstance?: PublicClientApplication;
};
export const useSetupMsalConfig = (isInIframe: boolean): SetupMsalConfigReturnType => {
  const [status, setStatus] = useState(MsalConfigStatus.Initializing);
  const [msalInstance, setMsalInstance] = useState<PublicClientApplication>();
  const configs = useConfigs();
  const { getIsCustomer } = useAuthenticationFlow();
  const enableAuthentication = configs.enableAuthentication;

  useEffect(() => {
    if (!enableAuthentication) {
      setStatus(MsalConfigStatus.Idle);
      return;
    }
    const setupMsal = async () => {
      try {
        const authInfo = await getIsCustomer(configs.baseApiUrl);
        const currentMsalConfig = authInfo.isCustomer ? configs.msal.customer : configs.msal.sekal;
        const { redirectUri, clientId, authority, knownAuthorities, scopes } = currentMsalConfig;

        const msalConfigs = {
          auth: {
            redirectUri,
            clientId,
            authority,
            knownAuthorities: knownAuthorities?.split('|'),
          },
        };
        const msalScopes = scopes.split('|');
        MsalAuthentication.setup(msalConfigs, msalScopes, isInIframe);
        setMsalInstance(MsalAuthentication.getInstance());
        setStatus(MsalConfigStatus.Idle);
      } catch (err) {
        setStatus(MsalConfigStatus.Error);
        console.error(err);
      }
    };
    setupMsal();

    // eslint-disable-next-line
  }, [enableAuthentication, isInIframe]);

  return {
    status,
    enableAuthentication,
    msalInstance,
  };
};

type MsalConfigurationProviderPropsType = {
  children: JSX.Element;
};

const MsalConfigurationProvider = ({
  children,
}: MsalConfigurationProviderPropsType): JSX.Element => {
  const { isInIframe } = useEmbedder();
  const {
    status: msalConfigStatus,
    enableAuthentication,
    msalInstance,
  } = useSetupMsalConfig(isInIframe);

  if (msalConfigStatus === MsalConfigStatus.Initializing) {
    return <FullPageLoading />;
  }

  if (msalConfigStatus === MsalConfigStatus.Error) {
    return <MsalConfigErrorScreen />;
  }

  if (enableAuthentication && msalInstance && msalConfigStatus === MsalConfigStatus.Idle) {
    return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
  }

  return children;
};

export default MsalConfigurationProvider;
