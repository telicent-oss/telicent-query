import { createContext, useContext, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';

const STORAGE_KEY = 'query.themeMode';

type ThemeMode = {
  dark: boolean;
  setDark: (v: boolean) => void;
  toggle: () => void;
};

const ThemeModeContext = createContext<ThemeMode | null>(null);

function readInitial(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === 'light') return false;
    if (v === 'dark') return true;
  } catch {
    // localStorage may be unavailable (private mode, sandbox, etc.)
  }
  return true;
}

export const ThemeModeProvider = ({ children }: PropsWithChildren) => {
  const [dark, setDark] = useState<boolean>(readInitial);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
    } catch {
      // ignore
    }
  }, [dark]);

  const value: ThemeMode = {
    dark,
    setDark,
    toggle: () => setDark((d) => !d),
  };

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
};

export const useThemeMode = (): ThemeMode => {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error('useThemeMode must be used within a ThemeModeProvider');
  return ctx;
};
