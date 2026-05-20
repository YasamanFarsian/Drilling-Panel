import LayoutProvider from '@dt-advisory/providers/Layout';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { sectionStyle } from './DashboardPage.style';
import { useScreenSizer } from './useScreenSizer';

const DashboardPage = (): JSX.Element => {
  const { formatMessage } = useIntl();
  const observe = useScreenSizer();

  return (
    <section data-testid="dashboard_page" css={sectionStyle} ref={observe}>
      <Helmet>
        <title>{formatMessage({ id: 'app.title', defaultMessage: 'Reporting Panel' })}</title>
      </Helmet>

      <LayoutProvider />
    </section>
  );
};

export default DashboardPage;
