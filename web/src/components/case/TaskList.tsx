'use client'
import clsx from 'clsx'

import { List, ListItem } from '@/components/base/List'

export type TaskListProps = {
  tasks: string[]
  eaten: boolean
  className?: string
}

export const TaskList = ({ tasks, eaten, className }: TaskListProps) => (
  <div className={className}>
    <div>
      To-Do<span className="dark:text-slate-700 text-slate-300">g</span>List :
    </div>
    <List
      className={clsx(
        'ml-7 max-h-[20rem] min-h-10 rounded-lg shadow-inner w-full',
        'dark:bg-slate-600  bg-white',
        'border border-1 border-slate-300 dark:border-slate-500',
        'overflow-hidden',
      )}
    >
      {tasks.length === 0 && (
        <div className="relative">
          <div
            className={clsx(
              'dark:text-slate-300 absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-2',
            )}
          >
            Nothing to do :)
          </div>
        </div>
      )}
      {tasks.map((task) => (
        <ListItem
          key={task}
          className={clsx(eaten && 'transition opacity-0 duration-500')}
        >
          <div className="flex flex-row">
            <i className="bi bi-list text-xs self-center mr-2" />
            {task}
          </div>
        </ListItem>
      ))}
    </List>
  </div>
)
