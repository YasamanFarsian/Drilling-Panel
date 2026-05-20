/* eslint-disable @typescript-eslint/no-explicit-any*/
import { useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';

export const useMouseState = () => {
  const [isIdle, setIsIdle] = useState(false);
  const handleOnIdle = (event: any) => {
    setIsIdle(true);
  };

  const handleOnActive = (event: any) => {
    setIsIdle(false);
  };

  useIdleTimer({
    timeout: 5000,
    onActive: handleOnActive,
    onIdle: handleOnIdle,
    debounce: 500,
  });

  return isIdle;
};
