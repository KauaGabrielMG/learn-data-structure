'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ReactNode } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      defaultTheme="light"
      enableSystem={false}
      enableColorScheme={false}
      forcedTheme="light"
    >
      {children}
    </NextThemesProvider>
  );
}
