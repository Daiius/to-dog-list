'use client';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

export const ThemeProvider  = (props: ThemeProviderProps) => (
  <NextThemeProvider {...props}>{props.children}</NextThemeProvider>
);

