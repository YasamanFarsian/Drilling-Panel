/* eslint-disable max-lines-per-function, complexity, max-nested-callbacks, @typescript-eslint/no-explicit-any */
import useHasUserBeenInactive from '@dt-advisory/hooks/useHasUserBeenInactive';
import { useConfigs } from '@dt-advisory/providers/Configs';
import MsalAuthentication from '@dt-advisory/services/MsalAuthentication';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { useWSConnectionStore } from '@dt-advisory/store/WsConnection';
import * as signalR from '@microsoft/signalr';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const TRY_RECONNECT_ATTEMPT_SDK_MS = 300;
const TRY_RECONNECT_ATTEMPT_MS = 5000;

export type UseWebSocketPropsType = {
  getTokenFormHost?: () => Promise<string | void>;
  webSocketUrlFromHost?: string;
  hostOperationId?: string;
  path: WidgetsEnum;
};
// TODO new opt props: getToken() and webSocketUrl: string
export function useWebSocket({
  path,
  webSocketUrlFromHost,
  getTokenFormHost,
  hostOperationId,
}: UseWebSocketPropsType) {
  const configs = useConfigs();
  const { enableAuthentication, websocketUrl } = configs;
  const { operationId } = useSettingsStore((state) => state.settings);
  const setShouldReconnect = useWSConnectionStore((x) => x.setShouldReconnect);
  const shouldReconnect = useWSConnectionStore((x) => x.shouldReconnect);
  const setWsConnectionStates = useWSConnectionStore((x) => x.setWsConnectionStates);
  const [wsConn, setWsConn] = useState<signalR.HubConnection>();
  const [isTryReconnect, setIsTryReconnect] = useState(false);
  const { hasUserBeenInactive, setHasBeenInactive } = useHasUserBeenInactive();
  const [state, setState] = useState<signalR.HubConnectionState>(
    signalR.HubConnectionState.Disconnected,
  );

  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // handle hubUrl
  const hubUrl = useMemo(
    () =>
      `${new URL(webSocketUrlFromHost ?? websocketUrl).origin}/hub/${path}?opid=${
        hostOperationId ?? operationId
      }&access_token=`,
    [path, operationId, websocketUrl, webSocketUrlFromHost, hostOperationId],
  );

  // handle fresh token
  const getNewHubUrl = useCallback(async () => {
    let token;
    if ('function' === typeof getTokenFormHost) {
      token = await getTokenFormHost();
    } else if (enableAuthentication) {
      try {
        token = await MsalAuthentication.getToken();
      } catch (e) {
        console.error(e);
      }
    }
    token = token ?? '';
    return hubUrl + token;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hubUrl, enableAuthentication]);

  // handle WS instance
  const getWsInstance = useCallback((newHubUrl: string) => {
    return new signalR.HubConnectionBuilder()
      .withUrl(newHubUrl)
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (retryContext) => {
          const retryReason: any = retryContext.retryReason;
          if (retryReason.statusCode === 401 || retryContext.elapsedMilliseconds > 20000) {
            setIsTryReconnect(true);
            return null;
          }
          return TRY_RECONNECT_ATTEMPT_SDK_MS;
        },
      })
      .build();
  }, []);

  useEffect(() => {
    getNewHubUrl()
      .then((newHubUrl) => {
        const ws = getWsInstance(newHubUrl);
        setWsConn(ws);
      })
      .catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hubUrl]);

  const stopAndStart = useCallback(async () => {
    try {
      setShouldReconnect(false);
      await wsConn?.stop();
      const newHubUrl = await getNewHubUrl();
      const ws = getWsInstance(newHubUrl);
      setWsConn(ws);
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsConn, hubUrl]);

  // handle when connection crashed
  useEffect(() => {
    if (isTryReconnect && !hasUserBeenInactive) {
      const timeoutId = setTimeout(() => {
        void stopAndStart();
      }, TRY_RECONNECT_ATTEMPT_MS);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    if (isTryReconnect && hasUserBeenInactive) {
      setHasBeenInactive();
      void stopAndStart();
    }
    setIsTryReconnect(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hubUrl, isTryReconnect, hasUserBeenInactive, stopAndStart]);

  // handle when should reconnect
  useEffect(() => {
    const isRoadmapChart = [WidgetsEnum.RoadmapDrag, WidgetsEnum.RoadmapTorque].includes(path);
    if (shouldReconnect && isRoadmapChart) {
      void stopAndStart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldReconnect, path]);

  useEffect(() => {
    if (!wsConn) return;
    setIsTryReconnect(false);
    let changed = false;

    wsConn
      .start()
      .then(() => {
        setWsConnectionStates({ [path]: true });
        return !changed && setState(wsConn.state);
      })
      .catch((_error) => {
        wsConn
          ?.stop()
          .then(() => {
            setIsTryReconnect(true);
            setWsConn(undefined);
          })
          .catch(console.error);
      });
    wsConn.onreconnecting((_error) => {
      setWsConnectionStates({ [path]: false });
    });
    wsConn.onreconnected((_connectionId) => {
      setWsConnectionStates({ [path]: true });
    });
    wsConn.onclose((_error) => {
      setWsConnectionStates({ [path]: false });
    });

    return () => {
      changed = true;
      wsConn
        .stop()
        .then(() => {
          setWsConnectionStates({ [path]: false });
          return mounted.current && setState(wsConn.state);
        })
        .catch(console.error);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsConn]);

  const isConnected = state === signalR.HubConnectionState.Connected;

  return { ws: wsConn, isConnected };
}
