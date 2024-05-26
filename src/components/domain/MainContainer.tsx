'use client'
import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

import TaskInput from '@/components/case/TaskInput';
import TaskList from '@/components/case/TaskList';

const MainContainer: React.FC = () => {
	const [tasks, setTasks] = React.useState<string[]>([]);
	return (
		<div className='max-h-[70vh]'>
			<div>
					<Image
						alt='cute dog'
						width={150}
						height={150}
						className={clsx(
							'opacity-0 -scale-x-100 absolute right-0',
							tasks.length > 0 && 'animate-come-and-eat',
						)}
						src='/dogs/dog_great_pyrenees.png'
					/>
				<TaskList tasks={tasks}/>
			</div>
			<TaskInput
				onAddTask={newTask => {
					setTasks([...new Set([...tasks, newTask])]);
					setTimeout(() => setTasks([]), 4000);
				}}
			/>
		</div>
	);
};


export default MainContainer;

