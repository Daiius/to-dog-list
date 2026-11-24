import clsx from 'clsx'

import { List, ListItem } from '@/components/base/List'

export type TaskListProps = {
  tasks: string[]
  eaten: boolean
  className?: string
}

export const TaskList = ({ tasks, eaten, className }: TaskListProps) => (
  <div className={className}>
    {/* 飾りの g を挟むと「To-DoList」と続けて読まれるので、読み上げ用の文を別に置く */}
    <div aria-hidden="true">
      To-Do<span className="dark:text-slate-700 text-slate-300">g</span>List :
    </div>
    <div className="sr-only">To-Do List:</div>
    <List
      className={clsx(
        'ml-8 max-h-80 min-h-11 rounded-lg shadow-inner w-full',
        'dark:bg-slate-600  bg-white',
        'border border-slate-300 dark:border-slate-500',
        'overflow-hidden',
      )}
      empty={
        <div className="relative">
          <div
            className={clsx(
              'dark:text-slate-300 absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-2',
            )}
          >
            Nothing to do :)
          </div>
        </div>
      }
    >
      {tasks.map((task) => (
        <ListItem
          key={task}
          className={clsx(eaten && 'transition opacity-0 duration-500')}
        >
          {/* 以前ここにあった空のアイコン（mr-2）の分だけ字下げを保つ */}
          <div className="pl-2">{task}</div>
        </ListItem>
      ))}
    </List>
  </div>
)
