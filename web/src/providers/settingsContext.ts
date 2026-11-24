import { createContext } from 'react'

export type Settings = {
  headingTrained: boolean // 犬の向きをそろえるかどうか
  setHeadingTrained: (newHeadingTrained: boolean) => void
}

export const SettingsContext = createContext<Settings | undefined>(undefined)
