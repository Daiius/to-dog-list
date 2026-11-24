import { useState, useEffect } from 'react'
import { readStoredValue } from '@/lib/storage'

export type UseLocalStorageArgs<T> = {
  defaultValue: T
  key: string
  mounted: boolean
}

export type UseLocalStorage<T> = {
  value: T
  update: (newData: T) => void
  isLoaded: boolean
}

export const useLocalStorage = <T>({
  defaultValue,
  key,
  mounted,
}: UseLocalStorageArgs<T>): UseLocalStorage<T> => {
  const [currentValue, setCurrentValue] = useState<T>(defaultValue)

  useEffect(() => {
    if (mounted) {
      // localStorageからの読み出しが済んでいるはず
      // 値の書き換えを行う
      localStorage?.setItem(key, JSON.stringify(currentValue))
    } else {
      // localStorageに初期値が存在していれば、読みだす
      // 外部（localStorage）から初回だけ読み込むための setState なので意図どおり
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentValue(readStoredValue(localStorage, key, defaultValue))
    }
  }, [currentValue])

  return {
    value: currentValue,
    update: setCurrentValue,
    isLoaded: mounted,
  }
}
