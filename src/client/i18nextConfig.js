import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "../../public/assets/locales/en/translations.json";
import translationJP from "../../public/assets/locales/jp/translations.json";
const fallbackLng = ["en"];
const availableLanguages = ["en", "jp"];

const resources = {
  en: {
    translation: translationEN,
  },
  jp: {
    translation: translationJP,
  },
};

i18n
  .use(initReactI18next)
  .use(backend)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng, // fallback language is english.

    detection: {
      checkWhitelist: true, // options for language detection
    },
    whitelist: availableLanguages,
    interpolation: {
      escapeValue: false, // no need for react. it escapes by default
    },
  });

export default i18n;
