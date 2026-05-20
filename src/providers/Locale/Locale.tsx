import FullPageLoading from '@dt-advisory/components/FullPageLoading';
import en from '@dt-advisory/locales/en.json';
import nb from '@dt-advisory/locales/nb.json';
import React, { useEffect, useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';

const EN_LOCALE_KEY = 'en';

type SupportLocales = 'en' | 'nb';

type LocaleType = {
  locale: SupportLocales;
  changeLocale?: (locale: SupportLocales) => void;
}; // provider value shape

const LocaleContext = React.createContext<LocaleType | undefined>(undefined);

export const useLocale = (): LocaleType => {
  const context = React.useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale can not be used outside LocaleProvider');
  }
  return context;
};

type LocaleProviderPropsType = {
  initialLocale?: SupportLocales;
  children: React.ReactNode;
};

const LocaleProvider = ({ children }: LocaleProviderPropsType): JSX.Element => {
  const [message, setMessage] = useState<Record<string, string> | null>(null);
  const value = useMemo(() => ({ locale: EN_LOCALE_KEY as SupportLocales }), [EN_LOCALE_KEY]);

  useEffect(() => {
    const json = EN_LOCALE_KEY === 'en' ? en : nb;
    setMessage(json);
  }, []);

  if (!message) {
    return <FullPageLoading />;
  }

  return (
    <IntlProvider messages={message} locale={EN_LOCALE_KEY} defaultLocale="en">
      <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
    </IntlProvider>
  );
};

export default LocaleProvider;
