import { KeyboardEvent } from 'react'
import clsx from 'clsx'

export type InputProps = {
  id?: string
  value?: string
  onChange?: (newValue: string) => void
  onKeyDown?: (e: KeyboardEvent) => void
  autoFocus?: boolean
  className?: string
}

export const Input = ({
  id,
  value,
  onChange,
  onKeyDown,
  autoFocus,
  className,
}: InputProps) => (
  <div className={clsx('flex flex-row', className)}>
    <input
      id={id}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      onKeyDown={(e) => onKeyDown?.(e)}
      autoFocus={autoFocus}
      className={clsx(
        'border border-slate-300 bg-white',
        'rounded-md p-2 w-full',
        'dark:bg-slate-500 dark:border-slate-800',
        // 既定の outline は消し、キーボードでも見える枠をこの見た目に合わせて出す
        'focus:outline-hidden',
        'focus-visible:ring-2 focus-visible:ring-slate-500',
        'dark:focus-visible:ring-slate-300',
        'autofill:bg-slate-300!',
        'h-11',
      )}
    />
  </div>
)
