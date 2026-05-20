export const mockUrlStringParams = () => {
  const expected = 'mocked-access-token';
  const mockHref = `https://example.com?isEmbedded=true&accessToken=${expected}`;
  Object.defineProperty(window, 'location', {
    value: { href: mockHref },
    writable: true,
  });
};
