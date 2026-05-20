import { Outlet } from 'react-router-dom';
import AppHeader from '../AppHeader';
import { containerStyle, contentStyle } from './MainLayout.style';
import useResponsiveMainLayout from './useResponsiveMainLayout';

const MainLayout = (): JSX.Element => {
  const mainLayoutRef = useResponsiveMainLayout();

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
