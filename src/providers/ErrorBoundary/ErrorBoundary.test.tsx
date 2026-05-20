import { render } from '@testing-library/react';
import React from 'react';
import ErrorBoundaryProvider from './ErrorBoundary';

describe('ErrorBoundary Provider', () => {
  it('should render without crashing', () => {
    const { getByTestId } = render(
      <ErrorBoundaryProvider>
        <div data-testid="error_child_sample"></div>
      </ErrorBoundaryProvider>,
    );
    expect(getByTestId('error_child_sample')).toBeInTheDocument();
  });
});
