'use client'

import React from 'react';
import clsx from 'clsx';
import {
	Input as HeadlessInput,
	Button as HeadlessButton,
} from '@headlessui/react';

export type InputProps =
	& React.ComponentProps<'input'>
	& React.ComponentProps<typeof HeadlessInput>;

const Input: React.FC<InputProps> = ({
	className,
	...props
}) => (
	<>
		<HeadlessInput 
			{...props}
			className={clsx(
				'border border-1 border-slate-300 rounded-md',
				'w-fit px-2 py-1 focus:outline-none',
				className,
			)}
		/>
		{props.value &&
			<HeadlessButton
				className={clsx(
					'relative',
					'right-5',
				)}
				onClick={() => props.onChange("")}
			>
				<i className='bi bi-x text-lg'/>
			</HeadlessButton>
		}
	</>
);

export default Input;

