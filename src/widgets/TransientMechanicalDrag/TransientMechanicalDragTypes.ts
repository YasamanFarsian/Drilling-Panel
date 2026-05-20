import { MechanicalProfileType } from '@dt-advisory/widgets/helpers/types';

export type TransientMechanicalDragType = {
  operationId: string;
  lastUpdated: string;
  lastCasingDepth: number | null; // same as casingShoeDepth
  bitDepth: number | null;
  mechanicalProfiles: Omit<MechanicalProfileType, 'torsionalLimit' | 'torque'>[] | null;
  currentTime: string;
  maxYdomain: number | null;
  minYdomain: number | null;
  isLive: boolean | null;
};
