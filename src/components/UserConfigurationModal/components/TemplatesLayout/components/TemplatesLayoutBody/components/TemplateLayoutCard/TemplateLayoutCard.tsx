/* eslint-disable complexity */
import { IconButton, Radio } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import DuplicateIcon from '@dt-advisory/assets/svgs/duplicate.svg?react';
import PenUnderlineIcon from '@dt-advisory/assets/svgs/pen-underline.svg?react';
import RadioCheckedIcon from '@dt-advisory/assets/svgs/radioButton/checked.svg?react';
import RadioUncheckIcon from '@dt-advisory/assets/svgs/radioButton/uncheck.svg?react';
import TrashBinIcon from '@dt-advisory/assets/svgs/trash-bin.svg?react';
import { mapWithKeyId } from '@dt-advisory/helpers/keyId';
import {
  TemplateToSaveType,
  WidgetLayoutEnum,
  WidgetsLoaderEnum,
} from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import {
  convertGridConfig,
  getWidgetsToLoad,
} from '@dt-advisory/store/UserConfiguration/userConfigurationHelper';
import TemplateNameFormDialog from '../../../TemplateNameFormDialog';
import DeleteTemplateLayoutConfirmDialog from './components/DeleteTemplateLayoutConfirmDialog';
import OneRowFiveWidgetsTemplate from './components/OneRowFiveWidgetsTemplate';
import OneRowFourWidgetsTemplate from './components/OneRowFourWidgetsTemplate';
import OneRowThreeWidgetsTemplate from './components/OneRowThreeWidgetsTemplate';
import TwoRowsSixWidgetsTemplate from './components/TwoRowsSixWidgetsTemplate';
import WidgetCatalogDialog from './components/WidgetCatalogDialog';
import { useDeleteLayout } from './hooks/useDeleteLayout';
import { useDuplicateLayout } from './hooks/useDuplicateLayout';
import { useEditTemplateName } from './hooks/useEditTemplateName';
import { useRemoveWidgetFromTemplate } from './hooks/useRemoveWidgetFromTemplate';
import { useTemplateSelection } from './hooks/useTemplateSelection';
import { useWidgetCatalog } from './hooks/useWidgetCatalog';
import { templateCardContainerStyle } from './TemplateLayoutCard.style';

export type TemplateLayoutCardPropsType = {
  currentSelectedLayout?: WidgetLayoutEnum;
} & TemplateToSaveType;

// eslint-disable-next-line max-lines-per-function
const TemplateLayoutCard = ({
  id,
  name,
  isEditable,
  gridConfig,
  widgetConfig,
  currentSelectedLayout,
}: TemplateLayoutCardPropsType): JSX.Element => {
  const templateBody = {
    name,
    isEditable,
    gridConfig,
    widgetConfig,
  };
  const {
    isDeleting,
    openDeleteDialog,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleConfimDelete,
  } = useDeleteLayout(id, name);
  const {
    openDuplicateDialog,
    isDuplicating,
    handleOpenDuplicateDialog,
    handleCloseDuplicateDialog,
    handleDuplicateLayout,
    newNameAsDuplicateTemplate,
    duplicateDialogTitleLabel,
  } = useDuplicateLayout(id);
  const {
    openEditTemplateNameDialog,
    isEditingTemplateName,
    handleOpenEditTemplateNameDialog,
    handleCloseEditTemplateNameDialog,
    handleEditTemplateName,
    editTemplateNameDialogTitleLabel,
  } = useEditTemplateName(id);
  const {
    widgetCatalogConfig,
    handleOpenWidgetCatalogDialog,
    handleCloseWidgetCatalogDialog,
    handleUpdateWidget,
    isUpdatingTemplateWidget,
  } = useWidgetCatalog(id);
  const { handleRemoveWidget } = useRemoveWidgetFromTemplate(id);

  const { setCurrentSelectedTemplateId, isSelected } = useTemplateSelection(id);

  if (!currentSelectedLayout) return <></>;

  const convertedGridConfig = convertGridConfig(gridConfig);

  //we get the widgets to in new layout
  const widgetsToLoad = getWidgetsToLoad(convertedGridConfig, widgetConfig);

  return (
    <div
      data-testid="template_layout_card_1676342510671"
      css={templateCardContainerStyle}
      className={clsx(isSelected && 'templateCardContainer--active')}
    >
      <div className="templateLayoutContent" /*ref={containerRef}*/>
        {currentSelectedLayout === WidgetLayoutEnum.OneRowThreeWidgets && (
          <OneRowThreeWidgetsTemplate
            onSelectWidget={handleOpenWidgetCatalogDialog}
            isEditable={isEditable}
            widgetsToLoad={mapWithKeyId(widgetsToLoad)}
            onRemoveWidget={(widgetToLoadIdx) => handleRemoveWidget(widgetToLoadIdx, templateBody)}
          />
        )}
        {currentSelectedLayout === WidgetLayoutEnum.OneRowFourWidgets && (
          <OneRowFourWidgetsTemplate
            onSelectWidget={handleOpenWidgetCatalogDialog}
            isEditable={isEditable}
            widgetsToLoad={mapWithKeyId(widgetsToLoad)}
            onRemoveWidget={(widgetToLoadIdx) => handleRemoveWidget(widgetToLoadIdx, templateBody)}
          />
        )}
        {currentSelectedLayout === WidgetLayoutEnum.OneRowFiveWidgets && (
          <OneRowFiveWidgetsTemplate
            onSelectWidget={handleOpenWidgetCatalogDialog}
            isEditable={isEditable}
            widgetsToLoad={mapWithKeyId(widgetsToLoad)}
            onRemoveWidget={(widgetToLoadIdx) => handleRemoveWidget(widgetToLoadIdx, templateBody)}
          />
        )}
        {currentSelectedLayout === WidgetLayoutEnum.TwoRowsSixWidgets && (
          <TwoRowsSixWidgetsTemplate
            onSelectWidget={handleOpenWidgetCatalogDialog}
            isEditable={isEditable}
            widgetsToLoad={mapWithKeyId(widgetsToLoad)}
            onRemoveWidget={(widgetToLoadIdx) => handleRemoveWidget(widgetToLoadIdx, templateBody)}
          />
        )}
      </div>
      <div className="templateLayoutFooter">
        <div
          className={clsx(
            'templateLayoutNameContainer',
            isSelected && 'templateLayoutNameContainer--active',
          )}
        >
          <Radio
            icon={<RadioUncheckIcon />}
            checkedIcon={<RadioCheckedIcon />}
            onChange={() => setCurrentSelectedTemplateId(id)}
            checked={isSelected}
          />
          <div className="templateLayoutName">{name}</div>
          {isEditable && (
            <IconButton
              data-testid="template_layout_card--edit_button"
              className="templateLayoutEditBtn"
              onClick={handleOpenEditTemplateNameDialog}
            >
              <PenUnderlineIcon />
            </IconButton>
          )}
        </div>
        {isEditable && (
          <IconButton
            data-testid="template_layout_card--delete_button"
            className="templateLayoutDeleteBtn"
            onClick={handleOpenDeleteDialog}
          >
            <TrashBinIcon />
          </IconButton>
        )}
        <div className={clsx('verticalLine', isSelected && 'verticalLine--selected')} />
        <IconButton
          data-testid="template_layout_card--duplicate_button"
          className="templateLayoutDuplicateBtn"
          onClick={handleOpenDuplicateDialog}
        >
          <DuplicateIcon />
        </IconButton>
      </div>
      {openDeleteDialog && (
        <DeleteTemplateLayoutConfirmDialog
          name={name}
          onClose={handleCloseDeleteDialog}
          onConfirm={handleConfimDelete}
          isDeleting={isDeleting}
        />
      )}
      {openDuplicateDialog && (
        <TemplateNameFormDialog
          isDuplicate={true}
          titleLabel={duplicateDialogTitleLabel}
          onClose={handleCloseDuplicateDialog}
          onSave={handleDuplicateLayout}
          isSubmitting={isDuplicating}
          initialValue={newNameAsDuplicateTemplate}
        />
      )}
      {openEditTemplateNameDialog && (
        <TemplateNameFormDialog
          initialValue={name}
          titleLabel={editTemplateNameDialogTitleLabel}
          onClose={handleCloseEditTemplateNameDialog}
          onSave={handleEditTemplateName}
          isSubmitting={isEditingTemplateName}
        />
      )}
      {widgetCatalogConfig.open && (
        <WidgetCatalogDialog
          currentSelectedLayout={currentSelectedLayout}
          selectedWidgets={widgetsToLoad}
          selectingWidgetIdx={widgetCatalogConfig.selectingWidgetIdx}
          onClose={handleCloseWidgetCatalogDialog}
          onSubmit={(widgetKey: WidgetsLoaderEnum) =>
            handleUpdateWidget(widgetKey, templateBody, currentSelectedLayout)
          }
          isSubmitting={isUpdatingTemplateWidget}
        />
      )}
    </div>
  );
};

export default TemplateLayoutCard;
