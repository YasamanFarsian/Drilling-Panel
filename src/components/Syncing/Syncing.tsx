/* eslint-disable max-lines-per-function, complexity */
import { useSyncStateStore } from '@dt-advisory/store/SyncStateStore';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { containerStyle, labelContainerStyle, labelStyle } from './Syncing.style';

const Syncing = (): JSX.Element => {
  const resetWidgetSyncStates = useSyncStateStore((x) => x.resetWidgetSyncStates);
  const { formatMessage } = useIntl();

  useEffect(() => {
    resetWidgetSyncStates();
  }, [resetWidgetSyncStates]);

  return (
    <div data-testid="syncing" css={containerStyle}>
      <div css={labelContainerStyle}>
        <div css={labelStyle}>
          {formatMessage({ id: 'common.status.syncing', defaultMessage: 'Syncing' })}
        </div>
      </div>
    </div>
  );
};

export default Syncing;
