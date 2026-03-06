import en from "./locales/en.json";
import km from "./locales/km.json";

const LANGUAGE_STORAGE_KEY = "language";
const FALLBACK_LANGUAGE = "en";

const dictionaries = {
  en,
  km,
};

const getValueByPath = (obj, path) => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};

export const getCurrentLanguage = () => {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored && dictionaries[stored]) {
    return stored;
  }
  return FALLBACK_LANGUAGE;
};

export const toggleLanguage = (currentLanguage) => {
  const nextLanguage = currentLanguage === "en" ? "km" : "en";
  localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  return nextLanguage;
};

export const t = (path, language = FALLBACK_LANGUAGE) => {
  const value = getValueByPath(dictionaries[language], path);

  if (typeof value === "string") {
    return value;
  }

  const fallbackValue = getValueByPath(dictionaries[FALLBACK_LANGUAGE], path);
  return typeof fallbackValue === "string" ? fallbackValue : path;
};
