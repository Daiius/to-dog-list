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
			'value' | 'onChange'
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
	<div className='flex flex-row'>
		<HeadlessInput
			{...props}
			value={value}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
			className={clsx(
				'border border-1 border-slate-300 bg-white',
				'rounded-md p-2',
				'dark:bg-slate-500 dark:border-slate-800',
				'focus:outline-none',
				props.className,
			)}
		/>
		{value &&
			<HeadlessButton
				onClick={() => onChange("")}
			>
				<i className='bi bi-x relative right-0'/>
			</HeadlessButton>
		}
	</div>
);

export default Input;

