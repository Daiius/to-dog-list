'use client';
import React from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';

const ThemeProvider: React.FC<ThemeProviderProps> = (props) => (
	<NextThemeProvider {...props}>{props.children}</NextThemeProvider>
);

export default ThemeProvider;

