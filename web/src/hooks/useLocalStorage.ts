import { useState, useEffect } from 'react'
import { readStoredValue } from '@/lib/storage'

export type UseLocalStorageArgs<T> = {
  defaultValue: T
  key: string
}

export type UseLocalStorage<T> = {
  value: T
  update: (newData: T) => void
}

export const useLocalStorage = <T>({
  defaultValue,
  key,
}: UseLocalStorageArgs<T>): UseLocalStorage<T> => {
  // Vite の SPA で SSR は無いので、初回の描画の時点で localStorage から読める
  const [currentValue, setCurrentValue] = useState<T>(() =>
    readStoredValue(localStorage, key, defaultValue),
  )

  // 値が変わるたびに書き戻す（形式は従来どおり JSON.stringify）
  useEffect(() => {
    localStorage?.setItem(key, JSON.stringify(currentValue))
  }, [key, currentValue])

  return {
    value: currentValue,
    update: setCurrentValue,
  }
}
