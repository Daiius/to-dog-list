'use client';

import React from 'react';
import Input from '@/components/base/Input';
import { Field, Label } from '@headlessui/react';

const TaskInput: React.FC = () => {
	const [newTask, setNewTask] = React.useState<string>("");
	return (
		<Field>
			<Label>New To-Do:</Label>
			<Input 
				value={newTask} 
				onChange={(newValue: string) => setNewTask(newValue)}
				onKeyDown={(e: React.KeyboardEvent) => {
					if (!e.nativeEvent.isComposing && e.key === 'Enter') {
						console.log(`${newTask} is submitted!`);
						setNewTask("");
					}
				}}
			/>
		</Field>
	);
};

export default TaskInput;

