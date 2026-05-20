import React, { useEffect, useMemo, useState } from 'react';
import { isAndroidOrWindowsTablet } from '@dt-advisory/providers/BaseWidget/isAndroidOrWindowsTablet';

type BaseWidgetType = {
  dimension: DimensionType;
  setDimension: (dimension: DimensionType) => void;
  isResizing: boolean;
  setIsResizing: (isResizing: boolean) => void;
}; // provider value shape

const BaseWidgetContext = React.createContext<BaseWidgetType | undefined>(undefined);

export const useBaseWidget = (): BaseWidgetType => {
  const context = React.useContext(BaseWidgetContext);
  if (context === undefined) {
    throw new Error('useBaseWidget can not be used outside BaseWidgetProvider');
  }
  return context;
};

type BaseWidgetProviderPropsType = {
  children: React.ReactNode;
};

type DimensionType = {
  width?: number;
  height?: number;
};

const BaseWidgetProvider = ({ children }: BaseWidgetProviderPropsType): JSX.Element => {
  const [dimension, setDimension] = useState<DimensionType>({ height: 0, width: 0 });
  const [isResizing, setIsResizing] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      setIsResizing(true);

      timeoutId = setTimeout(() => {
        setIsResizing(false);
      }, 200);
    };

    // On android, when keyboard is opened, window.resize event is triggered
    // This will clash with our listener thus closing the keyboard immediately after opening it
    // Refer: https://7peakssoftware.atlassian.net/browse/SK-7308
    if (!isAndroidOrWindowsTablet()) {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      dimension,
      setDimension,
      isResizing,
      setIsResizing,
    }),
    [dimension, isResizing],
  );

  return <BaseWidgetContext.Provider value={contextValue}>{children}</BaseWidgetContext.Provider>;
};

export default BaseWidgetProvider;
