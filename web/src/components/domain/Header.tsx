'use client'

import { useState } from 'react'


import { ThemeSwitch } from '@/components/case/ThemeSwitch'
import { HelpDialog } from '@/components/case/HelpDialog'
import { HeadingSwitch } from '@/components/case/HeadingSwitch'
import { HelpButton } from '@/components/case/HelpButton'

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
