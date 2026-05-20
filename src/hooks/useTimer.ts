import { useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';

export const useTimer = (timestamp?: Date) => {
  const [formatted, setFormatted] = useState({
    seconds: '00',
    minutes: '00',
    hours: '00',
  });
  const { seconds, minutes, hours } = useStopwatch({
    autoStart: true,
    offsetTimestamp: timestamp ?? new Date(),
  });

  useEffect(() => {
    setFormatted({
      seconds: seconds < 10 ? `0${seconds}` : '' + seconds,
      minutes: minutes < 10 ? `0${minutes}` : '' + minutes,
      hours: hours < 10 ? `0${hours}` : '' + hours,
    });
  }, [seconds, minutes, hours]);

  return formatted;
};

export const useTimeoutConnect = (timeoutSecond = 5, autoStart = true) => {
  const [isConnectionTimeout, setIsConnectionTimeout] = useState(false);
  const { days, hours, minutes, seconds, reset, pause, start } = useStopwatch({
    autoStart,
  });

  useEffect(() => {
    const daysInSeconds = days * 86400; // 24 * 60 * 60
    const hoursInSeconds = hours * 60 * 60;
    const minutesInSeconds = minutes * 60;
    const totalSeconds = daysInSeconds + hoursInSeconds + minutesInSeconds + seconds;
    setIsConnectionTimeout(totalSeconds > timeoutSecond);
  }, [days, hours, minutes, seconds, timeoutSecond]);

  return { isConnectionTimeout, reset, pause, seconds, start };
};
