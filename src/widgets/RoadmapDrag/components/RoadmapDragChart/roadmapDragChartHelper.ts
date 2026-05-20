import roadmapDragStyleConstants from '@dt-advisory/styles/roadmapDragStyleConstants';
import { ThemeMode } from '@dt-advisory/styles/theme';
import { ConvertedRoadmapDragWidgetType } from '../../RoadmapDragTypes';

export const getListOfLines = (data: ConvertedRoadmapDragWidgetType, mode: ThemeMode) => {
  const linesData = [
    {
      data: data.currentData.line0,
      label: '0.0',
      lineColor: roadmapDragStyleConstants.legend.FRWFrictions[mode],
      localeKey: 'widget.roadmap.legend.FRWFrictions.text',
    },
    {
      data: data.currentData.line12Left,
      label: '0.12',
      lineColor: roadmapDragStyleConstants.legend.slackoffFrictions[mode],
      localeKey: 'widget.roadmap.legend.slackoffFrictions.text',
    },
    {
      data: data.currentData.line22Left,
      label: '0.22',
      lineColor: roadmapDragStyleConstants.legend.slackoffFrictions[mode],
      localeKey: 'widget.roadmap.legend.slackoffFrictions.text',
    },
    {
      data: data.currentData.line32Left,
      label: '0.32',
      lineColor: roadmapDragStyleConstants.legend.slackoffFrictions[mode],
      localeKey: 'widget.roadmap.legend.slackoffFrictions.text',
    },
    {
      data: data.currentData.line42Left,
      label: '0.42',
      lineColor: roadmapDragStyleConstants.legend.slackoffFrictions[mode],
      localeKey: 'widget.roadmap.legend.slackoffFrictions.text',
    },
    {
      data: data.currentData.line12Right,
      label: '0.12',
      lineColor: roadmapDragStyleConstants.legend.pickupFrictions[mode],
      localeKey: 'widget.roadmap.legend.pickupFrictions.text',
    },
    {
      data: data.currentData.line22Right,
      label: '0.22',
      lineColor: roadmapDragStyleConstants.legend.pickupFrictions[mode],
      localeKey: 'widget.roadmap.legend.pickupFrictions.text',
    },
    {
      data: data.currentData.line32Right,
      label: '0.32',
      lineColor: roadmapDragStyleConstants.legend.pickupFrictions[mode],
      localeKey: 'widget.roadmap.legend.pickupFrictions.text',
    },
    {
      data: data.currentData.line42Right,
      label: '0.42',
      lineColor: roadmapDragStyleConstants.legend.pickupFrictions[mode],
      localeKey: 'widget.roadmap.legend.pickupFrictions.text',
    },
  ];

  return linesData;
};
