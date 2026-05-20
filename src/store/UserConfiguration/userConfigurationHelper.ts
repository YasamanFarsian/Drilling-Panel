/* eslint-disable max-lines, max-params, complexity, max-lines-per-function, max-depth */
import {
  ConvertedGridConfigType,
  GridConfigType,
  TemplateBodyType,
  TemplateToSaveType,
  WidgetConfigType,
  WidgetLayoutEnum,
  WidgetsLoaderEnum,
} from './UserConfiguration.types';

const MAX_GRID_LEN = 3;

export const getDefaultNoConectionTimerLimit = (
  widget: WidgetsLoaderEnum,
  widgetCatalog?: WidgetConfigType[],
): number | undefined => {
  const currentWidgetConfig = widgetCatalog?.find((x) => x.key === widget);
  if (currentWidgetConfig) {
    return currentWidgetConfig.widgetConfig?.noConnectionTimerLimit;
  }
};

export const isWidgetSmallVersion = (index: number, layout: WidgetLayoutEnum) => {
  switch (layout) {
    case WidgetLayoutEnum.OneRowOneWidget:
      return false;
    case WidgetLayoutEnum.OneRowThreeWidgets:
      return false;
    case WidgetLayoutEnum.OneRowFourWidgets:
      return index > 1;
    case WidgetLayoutEnum.OneRowFiveWidgets:
      return index > 0;
    case WidgetLayoutEnum.TwoRowsSixWidgets:
      return true;
  }
};
export const isWidgetLargeVersion = (index: number, layout: WidgetLayoutEnum) => {
  switch (layout) {
    case WidgetLayoutEnum.OneRowOneWidget:
      return true;
    case WidgetLayoutEnum.OneRowThreeWidgets:
      return true;
    case WidgetLayoutEnum.OneRowFourWidgets:
      return index < 2;
    case WidgetLayoutEnum.OneRowFiveWidgets:
      return index < 1;
    case WidgetLayoutEnum.TwoRowsSixWidgets:
      return false;
  }
};
export const validateGridConfigFormat = (gridConfig: GridConfigType): boolean => {
  return (
    Array.isArray(gridConfig) &&
    Array.isArray(gridConfig[0]) &&
    Array.isArray(gridConfig[1]) &&
    gridConfig[0].length === MAX_GRID_LEN &&
    gridConfig[1].length === MAX_GRID_LEN
  );
};

export const getLayoutFromAGridConfig = (gridConfig: GridConfigType): WidgetLayoutEnum | null => {
  if (validateGridConfigFormat(gridConfig)) {
    const convertedGriDconfig = convertGridConfig(gridConfig);
    return getNewLayout(convertedGriDconfig);
  }
  return null;
};

export const convertGridConfig = (gridConfig: GridConfigType): ConvertedGridConfigType => {
  const convertedGridConfig = [
    gridConfig[0][0],
    gridConfig[0][1],
    gridConfig[0][2],
    ...(gridConfig[1] || []).filter((x) => !gridConfig[0].includes(x)),
  ];
  return convertedGridConfig;
};

export const getNewLayout = (convertedGridConfig: ConvertedGridConfigType): WidgetLayoutEnum => {
  const gridLen = convertedGridConfig.length;
  switch (gridLen) {
    case 3:
      return WidgetLayoutEnum.OneRowThreeWidgets;
    case 4:
      return WidgetLayoutEnum.OneRowFourWidgets;
    case 5:
      return WidgetLayoutEnum.OneRowFiveWidgets;
    case 6:
      return WidgetLayoutEnum.TwoRowsSixWidgets;
    default:
      return WidgetLayoutEnum.OneRowThreeWidgets;
  }
};

export const getWidgetsToLoad = (
  convertedGridConfig: ConvertedGridConfigType,
  widgetConfig: WidgetConfigType[],
): WidgetsLoaderEnum[] => {
  return convertedGridConfig.map((widgetConfigIdx) => {
    if (widgetConfigIdx < 0) {
      return WidgetsLoaderEnum.Unsettled;
    }
    return widgetConfig[widgetConfigIdx].key;
  });
};

export const validateGridConfig = (gridConfig: GridConfigType): boolean => {
  const isProperType =
    Array.isArray(gridConfig) && Array.isArray(gridConfig[0]) && Array.isArray(gridConfig[1]);
  const properLen = isProperType && gridConfig.every((x) => x.length === MAX_GRID_LEN);
  const checkUniqueWidgetRow = (grid: number[]): boolean => {
    const rowObj: { [key: number]: number } = {};
    return grid.every((x) => {
      if (rowObj[x] === undefined) {
        rowObj[x] = x;
        return true;
      }
      return false;
    });
  };
  const isFirstRowValid = properLen && checkUniqueWidgetRow(gridConfig[0]);
  const isSecondRowValid = properLen && checkUniqueWidgetRow(gridConfig[1]);
  const checkCorrectWidgetPositionning = (gridConfigToTest: GridConfigType): boolean => {
    const rowOne = gridConfigToTest[0];
    const rowTwo = gridConfigToTest[1];
    return (
      rowOne[0] !== rowTwo[1] &&
      rowOne[0] !== rowTwo[2] &&
      rowOne[1] !== rowTwo[0] &&
      rowOne[1] !== rowTwo[2] &&
      rowOne[2] !== rowTwo[0] &&
      rowOne[2] !== rowTwo[1]
    );
  };
  return isFirstRowValid && isSecondRowValid && checkCorrectWidgetPositionning(gridConfig);
};

const getGridConfig = (currentSelectedLayout: WidgetLayoutEnum) => {
  switch (currentSelectedLayout) {
    case WidgetLayoutEnum.OneRowOneWidget:
      return [[-1], [-1]];
    case WidgetLayoutEnum.OneRowThreeWidgets:
      return [
        [-1, -2, -3],
        [-1, -2, -3],
      ];
    case WidgetLayoutEnum.OneRowFourWidgets:
      return [
        [-1, -2, -3],
        [-1, -2, -4],
      ];
    case WidgetLayoutEnum.OneRowFiveWidgets:
      return [
        [-1, -2, -3],
        [-1, -4, -5],
      ];

    case WidgetLayoutEnum.TwoRowsSixWidgets:
      return [
        [-1, -2, -3],
        [-4, -5, -6],
      ];
  }
};

const getWidgetConfig = (currentSelectedLayout: WidgetLayoutEnum) => {
  let max = 0;
  switch (currentSelectedLayout) {
    case WidgetLayoutEnum.OneRowThreeWidgets:
      max = 3;
      break;
    case WidgetLayoutEnum.OneRowFourWidgets:
      max = 4;
      break;
    case WidgetLayoutEnum.OneRowFiveWidgets:
      max = 5;
      break;

    case WidgetLayoutEnum.TwoRowsSixWidgets:
      max = 6;
      break;
  }
  const newWidgetConfig: WidgetConfigType[] = [];
  for (let i = 0; i < max; i++) {
    newWidgetConfig.push({
      key: WidgetsLoaderEnum.Unsettled,
    });
  }
  return newWidgetConfig;
};

// Templates
export const createNewTemplate = (
  name: string,
  currentSelectedLayout: WidgetLayoutEnum,
): TemplateBodyType => ({
  name,
  isEditable: true,
  gridConfig: getGridConfig(currentSelectedLayout),
  widgetConfig: getWidgetConfig(currentSelectedLayout),
});

export const duplicateTemplate = ({
  templatesToSave,
  id,
  newName,
}: {
  templatesToSave: TemplateToSaveType[];
  id: string;
  newName: string;
}): TemplateBodyType | undefined => {
  const originTemplate = templatesToSave.find((template) => template.id === id);
  if (!originTemplate) return;

  return {
    name: newName,
    isEditable: true,
    widgetConfig: originTemplate.widgetConfig,
    gridConfig: originTemplate.gridConfig,
  };
};

export const updateTemplate = (
  newTemplate: TemplateToSaveType,
  templates: TemplateToSaveType[],
) => {
  const id = newTemplate.id;
  return templates.map((x) => {
    if (x.id === id && x.isEditable) {
      return {
        ...newTemplate,
      };
    }
    return x;
  });
};

export const updateTemplateById = (
  id: string,
  data: Partial<TemplateToSaveType>,
  templates: TemplateToSaveType[],
) => {
  return templates.map((x) => {
    if (x.id === id && x.isEditable) {
      return {
        ...x,
        ...data,
      };
    }
    return x;
  });
};

export const deleteTemplateById = (id: string, templates: TemplateToSaveType[]) => {
  const templateToDelete = templates.find((x) => x.id === id);
  if (templateToDelete?.isEditable) {
    return templates.filter((x) => x.id !== id);
  }
  return templates;
};

export const shouldLoadDefaultLayoutWidgets = (
  templatesToSave: TemplateToSaveType[],
  currentSelectedTemplateId: string,
) => {
  const selectedTemplate = templatesToSave.find(
    (template) => template.id === currentSelectedTemplateId,
  );

  if (!selectedTemplate) return false;

  const unsettledWidgetExists = selectedTemplate.gridConfig.some((row) =>
    row.some((widgetIdx) => widgetIdx < 0),
  );

  if (unsettledWidgetExists) return true;

  return false;
};

export const getGridConfigFromConvertedIndexConfig = (
  convertedIndex: number,
  gridConfig: GridConfigType,
  currentSelectedLayout: WidgetLayoutEnum,
) => {
  const newGridConfig: GridConfigType = JSON.parse(JSON.stringify(gridConfig));
  switch (currentSelectedLayout) {
    case WidgetLayoutEnum.OneRowThreeWidgets:
      newGridConfig[0][convertedIndex] = convertedIndex;
      newGridConfig[1][convertedIndex] = convertedIndex;
      break;
    case WidgetLayoutEnum.OneRowFourWidgets:
      if (convertedIndex > 1) {
        if (convertedIndex === 2) {
          newGridConfig[0][2] = convertedIndex;
        } else {
          newGridConfig[1][2] = convertedIndex;
        }
      } else {
        newGridConfig[0][convertedIndex] = convertedIndex;
        newGridConfig[1][convertedIndex] = convertedIndex;
      }
      break;
    case WidgetLayoutEnum.OneRowFiveWidgets:
      if (convertedIndex > 0) {
        if (convertedIndex <= 2) {
          newGridConfig[0][convertedIndex] = convertedIndex;
        } else {
          if (convertedIndex === 3) {
            newGridConfig[1][1] = convertedIndex;
          }
          if (convertedIndex === 4) {
            newGridConfig[1][2] = convertedIndex;
          }
        }
      } else {
        newGridConfig[0][0] = convertedIndex;
        newGridConfig[1][0] = convertedIndex;
      }
      break;

    case WidgetLayoutEnum.TwoRowsSixWidgets:
      if (convertedIndex > 2) {
        newGridConfig[1][convertedIndex - MAX_GRID_LEN] = convertedIndex;
      } else {
        newGridConfig[0][convertedIndex] = convertedIndex;
      }
      break;
  }
  return newGridConfig;
};

export const areWidgetConfigsEqual = (
  currentWidgetConfig: WidgetConfigType[],
  nextWidgetConfig: WidgetConfigType[],
) => {
  return (
    currentWidgetConfig.length === nextWidgetConfig.length &&
    currentWidgetConfig.every((widget, index) => widget.key === nextWidgetConfig[index].key)
  );
};

type TemplateIdsEqualType = {
  prevSelectedTemplateId: string;
  currentSelectedTemplateId: string;
};
export const areTemplateIdsEqual = ({
  prevSelectedTemplateId,
  currentSelectedTemplateId,
}: TemplateIdsEqualType) => {
  return prevSelectedTemplateId === currentSelectedTemplateId;
};

export const isTemplateEmpty = (convertedGrid: ConvertedGridConfigType): boolean => {
  return convertedGrid.length === 0 || convertedGrid.every((x) => x < 0);
};
