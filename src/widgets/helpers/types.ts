import { DataHubType, HostProviderType } from '@dt-advisory/host-poc/HostJsonProvider';
import { UnitsConfiguration } from '@dt-advisory/api/units/units.types';
import { UseWebSocketPropsType } from '@dt-advisory/widgets/hooks/useWebSocket';

export type MechanicalProfileType = {
  MD: number;
  tension: number;
  bucklingLimit: number;
  tensileLimit: number;
  torsionalLimit: number;
  torque: number;
};

export type AreaType = {
  x: number;
  y: number;
};

export type LineType = {
  x: number;
  y: number;
};

export type CoordinatesType = {
  x: number;
  y: number;
};

export type Domain = {
  x: number;
  y: number;
};

export type BasicValueType = {
  md: number;
  val: number;
};

export type BasicMinMaxValueType = {
  md: number;
  max: number;
  min: number;
};

export type DotsType = {
  dotsLeft: BasicValueType[];
  dotsCenter: BasicValueType[];
  dotsRight: BasicValueType[];
};

export type ADVWidgetType = {
  HostDataProvider: React.ComponentType<any>;
  useHostDataProvider: <T extends DataHubType>() => HostProviderType<T>;
  numOfTicks?: number;
  isSmallVersion?: boolean;
  isLargeVersion?: boolean;
  widgetId: string;
  noConnectionTimerLimit?: number;
  hostOperationId?: string;
  unitsSettings?: UnitsConfiguration;
  enableTooltips?: boolean;
} & Pick<UseWebSocketPropsType, 'getTokenFormHost' | 'webSocketUrlFromHost'>;
