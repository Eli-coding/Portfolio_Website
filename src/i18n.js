import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

export const LANGUAGES = ['en', 'es'];

i18n
  // Lazy-load each locale as its own chunk; only the active language is downloaded.
  .use(resourcesToBackend((lng) => import(`./locales/${lng}.json`).then((m) => m.default)))
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: LANGUAGES,
    fallbackLng: 'en',
    load: 'languageOnly',
    // Persist the visitor's choice in localStorage; default to English.
    detection: {
      order: ['localStorage'],
      lookupLocalStorage: 'lang',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
  });

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;
