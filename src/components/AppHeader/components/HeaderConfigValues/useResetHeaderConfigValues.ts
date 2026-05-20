import { useEffect, useState } from 'react';

export const RESET_INTERVAL_MS = 60000;
export const RESET_TIMEOUT_MS = 3;

const useResetHeaderConfigValues = () => {
  const [isReset, setIsReset] = useState(false);

  useEffect(() => {
    const timerId = setInterval(() => {
      setIsReset(true);
    }, RESET_INTERVAL_MS);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    let timerId: NodeJS.Timeout | number;
    if (isReset) {
      timerId = setTimeout(() => {
        setIsReset(false);
      }, RESET_TIMEOUT_MS);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isReset]);

  return { isReset };
};

export default useResetHeaderConfigValues;
