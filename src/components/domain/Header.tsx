'use client';

import React from 'react';
import clsx from 'clsx';

import { Switch } from '@headlessui/react';
import { useTheme } from 'next-themes';

const ThemeSwitch: React.FC<
	{ className?: string; }
> = (
	className,
) => {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = React.useState<boolean>(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<Switch
			checked={theme === "dark"}
			onChange={v => v ? setTheme("dark") : setTheme("light")}
			className={clsx(
				'group flex h-7 w-14 cursor-pointer rounded-full',
				'bg-slate-300 dark:bg-slate-400 p-1',
				'transition-colors duration-200 ease-in-out',
				'focus:outline-none',
				'dark:data-[focus]:outline-white data-[focus]:outline-slate-500',
				'ms-auto',
				className,
			)}
		>
			<i className={clsx(
					 theme === 'light' && 'bi bi-sun',
					 theme === 'dark'  && 'bi bi-moon',
					 'absolute transition-transform duration-800 text-white',
					 'translate-x-7 -translate-y-[0.15rem] dark:text-slate-600',
					 'dark:translate-x-1'
				 )}
			/>
			<span
				aria-hidden={true}
				className={clsx(
					'absolute point-events-none inline-block size-5',
					'translate-x-0 rounded-full dark:bg-slate-600 bg-slate-200 ring-0 shadow-lg',
					'transition duration-200 ease-in-out',
					'group-data-[checked]:translate-x-7',
				)}
			/>
		</Switch>
	);
};

const Header: React.FC = () => (
	<div className='w-full flex flex-row p-5'>
		<ThemeSwitch />
	</div>
);

export default Header;

