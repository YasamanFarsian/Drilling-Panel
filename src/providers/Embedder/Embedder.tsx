import { useHostSettingsStore } from '@dt-advisory/store/HostSettingsStore';
import useIsInIframe from '@dt-advisory/utils/useIsInIframe';
import React, { useMemo } from 'react';

type EmbedderType = {
  isInIframe: boolean;
}; // provider value shape

const EmbedderContext = React.createContext<EmbedderType | undefined>(undefined);

export const useEmbedder = (): EmbedderType => {
  const context = React.useContext(EmbedderContext);
  if (context === undefined) {
    throw new Error('useEmbedder can not be used outside EmbedderProvider');
  }
  return context;
};

type EmbedderProviderPropsType = {
  children: React.ReactNode;
};

const EmbedderProvider = ({ children }: EmbedderProviderPropsType): JSX.Element => {
  const updateHostIsEmbedded = useHostSettingsStore((x) => x.updateHostIsEmbedded);
  const isInIframe = useIsInIframe();
  const value = useMemo(() => ({ isInIframe }), [isInIframe]);
  updateHostIsEmbedded(value.isInIframe);
  return <EmbedderContext.Provider value={value}>{children}</EmbedderContext.Provider>;
};

export default EmbedderProvider;
