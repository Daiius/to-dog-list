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

  it('保存値が JSON として壊れていれば既定値を返し、保存値は消さない', () => {
    const items = { k: '{broken' }
    expect(readStoredValue(storageOf(items), 'k', true)).toBe(true)
    expect(items).toEqual({ k: '{broken' })
  })
})
