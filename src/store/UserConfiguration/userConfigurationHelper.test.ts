import fallbackUserConfiguration from '@dt-advisory/config/fallbackUserConfiguration.json';
import {
  TemplateToSaveType,
  WidgetConfigType,
  WidgetLayoutEnum,
  WidgetsLoaderEnum,
} from './UserConfiguration.types';
import {
  areTemplateIdsEqual,
  areWidgetConfigsEqual,
  convertGridConfig,
  createNewTemplate,
  deleteTemplateById,
  duplicateTemplate,
  getDefaultNoConectionTimerLimit,
  getGridConfigFromConvertedIndexConfig,
  getLayoutFromAGridConfig,
  getNewLayout,
  getWidgetsToLoad,
  isTemplateEmpty,
  isWidgetLargeVersion,
  isWidgetSmallVersion,
  shouldLoadDefaultLayoutWidgets,
  updateTemplate,
  updateTemplateById,
  validateGridConfig,
} from './userConfigurationHelper';

describe('helper: userConfigurationHelper', () => {
  const gridConfig3Widgets = [
    [0, 1, 2],
    [0, 1, 2],
  ];
  const gridConfig4Widgets = [
    [0, 1, 2],
    [0, 1, 3],
  ];
  const gridConfig5Widgets = [
    [0, 1, 2],
    [0, 3, 4],
  ];
  const gridConfig6Widgets = [
    [0, 1, 2],
    [3, 4, 5],
  ];
  const widgetConfig: WidgetConfigType[] = [
    {
      key: WidgetsLoaderEnum.Safeguards,
    },
    {
      key: WidgetsLoaderEnum.Ecd,
    },
    {
      key: WidgetsLoaderEnum.Cutting,
    },
    {
      key: WidgetsLoaderEnum.Wellbore,
    },
  ];

  const templatesToSave = fallbackUserConfiguration.layouts as TemplateToSaveType[];
  const templatesToSave2 = JSON.parse(
    JSON.stringify(fallbackUserConfiguration.layouts),
  ) as TemplateToSaveType[];
  templatesToSave2[0].isEditable = true;

  it.each([
    WidgetsLoaderEnum.Cutting,
    WidgetsLoaderEnum.Ecd,
    WidgetsLoaderEnum.Safeguards,
    WidgetsLoaderEnum.RoadmapDrag,
    WidgetsLoaderEnum.RoadmapTorque,
    WidgetsLoaderEnum.TransientMechanicalDrag,
    WidgetsLoaderEnum.TransientMechanicalTorque,
  ])(
    'getDefaultNoConectionTimerLimit should return correct noConnectionTimerLimit for %p',
    (widget: WidgetsLoaderEnum) => {
      const result = getDefaultNoConectionTimerLimit(
        widget,
        fallbackUserConfiguration.widgetCatalog as WidgetConfigType[],
      );
      expect(result).toEqual(5);
    },
  );

  it('getLayoutFromAGridConfig should return proper WidgetLayoutEnum', () => {
    let result = getLayoutFromAGridConfig(gridConfig3Widgets);
    expect(result).toEqual(WidgetLayoutEnum.OneRowThreeWidgets);
    result = getLayoutFromAGridConfig(gridConfig4Widgets);
    expect(result).toEqual(WidgetLayoutEnum.OneRowFourWidgets);
    result = getLayoutFromAGridConfig(gridConfig5Widgets);
    expect(result).toEqual(WidgetLayoutEnum.OneRowFiveWidgets);
    result = getLayoutFromAGridConfig(gridConfig6Widgets);
    expect(result).toEqual(WidgetLayoutEnum.TwoRowsSixWidgets);
  });

  it('getLayoutFromAGridConfig should return null if grid config is not valid', () => {
    const result = getLayoutFromAGridConfig([[0, 1, 2, 3], [0]]);
    expect(result).toEqual(null);
  });

  it('convertGridConfig with proper values', () => {
    const threeWidgets = convertGridConfig(gridConfig3Widgets);
    expect(threeWidgets).toEqual([0, 1, 2]);
    const fourWidgets = convertGridConfig(gridConfig4Widgets);
    expect(fourWidgets).toEqual([0, 1, 2, 3]);
    const fiveWidgets = convertGridConfig(gridConfig5Widgets);
    expect(fiveWidgets).toEqual([0, 1, 2, 3, 4]);
    const sixWidgets = convertGridConfig(gridConfig6Widgets);
    expect(sixWidgets).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('getNewLayout with proper layout enum', () => {
    const threeWidgets = convertGridConfig(gridConfig3Widgets);
    const threeWidgetsLayout = getNewLayout(threeWidgets);
    expect(threeWidgetsLayout).toEqual(WidgetLayoutEnum.OneRowThreeWidgets);
    const fourWidgets = convertGridConfig(gridConfig4Widgets);
    const fourWidgetsLayout = getNewLayout(fourWidgets);
    expect(fourWidgetsLayout).toEqual(WidgetLayoutEnum.OneRowFourWidgets);
    const fiveWidgets = convertGridConfig(gridConfig5Widgets);
    const fiveWidgetsLayout = getNewLayout(fiveWidgets);
    expect(fiveWidgetsLayout).toEqual(WidgetLayoutEnum.OneRowFiveWidgets);
    const sixWidgets = convertGridConfig(gridConfig6Widgets);
    const sixWidgetsLayout = getNewLayout(sixWidgets);
    expect(sixWidgetsLayout).toEqual(WidgetLayoutEnum.TwoRowsSixWidgets);
    const defaultWidgetsLayout = getNewLayout([]);
    expect(defaultWidgetsLayout).toEqual(WidgetLayoutEnum.OneRowThreeWidgets);
  });

  describe('getWidgetsToLoad', () => {
    it('should getWidgetsToLoad with proper widgets to load enum', () => {
      const threeWidgets = convertGridConfig(gridConfig3Widgets);
      const threeWidgetsToLoad = getWidgetsToLoad(threeWidgets, widgetConfig);
      expect(threeWidgetsToLoad).toEqual([
        WidgetsLoaderEnum.Safeguards,
        WidgetsLoaderEnum.Ecd,
        WidgetsLoaderEnum.Cutting,
      ]);
      const fourWidgets = convertGridConfig(gridConfig4Widgets);
      const fourWidgetsToLoad = getWidgetsToLoad(fourWidgets, widgetConfig);
      expect(fourWidgetsToLoad).toEqual([
        WidgetsLoaderEnum.Safeguards,
        WidgetsLoaderEnum.Ecd,
        WidgetsLoaderEnum.Cutting,
        WidgetsLoaderEnum.Wellbore,
      ]);
    });

    it('should return Unsettled enum when gridConfig is negative', () => {
      const gridConfig3WidgetsWithNegative = [
        [0, 1, -1],
        [0, 1, -1],
      ];
      const threeWidgets = convertGridConfig(gridConfig3WidgetsWithNegative);
      const tempWidgetConfig: WidgetConfigType[] = [
        {
          key: WidgetsLoaderEnum.Safeguards,
        },
        {
          key: WidgetsLoaderEnum.Ecd,
        },
      ];
      const threeWidgetsToLoad = getWidgetsToLoad(threeWidgets, tempWidgetConfig);
      expect(threeWidgetsToLoad).toEqual([
        WidgetsLoaderEnum.Safeguards,
        WidgetsLoaderEnum.Ecd,
        WidgetsLoaderEnum.Unsettled,
      ]);
    });
  });

  it('validateGridConfig to be truthy', () => {
    const isValidGridConfig3Widgets = validateGridConfig(gridConfig3Widgets);
    expect(isValidGridConfig3Widgets).toBeTruthy();
    const isValidGridConfig4Widgets = validateGridConfig(gridConfig4Widgets);
    expect(isValidGridConfig4Widgets).toBeTruthy();
    const isValidGridConfig5Widgets = validateGridConfig(gridConfig5Widgets);
    expect(isValidGridConfig5Widgets).toBeTruthy();
    const isValidGridConfig6Widgets = validateGridConfig(gridConfig6Widgets);
    expect(isValidGridConfig6Widgets).toBeTruthy();
  });

  it('validateGridConfig to be falsy', () => {
    const isValidGridConfig1 = validateGridConfig([
      [0, 1, 2],
      [0, 1, 1],
    ]);
    expect(isValidGridConfig1).toBeFalsy();
    const isValidGridConfig2 = validateGridConfig([
      [0, 1, 0],
      [2, 3, 4],
    ]);
    expect(isValidGridConfig2).toBeFalsy();
    const isValidGridConfig3 = validateGridConfig([
      [0, 1, 2],
      [3, 1, 0],
    ]);
    expect(isValidGridConfig3).toBeFalsy();
    const isValidGridConfig4 = validateGridConfig([
      [0, 1, 2],
      [0, 2],
    ]);
    expect(isValidGridConfig4).toBeFalsy();
    const isValidGridConfig5 = validateGridConfig([
      [0, 1, 2],
      [3, 4, 0],
    ]);
    expect(isValidGridConfig5).toBeFalsy();
    const isValidGridConfig6 = validateGridConfig([
      [0, 0, 2],
      [3, 4, 1],
    ]);
    expect(isValidGridConfig6).toBeFalsy();
  });

  describe('duplicateTemplate', () => {
    it('should return undefined if id is not existed in templateToSaves', () => {
      const duplicatedTemplate = duplicateTemplate({
        templatesToSave: [],
        id: 'random',
        newName: 'new name',
      });
      expect(duplicatedTemplate).toBeUndefined();
    });

    it('should return isEditable true', () => {
      const duplicatedTemplate = duplicateTemplate({
        templatesToSave: [
          { id: '123', name: 'template', gridConfig: [], widgetConfig: [], isEditable: false },
        ],
        id: '123',
        newName: 'new name',
      });
      expect(duplicatedTemplate?.isEditable).toBeTruthy();
    });

    it('should return name from newName', () => {
      const duplicatedTemplate = duplicateTemplate({
        templatesToSave: [
          { id: '123', name: 'template', gridConfig: [], widgetConfig: [], isEditable: false },
        ],
        id: '123',
        newName: 'new name',
      });
      expect(duplicatedTemplate?.name).toEqual('new name');
    });

    it('should return widgetConfig from the found template', () => {
      const duplicatedTemplate = duplicateTemplate({
        templatesToSave: [
          {
            id: '123',
            name: 'template',
            gridConfig: [
              [0, 1, 2],
              [0, 1, 2],
            ],
            widgetConfig: [
              {
                key: 'Safeguards' as any,
              },
              {
                key: 'Cutting' as any,
              },
              {
                key: 'Ecd' as any,
              },
            ],
            isEditable: false,
          },
        ],
        id: '123',
        newName: 'new name',
      });
      expect(duplicatedTemplate?.widgetConfig).toStrictEqual([
        {
          key: 'Safeguards' as any,
        },
        {
          key: 'Cutting' as any,
        },
        {
          key: 'Ecd' as any,
        },
      ]);
    });

    it('should return gridConfig from the found template', () => {
      const duplicatedTemplate = duplicateTemplate({
        templatesToSave: [
          {
            id: '123',
            name: 'template',
            gridConfig: [
              [0, 1, 2],
              [0, 1, 2],
            ],
            widgetConfig: [
              {
                key: 'Safeguards' as any,
              },
              {
                key: 'Cutting' as any,
              },
              {
                key: 'Ecd' as any,
              },
            ],
            isEditable: false,
          },
        ],
        id: '123',
        newName: 'new name',
      });
      expect(duplicatedTemplate?.gridConfig).toStrictEqual([
        [0, 1, 2],
        [0, 1, 2],
      ]);
    });
  });

  describe('createNewTemplate', () => {
    it('should return correct values', () => {
      const newTemplate = createNewTemplate('foo', WidgetLayoutEnum.OneRowThreeWidgets);
      expect(newTemplate.name).toEqual('foo');
      expect(newTemplate.isEditable).toEqual(true);
      expect(newTemplate.widgetConfig).toEqual([
        {
          key: WidgetsLoaderEnum.Unsettled,
        },
        {
          key: WidgetsLoaderEnum.Unsettled,
        },
        {
          key: WidgetsLoaderEnum.Unsettled,
        },
      ]);
    });

    it('should return correct gridConfig when currentSelectedLayout = OneRowThreeWidgets', () => {
      const newTemplate = createNewTemplate('foo', WidgetLayoutEnum.OneRowThreeWidgets);
      expect(newTemplate.gridConfig).toStrictEqual([
        [-1, -2, -3],
        [-1, -2, -3],
      ]);
      expect(newTemplate.widgetConfig.length).toEqual(3);
    });

    it('should return correct gridConfig when currentSelectedLayout = OneRowFourWidgets', () => {
      const newTemplate = createNewTemplate('foo', WidgetLayoutEnum.OneRowFourWidgets);
      expect(newTemplate.gridConfig).toStrictEqual([
        [-1, -2, -3],
        [-1, -2, -4],
      ]);
      expect(newTemplate.widgetConfig.length).toEqual(4);
    });

    it('should return correct gridConfig when currentSelectedLayout = OneRowFiveWidgets', () => {
      const newTemplate = createNewTemplate('foo', WidgetLayoutEnum.OneRowFiveWidgets);
      expect(newTemplate.gridConfig).toStrictEqual([
        [-1, -2, -3],
        [-1, -4, -5],
      ]);
      expect(newTemplate.widgetConfig.length).toEqual(5);
    });

    it('should return correct gridConfig when currentSelectedLayout = TwoRowsSixWidgets', () => {
      const newTemplate = createNewTemplate('foo', WidgetLayoutEnum.TwoRowsSixWidgets);
      expect(newTemplate.gridConfig).toStrictEqual([
        [-1, -2, -3],
        [-4, -5, -6],
      ]);
      expect(newTemplate.widgetConfig.length).toEqual(6);
    });
  });

  it('should not delete a template if isEditable = false', () => {
    const updatedTemplates = deleteTemplateById('1', templatesToSave);
    expect(updatedTemplates.find((x) => x.id === '1')).toBeDefined();
  });

  it('it should delete a template if isEditable = true', () => {
    const updatedTemplates = deleteTemplateById('1', templatesToSave2);
    expect(updatedTemplates.find((x) => x.id === '1')).toBeUndefined();
  });

  it('should not update a template if isEditable = false', () => {
    const templateToUpdate = {
      id: '1',
      name: 'FOO', // from fallbackUserConfiguration JSON file original name is `Sekal Dev`
      isEditable: true, // from fallbackUserConfiguration JSON file isEditable is false
      gridConfig: [
        [0, 1, 2],
        [0, 1, 2],
      ],
      widgetConfig: [
        {
          key: 'Safeguards',
          widgetConfig: null,
        },
        {
          key: 'ECD',
        },
        {
          key: 'Cutting',
        },
      ],
    } as TemplateToSaveType;
    const updatedTemplates = updateTemplate(templateToUpdate, templatesToSave);
    const checkUpdatedTemplate = updatedTemplates.find((x) => x.id === '1');
    expect(checkUpdatedTemplate?.name).toEqual('DT Advisory 1');
  });

  it('it should update a template if isEditable = true', () => {
    const templateToUpdate = {
      id: '1',
      name: 'FOO',
      isEditable: true,
      gridConfig: [
        [0, 1, 2],
        [0, 1, 2],
      ],
      widgetConfig: [
        {
          key: 'Safeguards',
          widgetConfig: null,
        },
        {
          key: 'ECD',
        },
        {
          key: 'Cutting',
        },
      ],
    } as TemplateToSaveType;
    const updatedTemplates = updateTemplate(templateToUpdate, templatesToSave2);
    const checkUpdatedTemplate = updatedTemplates.find((x) => x.id === '1');
    expect(checkUpdatedTemplate?.name).toEqual('FOO');
  });

  it('it should not update a template by id if isEditable = false', () => {
    const updatedTemplate = updateTemplateById('1', { name: 'FOO' }, templatesToSave);
    const checkUpdatedTemplate = updatedTemplate.find((x) => x.id === '1');
    expect(checkUpdatedTemplate?.name).toEqual('DT Advisory 1');
  });
  it('it should update a template by id if isEditable = true', () => {
    const updatedTemplate = updateTemplateById('1', { name: 'FOO' }, templatesToSave2);
    const checkUpdatedTemplate = updatedTemplate.find((x) => x.id === '1');
    expect(checkUpdatedTemplate?.name).toEqual('FOO');
  });

  describe('shouldLoadDefaultLayoutWidgets', () => {
    it('should return false if template not found', () => {
      const result = shouldLoadDefaultLayoutWidgets([], 'random');
      expect(result).toBeFalsy();
    });

    it('should return false if currentSelectedTemplateId has no minus gridConfig item', () => {
      const result = shouldLoadDefaultLayoutWidgets(
        [
          {
            id: '123',
            isEditable: false,
            name: 'any name',
            widgetConfig: [],
            gridConfig: [
              [0, 1, 2],
              [0, 1, 2],
            ],
          },
        ],
        '123',
      );
      expect(result).toBeFalsy();
    });

    it('should return true if currentSelectedTemplateId has minus gridConfig item', () => {
      const result = shouldLoadDefaultLayoutWidgets(
        [
          {
            id: '123',
            isEditable: false,
            name: 'any name',
            widgetConfig: [],
            gridConfig: [
              [1, 2, -3],
              [1, 2, 3],
            ],
          },
        ],
        '123',
      );
      expect(result).toBeTruthy();
    });
  });

  describe('is current widget index to load a small and large version', () => {
    // layout OneRowThreeWidgets
    it('should return false if layout is OneRowThreeWidgets and not matter what index', () => {
      const resultOne = isWidgetSmallVersion(0, WidgetLayoutEnum.OneRowThreeWidgets);
      const resultTwo = isWidgetSmallVersion(1, WidgetLayoutEnum.OneRowThreeWidgets);
      const resultThree = isWidgetSmallVersion(2, WidgetLayoutEnum.OneRowThreeWidgets);
      expect([resultOne, resultTwo, resultThree].every((x) => x)).toBeFalsy();
    });
    it('should return true if layout is OneRowThreeWidgets and not matter what index', () => {
      const resultOne = isWidgetLargeVersion(0, WidgetLayoutEnum.OneRowThreeWidgets);
      const resultTwo = isWidgetLargeVersion(1, WidgetLayoutEnum.OneRowThreeWidgets);
      const resultThree = isWidgetLargeVersion(2, WidgetLayoutEnum.OneRowThreeWidgets);
      expect([resultOne, resultTwo, resultThree].every((x) => x)).toBeTruthy();
    });
    // layout OneRowFourWidgets
    it('should return true if layout is OneRowFourWidgets index > 1', () => {
      const resultOne = isWidgetSmallVersion(2, WidgetLayoutEnum.OneRowFourWidgets);
      const resultTwo = isWidgetSmallVersion(3, WidgetLayoutEnum.OneRowFourWidgets);
      expect([resultOne, resultTwo].every((x) => x)).toBeTruthy();
    });
    it('should return false if layout is OneRowFourWidgets index > 1', () => {
      const resultOne = isWidgetLargeVersion(2, WidgetLayoutEnum.OneRowFourWidgets);
      const resultTwo = isWidgetLargeVersion(3, WidgetLayoutEnum.OneRowFourWidgets);
      expect([resultOne, resultTwo].every((x) => x)).toBeFalsy();
    });
    it('should return false if layout is OneRowFourWidgets index < 2', () => {
      const resultOne = isWidgetSmallVersion(0, WidgetLayoutEnum.OneRowFourWidgets);
      const resultTwo = isWidgetSmallVersion(1, WidgetLayoutEnum.OneRowFourWidgets);
      expect(resultOne).toBeFalsy();
      expect(resultTwo).toBeFalsy();
    });
    it('should return true if layout is OneRowFourWidgets index < 2', () => {
      const resultOne = isWidgetLargeVersion(0, WidgetLayoutEnum.OneRowFourWidgets);
      const resultTwo = isWidgetLargeVersion(1, WidgetLayoutEnum.OneRowFourWidgets);
      expect([resultOne, resultTwo].every((x) => x)).toBeTruthy();
    });

    // layout OneRowFiveWidgets
    it('should return false if layout is OneRowFiveWidgets index = 0', () => {
      const resultOne = isWidgetSmallVersion(0, WidgetLayoutEnum.OneRowFiveWidgets);
      expect(resultOne).toBeFalsy();
    });
    it('should return true if layout is OneRowFiveWidgets index = 0', () => {
      const resultOne = isWidgetLargeVersion(0, WidgetLayoutEnum.OneRowFiveWidgets);
      expect(resultOne).toBeTruthy();
    });

    it('should return true if layout is OneRowFiveWidgets index > 0', () => {
      const resultOne = isWidgetSmallVersion(1, WidgetLayoutEnum.OneRowFiveWidgets);
      const resultTwo = isWidgetSmallVersion(2, WidgetLayoutEnum.OneRowFiveWidgets);
      const resultThree = isWidgetSmallVersion(3, WidgetLayoutEnum.OneRowFiveWidgets);
      const resultFour = isWidgetSmallVersion(4, WidgetLayoutEnum.OneRowFiveWidgets);
      expect([resultOne, resultTwo, resultThree, resultFour].every((x) => x)).toBeTruthy();
    });
    it('should return false if layout is OneRowFiveWidgets index > 0', () => {
      const resultOne = isWidgetLargeVersion(1, WidgetLayoutEnum.OneRowFiveWidgets);
      const resultTwo = isWidgetLargeVersion(2, WidgetLayoutEnum.OneRowFiveWidgets);
      const resultThree = isWidgetLargeVersion(3, WidgetLayoutEnum.OneRowFiveWidgets);
      const resultFour = isWidgetLargeVersion(4, WidgetLayoutEnum.OneRowFiveWidgets);
      expect([resultOne, resultTwo, resultThree, resultFour].every((x) => x)).toBeFalsy();
    });

    it('should return true if layout is TwoRowsSixWidgets and not matter what index', () => {
      const resultOne = isWidgetSmallVersion(0, WidgetLayoutEnum.TwoRowsSixWidgets);
      const resultTwo = isWidgetSmallVersion(1, WidgetLayoutEnum.TwoRowsSixWidgets);
      const resultThree = isWidgetSmallVersion(2, WidgetLayoutEnum.TwoRowsSixWidgets);
      const resultFour = isWidgetSmallVersion(3, WidgetLayoutEnum.TwoRowsSixWidgets);
      const resultFive = isWidgetSmallVersion(4, WidgetLayoutEnum.TwoRowsSixWidgets);
      const resultSix = isWidgetSmallVersion(5, WidgetLayoutEnum.TwoRowsSixWidgets);
      expect(
        [resultOne, resultTwo, resultThree, resultFour, resultFive, resultSix].every((x) => x),
      ).toBeTruthy();
    });
    it('should return false if layout is TwoRowsSixWidgets and not matter what index', () => {
      const resultOne = isWidgetLargeVersion(0, WidgetLayoutEnum.TwoRowsSixWidgets);
      const resultTwo = isWidgetLargeVersion(1, WidgetLayoutEnum.TwoRowsSixWidgets);
      const resultThree = isWidgetLargeVersion(2, WidgetLayoutEnum.TwoRowsSixWidgets);
      const resultFour = isWidgetLargeVersion(3, WidgetLayoutEnum.TwoRowsSixWidgets);
      const resultFive = isWidgetLargeVersion(4, WidgetLayoutEnum.TwoRowsSixWidgets);
      const resultSix = isWidgetLargeVersion(5, WidgetLayoutEnum.TwoRowsSixWidgets);
      expect(
        [resultOne, resultTwo, resultThree, resultFour, resultFive, resultSix].every((x) => x),
      ).toBeFalsy();
    });
  });

  describe('get gridConfig from a convertedIndex', () => {
    it('should return correct gridConfig for a 3 widgets layout', () => {
      const gridConfig1 = getGridConfigFromConvertedIndexConfig(
        0,
        gridConfig3Widgets,
        WidgetLayoutEnum.OneRowThreeWidgets,
      );
      expect(gridConfig1).toEqual([
        [0, 1, 2],
        [0, 1, 2],
      ]);
      const gridConfig2 = getGridConfigFromConvertedIndexConfig(
        1,
        gridConfig3Widgets,
        WidgetLayoutEnum.OneRowThreeWidgets,
      );
      expect(gridConfig2).toEqual([
        [0, 1, 2],
        [0, 1, 2],
      ]);
      const gridConfig3 = getGridConfigFromConvertedIndexConfig(
        2,
        gridConfig3Widgets,
        WidgetLayoutEnum.OneRowThreeWidgets,
      );
      expect(gridConfig3).toEqual([
        [0, 1, 2],
        [0, 1, 2],
      ]);
    });
    it('should return correct gridConfig for a 4 widgets layout', () => {
      const gridConfig1 = getGridConfigFromConvertedIndexConfig(
        0,
        gridConfig4Widgets,
        WidgetLayoutEnum.OneRowFourWidgets,
      );
      expect(gridConfig1).toEqual([
        [0, 1, 2],
        [0, 1, 3],
      ]);
      const gridConfig2 = getGridConfigFromConvertedIndexConfig(
        1,
        gridConfig4Widgets,
        WidgetLayoutEnum.OneRowFourWidgets,
      );
      expect(gridConfig2).toEqual([
        [0, 1, 2],
        [0, 1, 3],
      ]);
      const gridConfig3 = getGridConfigFromConvertedIndexConfig(
        2,
        gridConfig4Widgets,
        WidgetLayoutEnum.OneRowFourWidgets,
      );
      expect(gridConfig3).toEqual([
        [0, 1, 2],
        [0, 1, 3],
      ]);
      const gridConfig4 = getGridConfigFromConvertedIndexConfig(
        3,
        gridConfig4Widgets,
        WidgetLayoutEnum.OneRowFourWidgets,
      );
      expect(gridConfig4).toEqual([
        [0, 1, 2],
        [0, 1, 3],
      ]);
    });
    it('should return correct gridConfig for a 5 widgets layout', () => {
      const gridConfig1 = getGridConfigFromConvertedIndexConfig(
        0,
        gridConfig5Widgets,
        WidgetLayoutEnum.OneRowFiveWidgets,
      );
      expect(gridConfig1).toEqual([
        [0, 1, 2],
        [0, 3, 4],
      ]);
      const gridConfig2 = getGridConfigFromConvertedIndexConfig(
        1,
        gridConfig5Widgets,
        WidgetLayoutEnum.OneRowFiveWidgets,
      );
      expect(gridConfig2).toEqual([
        [0, 1, 2],
        [0, 3, 4],
      ]);
      const gridConfig3 = getGridConfigFromConvertedIndexConfig(
        2,
        gridConfig5Widgets,
        WidgetLayoutEnum.OneRowFiveWidgets,
      );
      expect(gridConfig3).toEqual([
        [0, 1, 2],
        [0, 3, 4],
      ]);
      const gridConfig4 = getGridConfigFromConvertedIndexConfig(
        3,
        gridConfig5Widgets,
        WidgetLayoutEnum.OneRowFiveWidgets,
      );
      expect(gridConfig4).toEqual([
        [0, 1, 2],
        [0, 3, 4],
      ]);
      const gridConfig5 = getGridConfigFromConvertedIndexConfig(
        4,
        gridConfig5Widgets,
        WidgetLayoutEnum.OneRowFiveWidgets,
      );
      expect(gridConfig5).toEqual([
        [0, 1, 2],
        [0, 3, 4],
      ]);
    });
    it('should return correct gridConfig for a 6 widgets layout', () => {
      const gridConfig1 = getGridConfigFromConvertedIndexConfig(
        0,
        gridConfig6Widgets,
        WidgetLayoutEnum.TwoRowsSixWidgets,
      );
      expect(gridConfig1).toEqual([
        [0, 1, 2],
        [3, 4, 5],
      ]);
      const gridConfig2 = getGridConfigFromConvertedIndexConfig(
        1,
        gridConfig6Widgets,
        WidgetLayoutEnum.TwoRowsSixWidgets,
      );
      expect(gridConfig2).toEqual([
        [0, 1, 2],
        [3, 4, 5],
      ]);
      const gridConfig3 = getGridConfigFromConvertedIndexConfig(
        2,
        gridConfig6Widgets,
        WidgetLayoutEnum.TwoRowsSixWidgets,
      );
      expect(gridConfig3).toEqual([
        [0, 1, 2],
        [3, 4, 5],
      ]);
      const gridConfig4 = getGridConfigFromConvertedIndexConfig(
        3,
        gridConfig6Widgets,
        WidgetLayoutEnum.TwoRowsSixWidgets,
      );
      expect(gridConfig4).toEqual([
        [0, 1, 2],
        [3, 4, 5],
      ]);
      const gridConfig5 = getGridConfigFromConvertedIndexConfig(
        4,
        gridConfig6Widgets,
        WidgetLayoutEnum.TwoRowsSixWidgets,
      );
      expect(gridConfig5).toEqual([
        [0, 1, 2],
        [3, 4, 5],
      ]);
      const gridConfig6 = getGridConfigFromConvertedIndexConfig(
        5,
        gridConfig6Widgets,
        WidgetLayoutEnum.TwoRowsSixWidgets,
      );
      expect(gridConfig6).toEqual([
        [0, 1, 2],
        [3, 4, 5],
      ]);
    });
  });

  describe('are current and next gridConfig equal', () => {
    it('should return true for 3 widgets', () => {
      const currentWidgetConfig = [
        {
          key: WidgetsLoaderEnum.Safeguards,
        },
        {
          key: WidgetsLoaderEnum.Cutting,
        },
        {
          key: WidgetsLoaderEnum.Ecd,
        },
      ];
      const nextWidgetConfig = [
        {
          key: WidgetsLoaderEnum.Safeguards,
        },
        {
          key: WidgetsLoaderEnum.Cutting,
        },
        {
          key: WidgetsLoaderEnum.Ecd,
        },
      ];
      const result = areWidgetConfigsEqual(currentWidgetConfig, nextWidgetConfig);
      expect(result).toBeTruthy();
    });
    it('should return true for 4 widgets', () => {
      const currentWidgetConfig = [
        {
          key: WidgetsLoaderEnum.Safeguards,
        },
        {
          key: WidgetsLoaderEnum.Cutting,
        },
        {
          key: WidgetsLoaderEnum.Ecd,
        },
        {
          key: WidgetsLoaderEnum.Wellbore,
        },
      ];
      const nextWidgetConfig = [
        {
          key: WidgetsLoaderEnum.Safeguards,
        },
        {
          key: WidgetsLoaderEnum.Cutting,
        },
        {
          key: WidgetsLoaderEnum.Ecd,
        },
        {
          key: WidgetsLoaderEnum.Wellbore,
        },
      ];
      const result = areWidgetConfigsEqual(currentWidgetConfig, nextWidgetConfig);
      expect(result).toBeTruthy();
    });
    it('should return true for 5 widgets', () => {
      const currentWidgetConfig = [
        {
          key: WidgetsLoaderEnum.Safeguards,
        },
        {
          key: WidgetsLoaderEnum.Cutting,
        },
        {
          key: WidgetsLoaderEnum.Ecd,
        },
        {
          key: WidgetsLoaderEnum.Wellbore,
        },
        {
          key: WidgetsLoaderEnum.Unsettled,
        },
      ];
      const nextWidgetConfig = [
        {
          key: WidgetsLoaderEnum.Safeguards,
        },
        {
          key: WidgetsLoaderEnum.Cutting,
        },
        {
          key: WidgetsLoaderEnum.Ecd,
        },
        {
          key: WidgetsLoaderEnum.Wellbore,
        },
        {
          key: WidgetsLoaderEnum.Unsettled,
        },
      ];
      const result = areWidgetConfigsEqual(currentWidgetConfig, nextWidgetConfig);
      expect(result).toBeTruthy();
    });
    it('should return true for 6 widgets', () => {
      const currentWidgetConfig = [
        {
          key: WidgetsLoaderEnum.Safeguards,
        },
        {
          key: WidgetsLoaderEnum.Cutting,
        },
        {
          key: WidgetsLoaderEnum.Ecd,
        },
        {
          key: WidgetsLoaderEnum.Wellbore,
        },
        {
          key: WidgetsLoaderEnum.Unsettled,
        },
        {
          key: WidgetsLoaderEnum.Unsettled,
        },
      ];
      const nextWidgetConfig = [
        {
          key: WidgetsLoaderEnum.Safeguards,
        },
        {
          key: WidgetsLoaderEnum.Cutting,
        },
        {
          key: WidgetsLoaderEnum.Ecd,
        },
        {
          key: WidgetsLoaderEnum.Wellbore,
        },
        {
          key: WidgetsLoaderEnum.Unsettled,
        },
        {
          key: WidgetsLoaderEnum.Unsettled,
        },
      ];
      const result = areWidgetConfigsEqual(currentWidgetConfig, nextWidgetConfig);
      expect(result).toBeTruthy();
    });
    it('should return false for 3 widgets', () => {
      const currentWidgetConfig = [
        {
          key: WidgetsLoaderEnum.Safeguards,
        },
        {
          key: WidgetsLoaderEnum.Cutting,
        },
        {
          key: WidgetsLoaderEnum.Ecd,
        },
      ];
      const nextWidgetConfig = [
        {
          key: WidgetsLoaderEnum.Safeguards,
        },
        {
          key: WidgetsLoaderEnum.Cutting,
        },
        {
          key: WidgetsLoaderEnum.Wellbore,
        },
      ];
      const result = areWidgetConfigsEqual(currentWidgetConfig, nextWidgetConfig);
      expect(result).toBeFalsy();
    });
    it('should return false for 4 widgets', () => {
      const currentWidgetConfig = [
        {
          key: WidgetsLoaderEnum.Safeguards,
        },
        {
          key: WidgetsLoaderEnum.Cutting,
        },
        {
          key: WidgetsLoaderEnum.Ecd,
        },
        {
          key: WidgetsLoaderEnum.Wellbore,
        },
      ];
      const nextWidgetConfig = [
        {
          key: WidgetsLoaderEnum.Safeguards,
        },
        {
          key: WidgetsLoaderEnum.Cutting,
        },
        {
          key: WidgetsLoaderEnum.Wellbore,
        },
        {
          key: WidgetsLoaderEnum.Ecd,
        },
      ];
      const result = areWidgetConfigsEqual(currentWidgetConfig, nextWidgetConfig);
      expect(result).toBeFalsy();
    });
    it('should return false for 5 widgets', () => {
      const currentWidgetConfig = [
        {
          key: WidgetsLoaderEnum.Safeguards,
        },
        {
          key: WidgetsLoaderEnum.Ecd,
        },
        {
          key: WidgetsLoaderEnum.Cutting,
        },
        {
          key: WidgetsLoaderEnum.Wellbore,
        },
        {
          key: WidgetsLoaderEnum.Unsettled,
        },
      ];
      const nextWidgetConfig = [
        {
          key: WidgetsLoaderEnum.Safeguards,
        },
        {
          key: WidgetsLoaderEnum.Cutting,
        },
        {
          key: WidgetsLoaderEnum.Ecd,
        },
        {
          key: WidgetsLoaderEnum.Wellbore,
        },
        {
          key: WidgetsLoaderEnum.Unsettled,
        },
      ];
      const result = areWidgetConfigsEqual(currentWidgetConfig, nextWidgetConfig);
      expect(result).toBeFalsy();
    });
    it('should return false for 6 widgets', () => {
      const currentWidgetConfig = [
        {
          key: WidgetsLoaderEnum.Safeguards,
        },
        {
          key: WidgetsLoaderEnum.Cutting,
        },
        {
          key: WidgetsLoaderEnum.Unsettled,
        },
        {
          key: WidgetsLoaderEnum.Unsettled,
        },
        {
          key: WidgetsLoaderEnum.Ecd,
        },
        {
          key: WidgetsLoaderEnum.Wellbore,
        },
      ];
      const nextWidgetConfig = [
        {
          key: WidgetsLoaderEnum.Safeguards,
        },
        {
          key: WidgetsLoaderEnum.Cutting,
        },
        {
          key: WidgetsLoaderEnum.Ecd,
        },
        {
          key: WidgetsLoaderEnum.Wellbore,
        },
        {
          key: WidgetsLoaderEnum.Unsettled,
        },
        {
          key: WidgetsLoaderEnum.Unsettled,
        },
      ];
      const result = areWidgetConfigsEqual(currentWidgetConfig, nextWidgetConfig);
      expect(result).toBeFalsy();
    });

    it('should return false if number of items in each array are not equal', () => {
      const currentWidgetConfig = [
        {
          key: WidgetsLoaderEnum.Safeguards,
        },
        {
          key: WidgetsLoaderEnum.Cutting,
        },
        {
          key: WidgetsLoaderEnum.Ecd,
        },
        {
          key: WidgetsLoaderEnum.Wellbore,
        },
      ];
      const nextWidgetConfig = [
        {
          key: WidgetsLoaderEnum.Safeguards,
        },
        {
          key: WidgetsLoaderEnum.Cutting,
        },
        {
          key: WidgetsLoaderEnum.Ecd,
        },
      ];
      const result = areWidgetConfigsEqual(currentWidgetConfig, nextWidgetConfig);
      expect(result).toBeFalsy();
    });
  });
  describe('areTemplateIdsEqual', () => {
    it('should return true when both template id are equal', () => {
      const result = areTemplateIdsEqual({
        prevSelectedTemplateId: '1',
        currentSelectedTemplateId: '1',
      });
      expect(result).toBeTruthy();
    });
    it('should return false when both template id are not equal', () => {
      const result = areTemplateIdsEqual({
        prevSelectedTemplateId: '2',
        currentSelectedTemplateId: '1',
      });
      expect(result).toBeFalsy();
    });
  });

  describe('isTemplateEmpty', () => {
    it('should return true', () => {
      const result = isTemplateEmpty([-1, -2, -3]);
      expect(result).toBeTruthy();
    });
    it('should return false', () => {
      const result = isTemplateEmpty([-1, -2, 3]);
      expect(result).toBeFalsy();
    });
    it('should return false', () => {
      const result = isTemplateEmpty([]);
      expect(result).toBeTruthy();
    });
  });
});
