import { render, renderHook } from '@testing-library/react';
import React from 'react';
import { ConfigsProviderWrapper } from '@dt-advisory/helpers/tests/renderWithContext';
import EmbedderProvider, { useEmbedder } from './Embedder';

describe('Embedder Provider', () => {
  it('should render without crashing', () => {
    render(
      <EmbedderProvider>
        <></>
      </EmbedderProvider>,
    );
  });
  it('useAuthentication should return correct initial data', () => {
    const { result } = renderHook(() => useEmbedder(), {
      wrapper: ConfigsProviderWrapper,
    });
    expect(result.current.isInIframe).toBe(false);
  });
});
