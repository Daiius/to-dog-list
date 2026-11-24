import clsx from 'clsx'
import { Children, type ReactNode } from 'react'

export const ListItem = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => (
  <li
    className={clsx('first:rounded-t-lg last:rounded-b-lg', 'p-2', className)}
  >
    {children}
  </li>
)

export const List = ({
  children,
  empty,
  className,
}: {
  children: ReactNode
  /** 項目がないときに、リストの代わりに同じ枠の中へ出すもの */
  empty?: ReactNode
  className?: string
}) => {
  const boxClassName = clsx(
    'overflow-y-auto flex flex-col',
    'divide-y',
    className,
  )
  // 項目がないときは空のリストを置かず、同じ見た目の枠に empty だけを出す
  if (Children.count(children) === 0) {
    return <div className={boxClassName}>{empty}</div>
  }
  // list-style: none の ul は Safari の VoiceOver がリストとして扱わないので role を明示する
  return (
    <ul role="list" className={boxClassName}>
      {children}
    </ul>
  )
}
