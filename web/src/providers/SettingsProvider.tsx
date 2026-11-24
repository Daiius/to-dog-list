import type { ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { SettingsContext } from '@/providers/settingsContext'

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const { value: headingTrained, update: setHeadingTrained } =
    useLocalStorage<boolean>({
      key: 'headingTrained',
      defaultValue: true,
    })

  return (
    <SettingsContext.Provider
      value={{
        headingTrained,
        setHeadingTrained,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
