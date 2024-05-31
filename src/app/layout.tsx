import type { Metadata } from "next";
//import { Inter } from "next/font/google";
import "./globals.css";

import ThemeProvider from '@/providers/ThemeProvider';
import Header from '@/components/domain/Header';
import clsx from 'clsx';

//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To-Dog List",
  description: "かわいい犬がタスクを食べてくれるWebアプリ",
	openGraph: {
		type: 'website',
		url: 'http://faveo-systema.net/to-dog-list',
		description: 'かわいい犬がタスクを食べてくれるWebアプリ',
		siteName: 'To-Dog List',
		images: 'http://faveo-systema.net/to-dog-list/thumbnail.png',
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
			<ThemeProvider attribute='class'>
				<body className={clsx(
					'h-[100vh] w-[100vw] self-center',
					'text-black dark:text-white',
					'bg-gradient-to-b from-slate-100 to-slate-200',
					'dark:from-slate-800 dark:to-slate-900',
				)}>
					<Header />
					{children}
				</body>
			</ThemeProvider>
    </html>
  );
}
