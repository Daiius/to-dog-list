import { useState, useEffect } from 'react'

export const useMount = (): { mounted: boolean } => {
  const [mounted, setMounted] = useState<boolean>(false)
  // マウント後に一度だけ true にするのが目的なので、effect 内の setState は意図どおり
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])
  return { mounted }
}
