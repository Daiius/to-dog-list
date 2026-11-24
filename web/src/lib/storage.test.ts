import { describe, expect, it } from 'vitest'
import { readStoredValue } from './storage'

const storageOf = (items: Record<string, string>) => ({
  getItem: (key: string) => items[key] ?? null,
})

describe('readStoredValue', () => {
  it('保存済みの値を JSON として読む', () => {
    expect(readStoredValue(storageOf({ k: 'false' }), 'k', true)).toBe(false)
  })

  it('保存されていなければ既定値を返す', () => {
    expect(readStoredValue(storageOf({}), 'k', true)).toBe(true)
  })

  it('storage が無ければ既定値を返す', () => {
    expect(readStoredValue(undefined, 'k', true)).toBe(true)
  })
})
