export const mockdeDataCurrentUserConfig = {
  availableHeaderProperties: ['rigName', 'wellName', 'section', 'mpdStatus'],
  headerConfig: ['rigName', 'wellName', 'section', 'mpdStatus'],
  gridConfig: [
    [0, 1, 2],
    [0, 1, 3],
  ],
  widgetConfig: [
    {
      key: 'Ecd',
    },
    {
      key: 'Cutting',
    },
    {
      key: 'Wellbore',
    },
  ],
  layouts: [
    {
      id: '1',
      name: 'Sekal Dev',
      isEditable: false,
      gridConfig: [
        [0, 1, 2],
        [0, 1, 2],
      ],
      widgetConfig: [
        {
          key: 'Cutting',
        },
        {
          key: 'Ecd',
        },
      ],
    },
    {
      id: '2',
      name: 'Template 4',
      isEditable: false,
      gridConfig: [
        [0, 1, 2],
        [0, 1, 3],
      ],
      widgetConfig: [
        {
          key: 'Ecd',
        },
        {
          key: 'Cutting',
        },
        {
          key: 'Wellbore',
        },
      ],
    },
    {
      id: '3',
      name: 'Template 5',
      isEditable: false,
      gridConfig: [
        [0, 1, 3],
        [0, 2, -1],
      ],
      widgetConfig: [
        {
          key: 'Ecd',
        },
        {
          key: 'Cutting',
        },
        {
          key: 'Wellbore',
        },
      ],
    },
    {
      id: '4',
      name: 'Template 6',
      isEditable: false,
      gridConfig: [
        [0, 2, -2],
        [1, -1, -3],
      ],
      widgetConfig: [
        {
          key: 'Ecd',
        },
        {
          key: 'Cutting',
        },
        {
          key: 'Wellbore',
        },
      ],
    },
  ],
  widgetCatalog: [
    {
      key: 'Cutting',
      widgetConfig: {
        hasSmallVersion: true,
      },
    },
    {
      key: 'Ecd',
      widgetConfig: {
        hasSmallVersion: true,
      },
    },
    {
      key: 'Wellbore',
      widgetConfig: {
        hasSmallVersion: true,
      },
    },
  ],
  unitConfig: {
    gmtTimeZone: 7,
    clockIn24h: false,
    temparatureUnit: 'celcius',
    useImperialForDistance: false,
    useImperialForWeight: false,
  },
  appearance: {
    mode: 'auto',
  },
  warnings: {
    snoozeFor: 120,
  },
  prevSelectedTemplateId: '2',
};
