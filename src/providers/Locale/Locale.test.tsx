import { render } from '@testing-library/react';
import React from 'react';
import LocaleProvider from './Locale';

describe('Locale Provider', () => {
  it('should render without crashing', () => {
    render(
      <LocaleProvider>
        <></>
      </LocaleProvider>,
    );
  });
});
