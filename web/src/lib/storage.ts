/** 保存済みの値があれば JSON として読み、なければ既定値を返す */
export const readStoredValue = <T>(
  storage: Pick<Storage, 'getItem'> | undefined,
  key: string,
  defaultValue: T,
): T =>
  storage?.getItem(key)
    ? JSON.parse(storage.getItem(key) ?? 'null')
    : defaultValue
