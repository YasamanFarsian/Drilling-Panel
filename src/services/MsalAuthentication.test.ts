import {
  AuthenticationResult,
  Configuration,
  EventType,
  PublicClientApplication,
} from '@azure/msal-browser';
import { AccountInfo } from '@azure/msal-common';
import MsalAuthentication from './MsalAuthentication';

jest.mock('@azure/msal-browser', () => {
  const { InteractionRequiredAuthError } = jest.requireActual('@azure/msal-browser');
  const MockedPublicClientApplicationValue = {
    id: new Date(),
    acquireTokenRedirect: jest.fn().mockImplementation(() => Promise.reject()),
    acquireTokenSilent: jest.fn(),
    addEventCallback: jest.fn((callback) => callback),
    getActiveAccount: jest.fn().mockReturnValue({} as AccountInfo),
    logoutRedirect: jest.fn(),
    logoutPopup: jest.fn(),
    getAllAccounts: jest.fn().mockReturnValue([
      {
        username: 'test-username',
      },
    ]),
    setActiveAccount: jest.fn(),
  };
  const mockedAuthResult = { accessToken: 'access-token-silent', expiresOn: new Date() };
  MockedPublicClientApplicationValue.acquireTokenSilent = jest
    .fn()
    .mockImplementationOnce(() => Promise.reject('foo'))
    .mockImplementationOnce(() => Promise.reject(new InteractionRequiredAuthError('foo')))
    .mockImplementation(() => Promise.resolve(mockedAuthResult));
  const MockedPublicClientApplication = jest.fn(() => MockedPublicClientApplicationValue);
  return {
    __esModule: true,
    ...jest.requireActual('@azure/msal-browser'),
    PublicClientApplication: MockedPublicClientApplication,
  };
});

const originalLocation = window.location;

describe('MsalAuthentication', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('should throw if no setup', async () => {
    let error: any;
    try {
      await MsalAuthentication.logout();
    } catch (e) {
      error = e;
    }
    expect(error).toBeDefined();
  });
  it('should throw an error if configuration is not set', () => {
    expect(() => {
      MsalAuthentication.getInstance();
    }).toThrow();
  });

  it('should return a new instance when no instance exists', () => {
    MsalAuthentication.setup({} as Configuration, []);
    const instance = MsalAuthentication.getInstance();
    expect(PublicClientApplication).toHaveBeenCalledTimes(1);
    expect(instance).toHaveProperty('id');
  });

  it('should return an initialised instance when an instance exists', () => {
    MsalAuthentication.setup({} as Configuration, []);
    const instance1 = MsalAuthentication.getInstance();
    const instance2 = MsalAuthentication.getInstance();
    expect(instance2).toBe(instance1);
  });
});

describe('getInstance()', () => {
  beforeEach(() => {
    MsalAuthentication.setup({} as Configuration, []);
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should set active account to be the first account from MSAL instance data if any', () => {
    const instance = MsalAuthentication.getInstance();
    expect(instance.setActiveAccount).toHaveBeenCalledWith(
      expect.objectContaining({
        username: 'test-username',
      }),
    );
  });

  it('should register a callback to set active account after a success login', () => {
    const instance = MsalAuthentication.getInstance();
    expect((instance.addEventCallback as jest.Mock).mock.calls[0].length).toBeGreaterThanOrEqual(1);
    const registeredCallback = (instance.addEventCallback as jest.Mock).mock.calls[0][0];

    (instance.setActiveAccount as jest.Mock).mockClear();
    registeredCallback({
      eventType: EventType.LOGIN_SUCCESS,
      payload: {} as AuthenticationResult,
    });
    expect(instance.setActiveAccount).toHaveBeenCalledTimes(1);
  });

  it.skip('should register a callback to reload page when error occurs', () => {
    const instance = MsalAuthentication.getInstance();
    expect((instance.addEventCallback as jest.Mock).mock.calls[0].length).toBeGreaterThanOrEqual(1);
    const registeredCallback = (instance.addEventCallback as jest.Mock).mock.calls[0][0];

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: jest.fn() },
    });
    registeredCallback({
      error: true,
    });
    expect(window.location.reload).toHaveBeenCalled();

    Object.defineProperty(window, 'location', { configurable: true, value: originalLocation });
  });
});

describe('getToken()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('should throw from acquireTokenSilent', async () => {
    MsalAuthentication.setup({} as Configuration, []);
    let tokenErr: any;
    try {
      await MsalAuthentication.getToken();
    } catch (e) {
      tokenErr = e;
    }
    expect(tokenErr).toBeDefined();

    await MsalAuthentication.getToken();
    const isExpired = MsalAuthentication.isExpired();
    expect(isExpired).toBeFalsy();
  });
  it('should return an access token from acquireTokenSilent', async () => {
    MsalAuthentication.setup({} as Configuration, []);
    const accessToken = await MsalAuthentication.getToken();
    expect(accessToken).toBe('access-token-silent');
  });
  it('should throw error', async () => {
    MsalAuthentication.setup(undefined as unknown as Configuration, undefined as unknown as any);
    const result = MsalAuthentication.getToken();
    expect(result).rejects.toThrowError(
      'Instance is not setup properly with configurations and scopes',
    );
  });
});

describe('scopes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('should return scopes', () => {
    MsalAuthentication.setup({} as Configuration, []);
    const scopes = MsalAuthentication.scopes;
    expect(scopes).toMatchObject([]);
  });
});

describe('logout()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should logout', async () => {
    MsalAuthentication.setup(
      {
        auth: { redirectUri: 'foo' },
      } as Configuration,
      [],
    );
    let error: any = '';
    try {
      await MsalAuthentication.logout();
    } catch (e) {
      error = e;
    }
    expect(error).toEqual('');
  });
  it('should logout with logout popup', async () => {
    MsalAuthentication.setup(
      {
        auth: { redirectUri: 'foo' },
      } as Configuration,
      [],
      true, //isInIframe
    );
    let error: any = '';
    try {
      await MsalAuthentication.logout();
    } catch (e) {
      error = e;
    }
    expect(error).toEqual('');
  });
  it('should throw error', async () => {
    MsalAuthentication.setup(undefined as unknown as Configuration, []);
    const result = MsalAuthentication.logout();
    expect(result).rejects.toThrow('Instance is not setup properly with configurations and scopes');
  });
});

describe('expirationDate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('should return true', async () => {
    MsalAuthentication.setup({} as Configuration, []);
    await MsalAuthentication.getToken();
    const expiresOn = MsalAuthentication.expiresOn;
    expect(expiresOn).toBeDefined();
    const isExpired = MsalAuthentication.isExpired();
    expect(isExpired).toBeTruthy();
  });
});
