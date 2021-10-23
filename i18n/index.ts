import i18next from 'i18next';
import locales from './locales';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18next
  .use(initReactI18next)
  .use(
    new LanguageDetector(null, {
      order: ['localStorage', 'path'],
      lookupLocalStorage: 'i18nextLng',
    })
  )
  .use(
    resourcesToBackend((language, _, callback) => {
      if (language === locales.defaultLocale || language === 'en') {
        import('./ui.json')
          .then((resource) => callback(null, resource))
          .catch((error) => callback(error, null));
      } else if (locales.locales.some((l) => l.startsWith(language))) {
        const locale = locales.locales.find((l) => l.startsWith(language));
        import(`./__generated__/ui/ui.${locale}.json`)
          .then((resource) => callback(null, resource))
          .catch((error) => callback(error, null));
      }
    })
  )
  .init({
    fallbackLng: locales.defaultLocale,
    load: 'currentOnly',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18next;
