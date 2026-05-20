import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import mockedData from '@dt-advisory/helpers/tests/mockedData/roadmap/patch.mock.json';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { useJsonPatch } from '@dt-advisory/widgets/hooks/useJsonPatch';
import { useRoadmapDragChart } from '../../hooks/useRoadmapDragChart';
import {
  defaultRoadmapDragValues,
  jsonPatchDefaultRoadmapDragValues,
} from '../../RoadmapDragConstants';
import { RoadmapDragType } from '../../RoadmapDragTypes';
import RoadmapDragChart from './RoadmapDragChart';

describe('RoadmapDragChart', () => {
  it('should render without crashing', async () => {
    const { result: patchedData } = renderHook(() =>
      useJsonPatch(mockedData as any, jsonPatchDefaultRoadmapDragValues, true),
    );
    const roadmapDragData: RoadmapDragType = {
      operationId: defaultRoadmapDragValues.operationId,
      lastUpdated: defaultRoadmapDragValues.lastUpdated,
      currentTime: defaultRoadmapDragValues.currentTime,
      data: patchedData.current ?? defaultRoadmapDragValues.data,
      isLive: false,
    };
    const { result: widgetData } = renderHook(() =>
      useRoadmapDragChart({ roadmapDragData, widgetId: '123', numOfTicks: 5 }),
    );

    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <RoadmapDragChart data={widgetData.current} isSmallVersion={false} hideAxisLabel={false} />,
    );
    expect(getByTestId(WidgetsLoaderEnum.RoadmapDrag + '-cartesian_graph')).toBeInTheDocument();
  });
});
