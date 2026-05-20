import { AppInsightsErrorBoundary } from '@microsoft/applicationinsights-react-js';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@dt-advisory/components/ErrorFallback';
import ErrorFallbackForComponent from '@dt-advisory/components/ErrorFallbackForComponent';
import TelemetryService from '@dt-advisory/services/Telemetry';

type ErrorBoundaryProviderPropsType = {
  children: JSX.Element;
  forComponent?: boolean;
};

const ErrorBoundaryProvider = ({
  children,
  forComponent,
}: ErrorBoundaryProviderPropsType): JSX.Element => {
  if (!TelemetryService?.reactPlugin) {
    return (
      <ErrorBoundary FallbackComponent={forComponent ? ErrorFallbackForComponent : ErrorFallback}>
        {children}
      </ErrorBoundary>
    );
  }

  return (
    <AppInsightsErrorBoundary
      onError={() => (forComponent ? <ErrorFallbackForComponent /> : <ErrorFallback />)}
      appInsights={TelemetryService.reactPlugin}
    >
      {children}
    </AppInsightsErrorBoundary>
  );
};

export default ErrorBoundaryProvider;
