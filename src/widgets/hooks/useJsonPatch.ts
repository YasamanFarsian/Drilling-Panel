/* eslint-disable max-lines-per-function, max-params */
import { applyPatch, Operation } from 'fast-json-patch';
import { useCallback, useEffect, useState } from 'react';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import { useWSConnectionStore } from '@dt-advisory/store/WsConnection';

export const useJsonPatch = <T>(
  patch: Operation[] | null | undefined,
  defaultValue: T,
  isFullFrame: boolean,
): T => {
  const setShouldReconnect = useWSConnectionStore((x) => x.setShouldReconnect);
  const [documentData, setDocumentData] = useState<T | null>(null);
  const operationId = useSettingsStore((x) => x.settings.operationId);
  const [currentOpId, setCurrentOpId] = useState('');

  const patchData = useCallback(
    (_patch: Operation[], _isFullFrame: boolean) => {
      const newDocument = applyPatch(
        _isFullFrame ? defaultValue : documentData,
        _patch,
      ).newDocument;
      setDocumentData(newDocument);
    },
    [documentData, defaultValue],
  );

  useEffect(() => {
    if (currentOpId !== operationId) {
      setDocumentData(null);
      setCurrentOpId(operationId);
    }
  }, [currentOpId, operationId]);

  useEffect(() => {
    if (Array.isArray(patch) && patch.length > 0) {
      try {
        patchData(patch, isFullFrame);
      } catch (e) {
        console.error('### state', documentData);
        console.error('### patch', patch);
        console.error(e);
        setShouldReconnect(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patch, isFullFrame]);

  return documentData as T;
};
