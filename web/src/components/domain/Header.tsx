'use client'

import clsx from 'clsx'
import { useState } from 'react'

import { DogIcon } from '@/components/base/DogIcon'

import {
  Switch,
  Button,
  Transition,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { useTheme } from 'next-themes'
import { useSettings } from '@/providers/SettingsProvider'
import {
  InformationCircleIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline'

const ThemeSwitch = ({ className }: { className?: string }) => {
  const { setTheme, theme } = useTheme()
  const { mounted } = useSettings()

  if (!mounted) return null

  return (
    <Switch
      checked={theme === 'dark'}
      onChange={(v) => (v ? setTheme('dark') : setTheme('light'))}
      className={clsx(
        'group flex h-7 w-14 cursor-pointer rounded-full',
        'bg-slate-300 dark:bg-slate-400 p-1',
        'transition-colors duration-200 ease-in-out',
        'focus:outline-none',
        'dark:data-[focus]:outline-white data-[focus]:outline-slate-500',
        'ms-auto',
        className,
      )}
    >
      <div
        className={clsx(
          'absolute transition-transform duration-800 text-white',
          'translate-x-7 dark:text-slate-600',
          'dark:translate-x-1',
        )}
      >
        {theme === 'light' && <SunIcon className="size-5" />}
        {theme === 'dark' && <MoonIcon className="size-5" />}
      </div>
      <span
        aria-hidden={true}
        className={clsx(
          'absolute point-events-none inline-block size-5',
          'translate-x-0 rounded-full dark:bg-slate-600 bg-slate-200 ring-0 shadow-lg',
          'transition duration-200 ease-in-out',
          'group-data-[checked]:translate-x-7',
        )}
      />
    </Switch>
  )
}

const HeadingIcon = ({ headingTrained }: { headingTrained: boolean }) => (
  <div className="flex flex-row">
    <DogIcon
      className="
      fill-slate-400 w-5 h-5 stroke-[10px] stroke-slate-400"
    />
    <DogIcon
      className={clsx(
        'w-5 h-5 stroke-[10px] stroke-slate-400 -scale-x-100',
        headingTrained ? 'fill-none' : 'fill-slate-400',
      )}
    />
  </div>
)

const HeadingSwitch = () => {
  const { headingTrained, setHeadingTrained, mounted } = useSettings()
  if (!mounted) return null
  return (
    <Switch
      checked={headingTrained}
      onChange={(v) => setHeadingTrained(v)}
      className={clsx(
        'border border-1 border-slate-300 dark:border-slate-500 rounded-md',
        'text-slate-500 dark:text-slate-400',
        'p-1',
      )}
    >
      <HeadingIcon headingTrained={headingTrained} />
    </Switch>
  )
}

const HelpButton = ({ onClick }: { onClick: () => void }) => (
  <Button onClick={onClick}>
    <InformationCircleIcon className="size-6" />
  </Button>
)

const HelpDialog = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) => (
  <Transition appear show={open}>
    <Dialog
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={onClose}
    >
      <div className="fixed inset-0 bg-black/30 w-screen">
        <div className="flex min-h-full items-start justify-center p-4">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 transform-[scale(95%)]"
            enterTo="opecity-100 transform-[scale(100%)]"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 transform-[scale(100%)]"
            leaveTo="opacity-0 transform-[scale(95%)]"
          >
            <DialogPanel
              onClick={onClose}
              className="w-full max-w-4/5 rounded-xl bg-slate-300 dark:bg-slate-600 py-2 px-5 backdrop-blur-2xl"
            >
              <DialogTitle className="my-1 font-bold">
                <div>
                  To-Do
                  <span className="text-slate-400 dark:text-slate-500">g</span>
                  List Settings:
                </div>
              </DialogTitle>
              <div className="flex flex-row gap-4 ml-2">
                <HeadingIcon headingTrained={false} />:
                <p>後ろ向きに走るのが好きな犬がいます</p>
              </div>
              <div className="flex flex-row gap-4 ml-2">
                <HeadingIcon headingTrained={true} />:
                <p>みんな前向きに走る様にトレーニングします</p>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </Transition>
)

export const Header = () => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div className="w-full flex flex-row p-5 gap-4">
      <HelpDialog open={open} onClose={() => setOpen(false)} />
      <HeadingSwitch />
      <HelpButton onClick={() => setOpen(true)} />
      <ThemeSwitch />
    </div>
  )
}
