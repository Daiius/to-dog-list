import type { Metadata } from "next";
import clsx from 'clsx';
//import { Inter } from "next/font/google";
import "./globals.css";

import ThemeProvider from '@/providers/ThemeProvider';
import SettingsProvider from "@/providers/SettingsProvider";
import Header from '@/components/domain/Header';

//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To-Dog List",
  description: "かわいい犬がタスクを食べてくれるWebアプリ",
  openGraph: {
    type: 'website',
    url: 'https://faveo-systema.net/to-dog-list',
    description: 'かわいい犬がタスクを食べてくれるWebアプリ',
    siteName: 'To-Dog List',
    images: 'https://faveo-systema.net/to-dog-list/thumbnail.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
      suppressHydrationWarning
    >
      <ThemeProvider attribute='class' enableSystem={true}>
        <SettingsProvider>
          <body className={clsx(
            'h-[100vh] w-[100vw] self-center',
            'text-black dark:text-white',
            'bg-gradient-to-b from-slate-100 to-slate-200',
            'dark:from-slate-800 dark:to-slate-900',
          )}>
            <Header />
            {children}
          </body>
        </SettingsProvider>
      </ThemeProvider>
    </html>
  );
}
