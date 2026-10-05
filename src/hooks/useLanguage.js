import { useTranslation } from 'react-i18next';

export function useLanguage() {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage ?? 'en';
  // The language detector caches the new choice in localStorage.
  const toggleLanguage = () => i18n.changeLanguage(language === 'en' ? 'es' : 'en');
  return { language, toggleLanguage };
}
