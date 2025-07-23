import { useState, useEffect } from 'react'

export const useMount = (): { mounted: boolean } => {
  const [mounted, setMounted] = useState<boolean>(false)
  useEffect(() => setMounted(true), [])
  return { mounted }
}
