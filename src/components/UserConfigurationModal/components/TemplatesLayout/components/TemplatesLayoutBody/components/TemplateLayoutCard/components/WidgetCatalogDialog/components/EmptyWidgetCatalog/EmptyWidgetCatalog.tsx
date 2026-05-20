import React from 'react';
import { FormattedMessage } from 'react-intl';
import { containerStyle } from './EmptyWidgetCatalog.style';

const EmptyWidgetCatalog = (): JSX.Element => {
  return (
    <div css={containerStyle} data-testid="empty_widget_catalog_1678892958026">
      <FormattedMessage id="userConfiguration.settings.templatesLayout.widgetCatalogDialog.emptyWidget" />
    </div>
  );
};

export default EmptyWidgetCatalog;
