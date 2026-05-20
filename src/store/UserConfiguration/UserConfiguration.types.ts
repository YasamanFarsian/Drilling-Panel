/**
 *
 * Default User Configuration Types
 *
 * */

export enum HeaderProperties {
  rigName = 'rigName',
  wellName = 'wellName',
  section = 'section',
  mpdStatus = 'mpdStatus', // drilling method
}

export type WidgetConfigType = {
  key: WidgetsLoaderEnum;
  widgetConfig?: {
    hasSmallVersion?: boolean;
    hasLargeVersion?: boolean;
    widgetId: string;
    noConnectionTimerLimit?: number;
  };
};

export type GridConfigType = number[][];

export type UnitConfigType = {
  gmtTimeZone: number; // GMT + or - 12
  clockIn24h: boolean;
  temparatureUnit: 'celcius' | 'fahrenheit';
  useImperialForDistance: boolean;
  useImperialForWeight: boolean;
};

export enum AppearanceEnum {
  AUTO = 'auto',
  LIGHT = 'light',
  DARK = 'dark',
}

export type WarningsTypeType = {
  snoozeFor: number;
};

export type DefaultUserConfigurationType = {
  availableHeaderProperties: HeaderProperties[];
  headerConfig: Partial<HeaderProperties>[];
  gridConfig: GridConfigType;
  widgetConfig: WidgetConfigType[];
  unitConfig: UnitConfigType;
  appearance: { mode: AppearanceEnum };
  warnings: WarningsTypeType;
  layouts: TemplateToSaveType[];
  widgetCatalog: WidgetConfigType[];
  prevSelectedTemplateId: string;
};

/**
 *
 * Custom User Configuration Types
 *
 * */
export type ConvertedGridConfigType = number[];

export type QueryStringWidgetType =
  | 'cutting'
  | 'ecd'
  | 'wellbore'
  | 'drillability'
  | 'transientmechanicaldrag'
  | 'transientmechanicaltorque'
  | 'sekalhalliburtonlimit'
  | 'smartautorop'
  | 'roadmapdrag'
  | 'roadmaptorque';

// This enum is used to load widgets lazily from API/local storage/envConfig - Values must match filename
// Everytime we add a new widget we need to update this enum
export enum WidgetsLoaderEnum {
  Unsettled = 'Unsettled',

  Cutting = 'Cutting',
  Ecd = 'Ecd',
  Wellbore = 'Wellbore',
  Drillability = 'Drillability',
  TransientMechanicalDrag = 'TransientMechanicalDrag',
  TransientMechanicalTorque = 'TransientMechanicalTorque',
  SekalHalliburtonLimit = 'SekalHalliburtonLimit',
  SmartAutoRop = 'SmartAutoRop',
  RoadmapDrag = 'RoadmapDrag',
  RoadmapTorque = 'RoadmapTorque',
}

export enum WidgetLayoutEnum {
  OneRowOneWidget = 'OneRowOneWidget',
  OneRowThreeWidgets = 'OneRowThreeWidgets',
  OneRowFourWidgets = 'OneRowFourWidgets',
  OneRowFiveWidgets = 'OneRowFiveWidgets',
  TwoRowsSixWidgets = 'TwoRowsSixWidgets',
}

export type TemplateBodyType = {
  name: string;
  isEditable: boolean;
  gridConfig: GridConfigType;
  widgetConfig: WidgetConfigType[];
};

export type TemplateToSaveType = {
  id: string;
} & TemplateBodyType;
