import { act, fireEvent, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mockUseAuthFlow } from '@dt-advisory/helpers/tests/mock/authFlow';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import EmbedderProvider from '@dt-advisory/providers/Embedder';
import { useSyncStateStore } from '@dt-advisory/store/SyncStateStore';
import AppHeader from './AppHeader';

jest.mock('@dt-advisory/providers/Configs', () => ({
  useConfigs: jest.fn().mockReturnValue({
    enableAuthentication: true,
  }),
}));

jest.mock('@dt-advisory/providers/Authentication', () => {
  return {
    useAuthentication: () => ({
      signOut: jest.fn(),
    }),
  };
});

mockUseAuthFlow();

function renderWithMemoryRouter() {
  return renderWithThemeAndLocaleProviders(
    <EmbedderProvider>
      <MemoryRouter>
        <AppHeader />
      </MemoryRouter>
    </EmbedderProvider>,
  );
}

describe('AppHeader', () => {
  it('should render without crashing', () => {
    const { getByTestId } = renderWithMemoryRouter();
    expect(getByTestId('main-app-header')).toBeInTheDocument();
  });
  it('should open and close configuration view withtouth issues', () => {
    const { getByTestId } = renderWithMemoryRouter();
    act(() => {
      fireEvent.click(screen.getByTestId('at_main_topBar_btn_operationInfo'));
    });
    expect(getByTestId('operation-info-modal')).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByTestId('CloseIcon'));
    });
  });
  it('should open and close settings withtouth issues', () => {
    const { getByTestId } = renderWithMemoryRouter();
    act(() => {
      fireEvent.click(screen.getByTestId('at_main_topBar_btn_setting'));
    });
    expect(getByTestId('user-configuration-modal')).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByTestId('CloseIcon'));
    });
  });

  it('should contain rem unit as a padding', () => {
    const { getByTestId } = renderWithMemoryRouter();
    expect(window.getComputedStyle(getByTestId('main-app-header')).padding).toContain('rem');
  });

  it('should call signout btn withoputh crashing', () => {
    const { getByTestId } = renderWithMemoryRouter();
    const signoutBtn = getByTestId('at_main_topBar_btn_signout');
    fireEvent.click(signoutBtn);
  });

  it('should render LiveIcon when isAllWidgetLive is true', () => {
    const { result } = renderHook(() => useSyncStateStore((x) => x));
    act(() => {
      result.current.resetWidgetSyncStates();
      result.current.setWidgetToSync(1);
      result.current.setSyncStates({ widget1: true });
    });

    const { getByTestId, queryByTestId } = renderWithMemoryRouter();

    expect(getByTestId('live-icon')).toBeInTheDocument();
    expect(queryByTestId('syncing-icon')).not.toBeInTheDocument();
  });

  it('should render SyncingIcon when isAllWidgetLive is false', () => {
    const { result } = renderHook(() => useSyncStateStore((x) => x));
    act(() => {
      result.current.resetWidgetSyncStates();
      result.current.setWidgetToSync(2);
      result.current.setSyncStates({ widget1: true });
    });

    const { getByTestId, queryByTestId } = renderWithMemoryRouter();

    expect(getByTestId('syncing-icon')).toBeInTheDocument();
    expect(queryByTestId('live-icon')).not.toBeInTheDocument();
  });

  it('should hide icons when shouldHideIcons is true', () => {
    const { result } = renderHook(() => useSyncStateStore((x) => x));

    act(() => {
      //Replicate resetWidgetSyncState being called in reconnecting
      result.current.resetWidgetSyncStates();
    });

    const { queryByTestId } = renderWithMemoryRouter();

    expect(queryByTestId('live-icon')).not.toBeInTheDocument();
    expect(queryByTestId('syncing-icon')).not.toBeInTheDocument();
  });

  it('should hide icons when isNoConnectionLabel is enabled', () => {
    const { result } = renderHook(() => useSyncStateStore((x) => x));
    act(() => {
      result.current.resetWidgetSyncStates();
      result.current.setWidgetToSync(1);
      result.current.setSyncStates({ widget1: true });
      result.current.setIsNoConnectionLabelEnabled(true);
    });

    const { queryByTestId } = renderWithMemoryRouter();

    expect(queryByTestId('live-icon')).not.toBeInTheDocument();
    expect(queryByTestId('syncing-icon')).not.toBeInTheDocument();
  });
});
