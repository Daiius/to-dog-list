import { clsx } from 'clsx'

import { Switch } from '@headlessui/react'

import { useSettings } from '@/hooks/useSettings'
import { HeadingIcon } from '@/components/case/HeadingIcon'

export const HeadingSwitch = () => {
  const { headingTrained, setHeadingTrained } = useSettings()
  return (
    <Switch
      checked={headingTrained}
      onChange={(v) => setHeadingTrained(v)}
      aria-label="Train dogs to run forwards"
      className={clsx(
        'border border-slate-300 dark:border-slate-500 rounded-md',
        'text-slate-500 dark:text-slate-400',
        'p-1 h-10',
      )}
    >
      <HeadingIcon headingTrained={headingTrained} />
    </Switch>
  )
}
