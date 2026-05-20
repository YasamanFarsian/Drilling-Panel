import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import mockedData from '@dt-advisory/helpers/tests/mockedData/roadmap/patch.mock.json';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import { useJsonPatch } from '@dt-advisory/widgets/hooks/useJsonPatch';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { useRoadmapTorqueChart } from '../../hooks/useRoadmapTorqueChart';
import {
  defaultRoadmapTorqueValues,
  jsonpatchDefaultRoadmapTorqueValues,
} from '../../RoadmapTorqueConstants';
import { RoadmapTorqueType } from '../../RoadmapTorqueTypes';
import RoadmapTorqueChart from './RoadmapTorqueChart';

describe('RoadmapTorqueChart', () => {
  it('should render without crashing', () => {
    const { result: patchedData } = renderHook(() =>
      useJsonPatch(mockedData as any, jsonpatchDefaultRoadmapTorqueValues, true),
    );
    const roadmapTorqueData: RoadmapTorqueType = {
      operationId: defaultRoadmapTorqueValues.operationId,
      lastUpdated: defaultRoadmapTorqueValues.lastUpdated,
      currentTime: defaultRoadmapTorqueValues.currentTime,
      data: patchedData.current ?? defaultRoadmapTorqueValues.data,
      isLive: true,
    };
    const { result: widgetData } = renderHook(() =>
      useRoadmapTorqueChart({ roadmapTorqueData, widgetId: '123', numOfTicks: 5 }),
    );
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <RoadmapTorqueChart data={widgetData.current} isSmallVersion={false} hideAxisLabel={false} />,
    );
    expect(getByTestId(WidgetsLoaderEnum.RoadmapTorque + '-cartesian_graph')).toBeInTheDocument();
  });
});
