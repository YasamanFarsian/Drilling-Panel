import React from 'react';
import { useHostSettingsStore } from '@dt-advisory/store/HostSettingsStore';

export const useBrowserInfo = () => {
  const [isDesktop, setIsDesktop] = React.useState<boolean>(true);
  const isEmbedded = useHostSettingsStore((x) => x.isEmbedded);

  React.useEffect(() => {
    const isMacDesktop = navigator.userAgent.includes('Macintosh');
    const isWindowsDesktop = navigator.userAgent.includes('Windows');
    const isLinuxDesktop = navigator.userAgent.includes('Linux');

    if (isEmbedded) setIsDesktop(false);
    else setIsDesktop(isMacDesktop || isWindowsDesktop || isLinuxDesktop);
  }, [isEmbedded]);

  return { isDesktop };
};
