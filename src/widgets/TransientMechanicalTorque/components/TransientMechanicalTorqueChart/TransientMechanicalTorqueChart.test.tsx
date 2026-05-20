import React from 'react';
import * as MOCKEDDATA from '@dt-advisory/helpers/tests/mockedData/transientMechanicalTorque/mockedData.json';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import ConfigsProvider from '@dt-advisory/providers/Configs';
import NoStreamingTimerChartGroupProvider from '@dt-advisory/providers/NoStreamingTimerChartGroup';
import ReconnectingChartGroupProvider from '@dt-advisory/providers/ReconnectingChartGroup';
import TransientMechanicalTorqueChart, {
  TransientMechanicalTorquePropsType,
} from './TransientMechanicalTorqueChart';

describe('TransientMechanicalTorqueChart', () => {
  const mockedProps: TransientMechanicalTorquePropsType = {
    data: MOCKEDDATA,
    numOfTicks: 5,
  };

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <ConfigsProvider>
        <ReconnectingChartGroupProvider>
          <NoStreamingTimerChartGroupProvider>
            <TransientMechanicalTorqueChart {...mockedProps} />,
          </NoStreamingTimerChartGroupProvider>
        </ReconnectingChartGroupProvider>
      </ConfigsProvider>,
    );

    expect(getByTestId('TransientMechanicalTorque-cartesian_graph')).toBeInTheDocument();
  });

  it('should render area component color is #D0D1D2 when isactive is true', () => {
    const { container } = renderWithThemeAndLocaleProviders(
      <ConfigsProvider>
        <ReconnectingChartGroupProvider>
          <NoStreamingTimerChartGroupProvider>
            <TransientMechanicalTorqueChart {...mockedProps} inactive={true} />,
          </NoStreamingTimerChartGroupProvider>
        </ReconnectingChartGroupProvider>
      </ConfigsProvider>,
    );

    const linearGradient = container.querySelector('#torsional-limit-area-light');

    const stopPot = linearGradient?.querySelector('stop');

    expect(stopPot?.getAttribute('stop-color')).toMatch('#D0D1D2');
  });

  it('should render area component color is #D0D1D2 when isactive is false', () => {
    const { container } = renderWithThemeAndLocaleProviders(
      <ConfigsProvider>
        <ReconnectingChartGroupProvider>
          <NoStreamingTimerChartGroupProvider>
            <TransientMechanicalTorqueChart {...mockedProps} />,
          </NoStreamingTimerChartGroupProvider>
        </ReconnectingChartGroupProvider>
      </ConfigsProvider>,
    );

    const linearGradient = container.querySelector('#torsional-limit-area-light');

    const stopPot = linearGradient?.querySelector('stop');

    expect(stopPot?.getAttribute('stop-color')).toMatch('#E5EBF1');
  });
});
