import { act, render } from '@testing-library/react';
import React, { useEffect } from 'react';
import BaseWidgetProvider, { useBaseWidget } from './BaseWidget';

const TestComponent = ({ mockResizingValue }: { mockResizingValue?: boolean }): JSX.Element => {
  const { dimension, setIsResizing, isResizing } = useBaseWidget();

  useEffect(() => {
    setIsResizing(!!mockResizingValue);
  }, [mockResizingValue, setIsResizing]);

  return (
    <>
      <div data-testid="height">{dimension.height}</div>
      <div data-testid="width">{dimension.width}</div>
      <div data-testid="isResizing">{isResizing ? 'True' : 'False'}</div>
    </>
  );
};

const renderWithUserAgent = (userAgent: string) => {
  Object.defineProperty(window, 'navigator', {
    value: { userAgent },
    writable: true,
  });

  return render(
    <BaseWidgetProvider>
      <TestComponent />
    </BaseWidgetProvider>,
  );
};

describe('BaseWidget Provider', () => {
  it('should render without crashing and all data should be accessable', () => {
    const { getByTestId } = render(
      <BaseWidgetProvider>
        <TestComponent mockResizingValue={true} />
      </BaseWidgetProvider>,
    );

    expect(getByTestId('height').textContent).toBe('0');
    expect(getByTestId('width').textContent).toBe('0');
    expect(getByTestId('isResizing').textContent).toBe('True');
  });

  describe('when onResize called', () => {
    it('should not set isResizing to true on Windows tablet', () => {
      const { getByTestId } = renderWithUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; Touch; Tablet PC)',
      );

      act(() => {
        window.dispatchEvent(new Event('resize'));
      });

      expect(getByTestId('isResizing').textContent).toBe('False');
    });

    it('should not set isResizing to true on Android device', () => {
      const { getByTestId } = renderWithUserAgent(
        'Mozilla/5.0 (Linux; Android 10; Pixel 3 Build/...)',
      );

      act(() => {
        window.dispatchEvent(new Event('resize'));
      });

      expect(getByTestId('isResizing').textContent).toBe('False');
    });

    it('should set isResizing to true on other devices', () => {
      const { getByTestId } = renderWithUserAgent('Mozilla/5.0 ()');

      act(() => {
        window.dispatchEvent(new Event('resize'));
      });

      expect(getByTestId('isResizing').textContent).toBe('True');
    });
  });
});
