import React from 'react';
import { FormattedMessage } from 'react-intl';
import { containerStyle } from './EmptyTemplateLayout.style';

const EmptyTemplateLayout = (): JSX.Element => {
  return (
    <div css={containerStyle} data-testid="empty_template_layout_1676562585410">
      <FormattedMessage id="userConfiguration.settings.templatesLayout.emptyLayout" />
    </div>
  );
};

export default EmptyTemplateLayout;
