'use client';
import React from 'react';
import clsx from 'clsx';

import List, { ListItem } from '@/components/base/List';

const TaskList: React.FC<
	React.ComponentProps<'div'>
	& { tasks: string[]; }
> = ({
	tasks,
	...props
}) => {
	return (
		<div
			className={props.className}
		>	
			<div>To-Do List:</div>
			<List
				className={clsx(
					'ml-7 max-h-[20rem]',
				)}
			>
				{tasks.map(task =>
					<ListItem key={task}>
						<div className='flex flex-row'>
							<i className='bi bi-list text-xs self-center mr-2'/>
							{task}
						</div>
					</ListItem>
				)}
			</List>
		</div>
	);
};

export default TaskList;

