export type AuthInfoResponseType = {
  isCustomer: boolean;
  redirectUrl: string;
};

const fetchAuthenticationInfo = async (
  baseAPIUrl: string,
): Promise<AuthInfoResponseType | undefined> => {
  try {
    const response = await fetch(`${baseAPIUrl}/authentication/info`);
    if (response && response.ok) {
      const resp: AuthInfoResponseType = await response.json();
      return resp;
    }
  } catch (e) {
    console.error(e);
  }
};

export default fetchAuthenticationInfo;
