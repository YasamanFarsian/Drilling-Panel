import React, { useMemo, useState } from 'react';
import { useConfigs } from '@dt-advisory/providers/Configs';

function createEmulatorController(baseUrl: string, command: 'start' | 'stop') {
  return async function (options?: { onError(res: Response): void }) {
    return fetch(`${baseUrl}/api/emulator/${command}`, {
      method: 'post',
    }).then((res) => {
      if (res.status !== 200) {
        options?.onError?.(res);
      }
    });
  };
}

type EmulatorType = {
  isEmulated: boolean;
  toggle(): void;
}; // provider value shape

const EmulatorContext = React.createContext<EmulatorType | undefined>(undefined);

export const useEmulator = (): EmulatorType => {
  const context = React.useContext(EmulatorContext);
  if (context === undefined) {
    throw new Error('useEmulator can not be used outside EmulatorProvider');
  }
  return context;
};

type EmulatorProviderPropsType = {
  children: React.ReactNode;
};

// eslint-disable-next-line max-lines-per-function
const EmulatorProvider = ({ children }: EmulatorProviderPropsType): JSX.Element => {
  const configs = useConfigs();
  const [isEmulated, setIsEmulated] = useState(false);

  const baseUrl = new URL(configs.websocketUrl).origin;

  // get initial state from API
  /*  
    SK-1247 - comment this until further notice
    
    const handleCurrentEmulatorState = useCallback(async () => {
      const state = await getEmulatorState(baseUrl);
      setIsEmulated(state);
    }, [baseUrl]);

    useEffect(() => {
      handleCurrentEmulatorState();
    }, [handleCurrentEmulatorState]);
  */

  const startEmulator = useMemo(() => {
    return createEmulatorController(baseUrl, 'start');
  }, [baseUrl]);

  const stopEmulator = useMemo(() => {
    return createEmulatorController(baseUrl, 'stop');
  }, [baseUrl]);

  const toggle = () => {
    if (isEmulated) {
      setIsEmulated(false);
      stopEmulator({
        onError: () => {
          setIsEmulated(true);
          alert('Error Stopping Emulator');
        },
      });
    } else {
      setIsEmulated(true);
      startEmulator({
        onError: () => {
          setIsEmulated(false);
          alert('Error Starting Emulator');
        },
      });
    }
  };

  const memoizedValue = useMemo(() => ({ isEmulated, toggle }), [isEmulated, toggle]);

  return <EmulatorContext.Provider value={memoizedValue}>{children}</EmulatorContext.Provider>;
};

export default EmulatorProvider;
