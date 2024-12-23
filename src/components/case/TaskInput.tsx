'use client';

import React from 'react';
import clsx from 'clsx';
import Input from '@/components/base/Input';
import { 
  Field,
  Label,
  Button as HeadlessButton
} from '@headlessui/react';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';


const TaskInput: React.FC<
  React.ComponentProps<'div'>
  & { 
    onAddTask: (newTask: string) => void;
    autoFocus?: boolean;
  }
> = ({
  onAddTask,
  autoFocus,
  ...props
}) => {
  const [newTask, setNewTask] = React.useState<string>("");

  const handleSubmitTask = () => {
    onAddTask(newTask);
    setNewTask("");
  };

  return (
    <Field className={props.className}>
      <Label htmlFor='task-input'>New To-Do<span className='dark:text-slate-700 text-slate-300'>g</span>:</Label>
      <div className='flex flex-row'>
        {/* <i className='bi bi-pen text-xl self-center mr-2'/> */}
        <PencilIcon className='size-7 self-center mr-2' />
        <Input
          id='task-input' 
          value={newTask} 
          onChange={(newValue: string) => setNewTask(newValue)}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (
              !e.nativeEvent.isComposing 
              && e.key === 'Enter'
              && newTask.length > 0
            ) {
              handleSubmitTask();
            }
          }}
          className='w-full'
          autoFocus={autoFocus}
        />
        <HeadlessButton
          className={clsx(
            'border-[1.5px] dark:border-white',
            'rounded-md h-[80%] self-center ml-2 px-2',
            newTask.length > 0 ? 'visible' : 'invisible'
          )}
          onClick={handleSubmitTask}
        >
          <PlusIcon className='size-6'/>
        </HeadlessButton>
      </div>
    </Field>
  );
};

export default TaskInput;

