'use client';

import React from 'react';
import clsx from 'clsx';
import { 
	Input as HeadlessInput,
	Button as HeadlessButton,
} from '@headlessui/react';

export type InputProps =
	& React.ComponentProps<typeof HeadlessInput>
	& Omit<
			React.ComponentProps<'input'>,
			'onChange'
		>
	& {
		onChange: (newValue: string) => void;
		value: string;
	};

const Input: React.FC<InputProps> = ({
	value,
	onChange,
	...props
}) => (
	<div
		className={clsx(
			'flex flex-row', props.className
		)}
	>
		<input
			{...props}
			value={value}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
			className={clsx(
				'border border-1 border-slate-300 bg-white',
				'rounded-md p-2 w-full',
				'dark:bg-slate-500 dark:border-slate-800',
				'focus:outline-none',
				'autofill:!bg-slate-300',
			)}
		/>
		<HeadlessButton
			className={clsx(
				'relative -ml-5',
				value.length > 0 ? 'visible' : 'invisible'
			)}
			onClick={() => onChange("")}
		>
			<i className='bi bi-x'/>
		</HeadlessButton>
	</div>
);

export default Input;

