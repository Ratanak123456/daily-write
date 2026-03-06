import { useEffect, useMemo, useState } from "react";
import { getCurrentLanguage, t as translate, toggleLanguage } from "./index";
import { I18nContext } from "./context";

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(getCurrentLanguage);

  useEffect(() => {
    document.documentElement.lang = language === "km" ? "km" : "en";
    document.documentElement.setAttribute("data-lang", language);
  }, [language]);

  const value = useMemo(() => {
    return {
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((current) => toggleLanguage(current)),
      t: (path) => translate(path, language),
    };
  }, [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
