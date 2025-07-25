'use client'

import { useState, type KeyboardEvent } from 'react'
import { clsx } from 'clsx'
import { Input } from '@/components/base/Input'
import { Field, Label, Button as HeadlessButton } from '@headlessui/react'
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline'

export const TaskInput = ({
  onAddTask,
  autoFocus,
  className,
}: {
  onAddTask: (newTask: string) => void
  autoFocus?: boolean
  className?: string
}) => {
  const [newTask, setNewTask] = useState<string>('')

  const handleSubmitTask = () => {
    onAddTask(newTask)
    setNewTask('')
  }

  return (
    <Field className={className}>
      <Label htmlFor="task-input">
        New To-Do<span className="dark:text-slate-700 text-slate-300">g</span>:
      </Label>
      <div className="flex flex-row">
        {/* 
          NOTE: ml-8 で左端のスペースを調整したTaskListと左端の位置をそろえます 
            size-7 mr-1 で揃うと思いきや、ちょっとズレているので?w-8要素で囲います
        */}
        <div className='w-8 flex items-center justify-center'>
          <PencilIcon className="size-7 mr-1" />
        </div>
        <Input
          id="task-input"
          value={newTask}
          onChange={(newValue: string) => setNewTask(newValue)}
          onKeyDown={(e: KeyboardEvent) => {
            if (
              !e.nativeEvent.isComposing &&
              e.key === 'Enter' &&
              newTask.length > 0
            ) {
              handleSubmitTask()
            }
          }}
          className="w-full h-11"
          autoFocus={autoFocus}
        />
        <HeadlessButton
          className={clsx(
            'border-[1.5px] dark:border-white',
            'rounded-md h-[80%] self-center ml-2 px-2',
            newTask.length > 0 ? 'visible' : 'invisible',
          )}
          onClick={handleSubmitTask}
        >
          <PlusIcon className="size-6" />
        </HeadlessButton>
      </div>
    </Field>
  )
}
