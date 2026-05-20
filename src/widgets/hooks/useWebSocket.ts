import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { useEffect, useRef } from 'react';

export type UseWebSocketPropsType = {
  path: WidgetsEnum;
  getTokenFormHost?: () => Promise<string | void>;
  webSocketUrlFromHost?: string;
  hostOperationId?: string;
};

type MockListener = (message: string) => void;

// Simulates a SignalR-like hub with on/off/listeners
class MockHub {
  private listeners: Partial<Record<string, MockListener>> = {};

  on(event: string, callback: MockListener) {
    this.listeners[event] = callback;
  }

  off(event: string) {
    delete this.listeners[event];
  }

  emit(event: string, message: string) {
    this.listeners[event]?.(message);
  }
}

export function useWebSocket({ path }: UseWebSocketPropsType) {
  const hubRef = useRef(new MockHub());

  useEffect(() => {
    const interval = setInterval(() => {
      hubRef.current.emit(path, JSON.stringify(generateMockData(path)));
    }, 1000);
    return () => clearInterval(interval);
  }, [path]);

  return { ws: hubRef.current, isConnected: true };
}

// ─── Mock data generator ─────────────────────────────────────────────────────
function rand(min: number, max: number) {
  return +(Math.random() * (max - min) + min).toFixed(2);
}

function generateMockData(path: WidgetsEnum): object {
  const base = {
    currentTime: new Date().toISOString(),
    isLive: true,
  };

  switch (path) {
    case WidgetsEnum.Ecd:
      return { ...base, ecd: rand(1.1, 1.5), mw: rand(1.0, 1.4), depth: rand(2000, 5000) };
    case WidgetsEnum.Cutting:
      return { ...base, cuttingConcentration: rand(0, 100), flowRate: rand(200, 800) };
    case WidgetsEnum.Wellbore:
      return { ...base, rop: rand(5, 30), wob: rand(10, 50), rpm: rand(60, 180) };
    case WidgetsEnum.RoadmapDrag:
    case WidgetsEnum.RoadmapTorque:
      return { ...base, planned: rand(100, 200), actual: rand(90, 210) };
    default:
      return { ...base, value: rand(0, 100) };
  }
}
