/**
 * 保存済みの値があれば JSON として読み、なければ既定値を返す。
 * 保存値が壊れていて JSON として読めないときも既定値を返す（保存値そのものには触らない）
 */
export const readStoredValue = <T>(
  storage: Pick<Storage, 'getItem'> | undefined,
  key: string,
  defaultValue: T,
): T => {
  const stored = storage?.getItem(key)
  if (!stored) return defaultValue
  try {
    return JSON.parse(stored)
  } catch {
    return defaultValue
  }
}
