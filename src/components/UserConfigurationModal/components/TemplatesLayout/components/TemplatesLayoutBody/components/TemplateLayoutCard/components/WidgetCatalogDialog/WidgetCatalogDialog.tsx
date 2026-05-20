import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import WidgetCatalogTitleIcon from '@dt-advisory/assets/svgs/widgetCatalogTitleIcon.svg?react';
import {
  WidgetConfigType,
  WidgetLayoutEnum,
  WidgetsLoaderEnum,
} from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import {
  isWidgetLargeVersion,
  isWidgetSmallVersion,
} from '@dt-advisory/store/UserConfiguration/userConfigurationHelper';
import EmptyWidgetCatalog from './components/EmptyWidgetCatalog';
import WidgetCatalog from './components/WidgetCatalog';
import WidgetCatalogSkeletonLoading from './components/WidgetCatalogSkeletonLoading';
import { useGetWidgets } from './useGetWidgets';
import { useWidgetCatalogForm } from './useWidgetCatalogForm';
import {
  addBtnStyle,
  dialogStyle,
  widgetCatalogDescriptionStyle,
  widgetCatalogDividerStyle,
} from './WidgetCatalogDialog.style';

const isLoadingOrEmpty = (isLoadingWidgets: boolean, widgets?: WidgetConfigType[]) => {
  const isEmpty = !widgets || widgets.length === 0;
  if (isLoadingWidgets) {
    return <WidgetCatalogSkeletonLoading />;
  } else if (isEmpty) {
    return <EmptyWidgetCatalog />;
  } else {
    return null;
  }
};

export type WidgetCatalogDialogPropsType = {
  currentSelectedLayout: WidgetLayoutEnum;
  selectedWidgets: WidgetsLoaderEnum[];
  selectingWidgetIdx: number;
  onClose: () => void;
  onSubmit: (widgetKey: WidgetsLoaderEnum) => void;
  isSubmitting: boolean;
};

// eslint-disable-next-line max-lines-per-function
const WidgetCatalogDialog = ({
  selectedWidgets,
  selectingWidgetIdx,
  currentSelectedLayout,
  onClose,
  onSubmit,
  isSubmitting,
}: WidgetCatalogDialogPropsType): JSX.Element => {
  const isSelectingSmallWidget = isWidgetSmallVersion(selectingWidgetIdx, currentSelectedLayout);
  const isSelectingLargeWidget = isWidgetLargeVersion(selectingWidgetIdx, currentSelectedLayout);
  const currentWidget = selectedWidgets[selectingWidgetIdx];
  const { widgets, isLoadingWidgets } = useGetWidgets();
  const { isDirty, selectingWidget, handleChangeSelectingWidget } =
    useWidgetCatalogForm(currentWidget);

  return (
    <Dialog data-testid="widget_catalog_dialog_1678767476098" open css={dialogStyle}>
      <DialogTitle>
        <WidgetCatalogTitleIcon />
        <FormattedMessage id="userConfiguration.settings.templatesLayout.widgetCatalogDialog.title" />
      </DialogTitle>
      <DialogContent>
        <span css={widgetCatalogDescriptionStyle}>
          <FormattedMessage id="userConfiguration.settings.templatesLayout.widgetCatalogDialog.description" />
        </span>
        <div css={widgetCatalogDividerStyle} />
        {isLoadingOrEmpty(isLoadingWidgets, widgets) ?? (
          <WidgetCatalog
            smallWidgetMode={isSelectingSmallWidget}
            largeWidgetMode={isSelectingLargeWidget}
            currentWidget={currentWidget}
            selectedWidgets={selectedWidgets}
            widgets={widgets ?? []}
            onSelect={handleChangeSelectingWidget}
            selectingWidget={selectingWidget}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          data-testid="widget_catalog_dialog--cancelBtn"
          variant="text"
          color="secondary"
          onClick={onClose}
        >
          <FormattedMessage id="common.button.cancel" />
        </Button>
        <Button
          data-testid="widget_catalog_dialog--addBtn"
          css={addBtnStyle}
          variant="contained"
          onClick={() => onSubmit(selectingWidget)}
          disabled={isSubmitting || !isDirty}
        >
          <FormattedMessage id="common.button.add" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WidgetCatalogDialog;
