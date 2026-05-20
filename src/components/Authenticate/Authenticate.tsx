import { InteractionType } from '@azure/msal-browser';
import { MsalAuthenticationResult, MsalAuthenticationTemplate } from '@azure/msal-react';
import ErrorFallback from '@dt-advisory/components/ErrorFallback';
import FullPageLoading from '@dt-advisory/components/FullPageLoading';
import MainLayout from '@dt-advisory/components/MainLayout';
import { useOperationParam } from '@dt-advisory/hooks/useOperationParam';
import { useAuthentication } from '@dt-advisory/providers/Authentication';
import { useEmbedder } from '@dt-advisory/providers/Embedder';
import MsalAuthentication from '@dt-advisory/services/MsalAuthentication';
import { useIntl } from 'react-intl';

const LoadingComponent = (): JSX.Element => {
  const { formatMessage } = useIntl();
  return (
    <FullPageLoading status={formatMessage({ id: 'page.sign_in.auth_status.authenticating' })} />
  );
};

const ErrorComponent = (props: MsalAuthenticationResult) => {
  const isPopup = props.error?.errorCode === 'popup_window_error';
  return isPopup ? <ErrorFallback localeKey={'app.login.popup.error'} /> : <ErrorFallback />;
};

//eslint-disable-next-line max-lines-per-function
const Authenticate = (): JSX.Element => {
  useOperationParam();
  const { isInIframe: isEmbedded } = useEmbedder();
  const { enableAuthentication } = useAuthentication();

  if (enableAuthentication) {
    const interactionType = isEmbedded ? InteractionType.Popup : InteractionType.Redirect;
    return (
      <MsalAuthenticationTemplate
        interactionType={interactionType}
        authenticationRequest={{ scopes: MsalAuthentication.scopes }}
        loadingComponent={LoadingComponent}
        errorComponent={ErrorComponent}
      >
        <MainLayout />
      </MsalAuthenticationTemplate>
    );
  } else {
    return <MainLayout />;
  }
};

export default Authenticate;
