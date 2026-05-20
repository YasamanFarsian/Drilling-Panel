/* eslint-disable complexity, max-params */
import {
  AuthenticationResult,
  AuthError,
  Configuration,
  EventType,
  InteractionRequiredAuthError,
  PublicClientApplication,
} from '@azure/msal-browser';

class MsalAuthentication {
  private static _instance?: PublicClientApplication;
  private static _configuration?: Configuration;
  private static _scopes: string[];
  private static _expirationDate: Date | null;
  private static _isInIframe: boolean;

  static getInstance() {
    if (!this._configuration || !this._scopes) {
      throw new Error('Instance is not setup properly with configurations and scopes');
    }

    if (!this._instance) {
      this._instance = new PublicClientApplication(this._configuration);
      const accounts = this._instance.getAllAccounts();
      if (accounts.length > 0) {
        this._instance.setActiveAccount(accounts[0]);
      }

      this._instance.addEventCallback((event) => {
        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
          const payload = event.payload as AuthenticationResult;
          this._instance?.setActiveAccount(payload.account);
        }
        if (event.error instanceof AuthError && event.error.errorCode === 'popup_window_error') {
          console.error(event.error.errorMessage);
        }
      });
    }

    return this._instance;
  }

  static setup(config: Configuration, scopes: string[], isInIframe = false) {
    delete this._instance;
    this._configuration = config;
    this._scopes = scopes;
    this._isInIframe = isInIframe;
  }

  static async logout() {
    const instance = this.getInstance();

    const activeAccount = instance.getActiveAccount();
    const accounts = instance.getAllAccounts();

    const request = {
      account: activeAccount ?? accounts[0],
      postLogoutRedirectUri: `${this._configuration?.auth.redirectUri}?postLogout=true`,
      authority: this._configuration?.auth.authority,
    };

    if (this._isInIframe) {
      await instance.logoutPopup(request);
    } else {
      await instance.logoutRedirect(request);
    }

    delete this._instance;
  }

  static async getToken() {
    const instance = this.getInstance();

    const activeAccount = instance.getActiveAccount();
    const accounts = instance.getAllAccounts();
    const request = {
      account: activeAccount ?? accounts[0],
      scopes: this._scopes,
    };

    try {
      const authResult = await instance.acquireTokenSilent(request);
      instance.setActiveAccount(authResult.account);
      this._expirationDate = authResult.expiresOn;
      return authResult.accessToken;
    } catch (e) {
      if (e instanceof InteractionRequiredAuthError) {
        console.error(e.errorCode);
        return;
      }

      throw new Error(`Error: unmatched error \n${JSON.stringify(e)}`);
    }
  }

  static isExpired() {
    const expiresOn = this.expiresOn;
    const now = new Date();
    if (expiresOn) {
      return now > expiresOn;
    }
    return false;
  }

  static get scopes() {
    return this._scopes;
  }

  static get expiresOn() {
    return this._expirationDate;
  }
}

export default MsalAuthentication;
