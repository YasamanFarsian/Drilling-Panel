/* eslint-disable max-lines-per-function */
import FullPageLoading from '@dt-advisory/components/FullPageLoading';
import { useUserConfiguration } from '@dt-advisory/components/MainLayout/useUserConfiguration';
import { handleRigCodeAndRedirectUrl, LocalStorageKeys } from '@dt-advisory/helpers/launcherHelper';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from '../AppHeader';
import { containerStyle, contentStyle } from './MainLayout.style';
import useResponsiveMainLayout from './useResponsiveMainLayout';

const MainLayout = (): JSX.Element => {
  const mainLayoutRef = useResponsiveMainLayout();
  const { isLoading, isLoadingUnitsSettings } = useUserConfiguration();
  const isHeaderVisible = useSettingsStore((x) => x.settings.isHeaderVisible);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const rigCode = queryParams.get(LocalStorageKeys.RigCode);
    const redirectUri = queryParams.get(LocalStorageKeys.RedirectUri);

    handleRigCodeAndRedirectUrl(rigCode, redirectUri);

    if (rigCode || redirectUri) {
      queryParams.delete(LocalStorageKeys.RigCode);
      queryParams.delete(LocalStorageKeys.RedirectUri);

      navigate(
        {
          pathname: location.pathname,
          search: queryParams.toString(),
        },
        { replace: true },
      );
    }
  }, []);

  if (isLoading || isLoadingUnitsSettings) {
    return <FullPageLoading status="Loading user settings..." />;
  }

  return (
    <section data-testid="main_layout" ref={mainLayoutRef} css={containerStyle}>
      <AppHeader />

      <main data-testid="main_layout_content" css={contentStyle}>
        <Outlet />
      </main>
    </section>
  );
};

export default MainLayout;
