'use client'
import React from 'react';

import TaskInput from '@/components/case/TaskInput';
import TaskList from '@/components/case/TaskList';

const MainContainer: React.FC = () => {
	const [tasks, setTasks] = React.useState<string[]>([]);
	return (
		<div className='max-h-[70vh]'>
			<TaskList tasks={tasks}/>
			<TaskInput onAddTask={newTask => setTasks([
				...new Set([...tasks, newTask])
			])}/>
		</div>
	);
};


export default MainContainer;

