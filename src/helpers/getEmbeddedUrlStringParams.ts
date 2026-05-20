const getEmbeddedUrlStringParams = () => {
  const urlString = window.location.href;

  const url = new URL(urlString);
  const searchParams = url.searchParams;

  const isEmbedded = searchParams.get('isEmbedded');
  const accessToken = searchParams.get('accessToken');

  if (isEmbedded === 'true' && accessToken) return accessToken;
};
export default getEmbeddedUrlStringParams;
