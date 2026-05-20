import { useEffect, useRef } from 'react';
import useUserActive from './useUserActive';

const useHasUserBeenInactive = () => {
  const isUserActive = useUserActive();
  const hasBeenInactive = useRef(false);

  const setHasBeenInactive = () => {
    hasBeenInactive.current = false;
  };

  useEffect(() => {
    if (!isUserActive) {
      hasBeenInactive.current = true;
    } else {
      hasBeenInactive.current = false;
    }
  }, [isUserActive]);

  return {
    hasUserBeenInactive: hasBeenInactive.current && isUserActive,
    setHasBeenInactive,
  };
};

export default useHasUserBeenInactive;
