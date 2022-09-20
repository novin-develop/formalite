import React, {
  createContext,
  useEffect,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { WithChildren, Language } from "./model";

interface Resource {
  [key: string]: string;
}

export interface Resources {
  [key: string]: Resource;
}

interface I18nProviderProps {
  targetLang: Language;
  resources: Resources;
}

interface II18nContext {
  lang: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const DefaultLanguage: Language = "en";
const i18nContext = createContext<II18nContext>({} as II18nContext);

export const useI18nContext = () => {
  return useContext(i18nContext);
};

export const I18nProvider = ({
  children,
  targetLang = DefaultLanguage,
  resources,
}: WithChildren<I18nProviderProps>) => {
  const [lang, setLang] = useState<Language>(targetLang);

  const changeLanguage = (selectedLanguage: Language) => {
    setLang(selectedLanguage);
  };

  useEffect(() => {
    changeLanguage(targetLang);
  }, [targetLang]);

  const t = useCallback(
    (key: string) => {
      return (
        resources?.[lang]?.[key] || resources?.[DefaultLanguage]?.[key] || key
      );
    },
    [lang, resources]
  );

  const values = useMemo(
    () => ({
      lang,
      changeLanguage,
      t,
    }),
    [lang, t]
  );

  return <i18nContext.Provider value={values}>{children}</i18nContext.Provider>;
};
