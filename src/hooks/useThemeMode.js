import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export function useThemeMode() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeMode must be used inside <ThemeModeProvider>');
  return ctx;
}
