// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import * as fetchMock from 'jest-fetch-mock';
import { mockUseAuthFlow } from './src/helpers/tests/mock/authFlow';

fetchMock.enableFetchMocks();

mockUseAuthFlow();

import { TextDecoder, TextEncoder } from 'node:util';

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}

if (!global.TextDecoder) {
  // @ts-expect-error its ok
  global.TextDecoder = TextDecoder;
}
