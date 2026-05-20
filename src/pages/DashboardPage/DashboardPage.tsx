import LayoutProvider from '@dt-advisory/providers/Layout';
import { sectionStyle } from './DashboardPage.style';
import { useScreenSizer } from './useScreenSizer';

const DashboardPage = (): JSX.Element => {
  const observe = useScreenSizer();

  return (
    <section data-testid="dashboard_page" css={sectionStyle} ref={observe}>
      <LayoutProvider />
    </section>
  );
};

export default DashboardPage;
