import React from 'react';
import clsx from 'clsx';

export const ListItem: React.FC<React.ComponentProps<'div'>> = ({
  children,
  ...props
}) => (
  <div
    className={clsx(
      'bg-white dark:bg-slate-500',
      'first:rounded-t-lg last:rounded-b-lg',
      'p-2',
      props.className,
    )}
  >
    {children}
  </div>
);


const List: React.FC<React.ComponentProps<'div'>> = ({
  children,
  ...props
}) => (
  <div
    className={clsx(
      'overflow-y-auto flex flex-col',
      'divide-y',
      props.className,
    )}
  >
    {children}
  </div>
);

export default List;

