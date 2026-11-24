import { useContext } from 'react'
import { SettingsContext } from '@/providers/settingsContext'

export const useSettings = () =>
  useContext(SettingsContext) ??
  (() => {
    throw new Error('useSettings() is called out of the context!')
  })()
