'use client'

import { KeyboardEvent } from 'react'
import clsx from 'clsx'
import { Button as HeadlessButton } from '@headlessui/react'

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
        'border border-1 border-slate-300 bg-white',
        'rounded-md p-2 w-full',
        'dark:bg-slate-500 dark:border-slate-800',
        'focus:outline-none',
        'autofill:!bg-slate-300',
      )}
    />
    <HeadlessButton
      className={clsx(
        'relative -ml-5',
        value && value.length > 0 ? 'visible' : 'invisible',
      )}
      onClick={() => onChange?.('')}
    >
      <i className="bi bi-x" />
    </HeadlessButton>
  </div>
)
