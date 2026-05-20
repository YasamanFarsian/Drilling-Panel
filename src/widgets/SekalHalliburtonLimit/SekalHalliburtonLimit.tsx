import ErrorBoundaryProvider from '@dt-advisory/providers/ErrorBoundary';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import BaseWidget from '@dt-advisory/widgets/components/BaseWidget';
import Loading from '@dt-advisory/widgets/components/Loading';
import { useNoStreamingTimer } from '@dt-advisory/widgets/hooks/useNoStreamingTimer';
import { FormattedMessage } from 'react-intl';
import { getSekalHalliburtonSafeData } from '../helpers/sekalHalliburtonHelper';
import { ADVWidgetType } from '../helpers/types';
import SekalHalliburtonLimitInfo from './components/SHLimitInfo/SHLimitInfo';
import { containerStyle } from './SekalHalliburtonLimit.style';
import {
  ActiveSekalHalliburtonLimitType,
  SekalHalliburtonLimitType,
} from './SekalHalliburtonLimitTypes';

// eslint-disable-next-line max-lines-per-function
const SekalHalliburtonLimit = ({ useHostDataProvider }: ADVWidgetType): JSX.Element => {
  const { isConnected, data } = useHostDataProvider<SekalHalliburtonLimitType>();
  const isShowGraph = Boolean(isConnected && data);

  useNoStreamingTimer({
    data,
    type: WidgetsEnum.SekalHalliburtonLimit,
    keys: ['lastUpdated'],
    noConnectionTimerLimit: 5,
  });

  return (
    <BaseWidget
      name={WidgetsLoaderEnum.SekalHalliburtonLimit}
      title={<FormattedMessage id="widget.sekalHalliburtonLimit.title" />}
      //widgetValidity="valid"
    >
      <div
        data-testid={`container_${WidgetsLoaderEnum.SekalHalliburtonLimit}`}
        css={containerStyle(!isShowGraph)}
      >
        {!isShowGraph ? (
          <Loading />
        ) : (
          <SekalHalliburtonLimitInfo data={data as ActiveSekalHalliburtonLimitType} />
        )}
      </div>
    </BaseWidget>
  );
};

const WrappedProviderSekalHalliburtonLimit = (props: ADVWidgetType) => {
  const { HostDataProvider } = props;
  return (
    <ErrorBoundaryProvider forComponent>
      <HostDataProvider
        widgetType={WidgetsEnum.SekalHalliburtonLimit}
        checkSafeData={getSekalHalliburtonSafeData}
        {...props}
      >
        <SekalHalliburtonLimit {...props} />
      </HostDataProvider>
    </ErrorBoundaryProvider>
  );
};

export default WrappedProviderSekalHalliburtonLimit;
