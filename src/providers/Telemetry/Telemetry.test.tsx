import { render } from '@testing-library/react';
import React from 'react';
import ConfigsProvider from '@dt-advisory/providers/Configs';
import TelemetryProvider from './Telemetry';

describe('EmulatorProvider', () => {
  it('should render EmulatorProvider without crashing', () => {
    render(
      <ConfigsProvider>
        <TelemetryProvider>
          <div />
        </TelemetryProvider>
      </ConfigsProvider>,
    );
  });
});
