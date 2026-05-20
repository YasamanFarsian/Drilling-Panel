import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { ConfigsAndEmulatorProviderWrapper } from '@dt-advisory/helpers/tests/renderWithContext';
import ConfigsProvider from '@dt-advisory/providers/Configs';
import EmulatorProvider, { useEmulator } from './Emulator';

describe('Emulator Provider', () => {
  it('should render without crashing', () => {
    render(
      <ConfigsProvider>
        <EmulatorProvider>
          <></>
        </EmulatorProvider>
      </ConfigsProvider>,
    );
  });

  it('useEmulator should return correct initial data', () => {
    const { result } = renderHook(() => useEmulator(), {
      wrapper: ConfigsAndEmulatorProviderWrapper,
    });
    expect(result.current.isEmulated).toBeFalsy();
  });
});
