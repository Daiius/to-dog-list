import clsx from 'clsx'
import type { ReactNode } from 'react'

export const ListItem = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => (
  <div
    className={clsx(
      'bg-white dark:bg-slate-500',
      'first:rounded-t-lg last:rounded-b-lg',
      'p-2',
      className,
    )}
  >
    {children}
  </div>
)

export const List = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => (
  <div className={clsx('overflow-y-auto flex flex-col', 'divide-y', className)}>
    {children}
  </div>
)
