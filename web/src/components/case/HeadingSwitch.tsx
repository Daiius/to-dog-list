import { clsx } from 'clsx'

import { Switch } from '@headlessui/react'

import { useSettings } from '@/providers/SettingsProvider'
import { HeadingIcon } from '@/components/case/HeadingIcon'

export const HeadingSwitch = () => {
  const { headingTrained, setHeadingTrained, mounted } = useSettings()
  if (!mounted) return null
  return (
    <Switch
      checked={headingTrained}
      onChange={(v) => setHeadingTrained(v)}
      className={clsx(
        'border border-1 border-slate-300 dark:border-slate-500 rounded-md',
        'text-slate-500 dark:text-slate-400',
        'p-1 h-10',
      )}
    >
      <HeadingIcon headingTrained={headingTrained} />
    </Switch>
  )
}
