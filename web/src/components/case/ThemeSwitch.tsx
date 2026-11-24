import { clsx } from 'clsx'
import type { ReactNode } from 'react'

import { useTheme } from 'next-themes'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import { MoonIcon } from '@/components/base/MoonIcon'
import { SunIcon } from '@/components/base/SunIcon'
import { ComputerDesktopIcon } from '@/components/base/ComputerDesktopIcon'
import { ChevronDownIcon } from '@/components/base/ChevronDownIcon'

const themes = ['light', 'dark', 'system'] as const
type Themes = (typeof themes)[number]

const themeIcons: {
  [theme in Themes]: ReactNode
} = {
  dark: <MoonIcon className="size-6" />,
  light: <SunIcon className="size-6" />,
  system: <ComputerDesktopIcon className="size-6" />,
}

// アイコンだけのボタンなので、読み上げ用の名前を別に持つ
const themeLabels: { [theme in Themes]: string } = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
}

export const ThemeSwitch = ({ className }: { className?: string }) => {
  const { setTheme, theme } = useTheme()
  // next-themes 0.4 は Provider の useState 初期化子で localStorage を同期的に読むので、
  // SPA では初回の描画から theme が入っている（未保存なら defaultTheme の 'system'）。
  // 万一 undefined や想定外の値でも 'system' のアイコンに倒す
  const currentTheme = (
    theme != null && theme in themeIcons ? theme : 'system'
  ) as Themes

  return (
    <div className={clsx('w-16 h-10', className)}>
      <Menu>
        <MenuButton
          aria-label={`Theme: ${themeLabels[currentTheme]}`}
          className={clsx(
            'inline-flex items-center',
            'rounded-md w-16 h-10',
            'border border-slate-300 dark:border-slate-500',
            'text-slate-500 dark:text-slate-400',
            'relative',
          )}
        >
          <div className="absolute left-2">{themeIcons[currentTheme]}</div>
          <ChevronDownIcon className="absolute size-6 right-1" />
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom start"
          className={clsx(
            'w-16 origin-top-right rounded-md',
            'border border-white/5 bg-black/5 dark:bg-white/5',
            'flex flex-col items-center',
            'text-slate-500 dark:text-slate-300',
          )}
        >
          {themes.map((theme) => (
            <MenuItem key={theme}>
              <button
                aria-label={themeLabels[theme]}
                className={clsx(
                  'h-10 w-full',
                  'dark:hover:bg-white/10 hover:bg-black/10',
                  // 矢印キーで選んでいる項目にも同じ色を付ける
                  'dark:data-focus:bg-white/10 data-focus:bg-black/10',
                  'flex flex-col items-center justify-center',
                )}
                onClick={() => setTheme(theme)}
              >
                {themeIcons[theme]}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  )
}
