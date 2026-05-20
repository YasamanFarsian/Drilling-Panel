import roadmapTorqueStyleConstants from '@dt-advisory/styles/roadmapTorqueStyleConstants';
import { ThemeMode } from '@dt-advisory/styles/theme';
import { ConvertedRoadmapTorqueWidgetType } from '../../RoadmapTorqueTypes';

export const getListOfLines = (data: ConvertedRoadmapTorqueWidgetType, mode: ThemeMode) => {
  const linesData = [
    {
      data: data.currentData.line0,
      label: '0.0',
      lineColor: roadmapTorqueStyleConstants.legend.frictions[mode],
    },
    {
      data: data.currentData.line12,
      label: '0.12',
      lineColor: roadmapTorqueStyleConstants.legend.frictions[mode],
    },
    {
      data: data.currentData.line22,
      label: '0.22',
      lineColor: roadmapTorqueStyleConstants.legend.frictions[mode],
    },
    {
      data: data.currentData.line32,
      label: '0.32',
      lineColor: roadmapTorqueStyleConstants.legend.frictions[mode],
    },
    {
      data: data.currentData.line42,
      label: '0.42',
      lineColor: roadmapTorqueStyleConstants.legend.frictions[mode],
    },
  ];

  return linesData;
};
