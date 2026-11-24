import { describe, expect, it } from 'vitest'
import {
  addTask,
  canSubmitByEnter,
  nextDogIndex,
  shouldDogCome,
  shouldFlipDog,
} from './tasks'

describe('addTask', () => {
  it('末尾に足す', () => {
    expect(addTask(['散歩'], 'ごはん')).toEqual(['散歩', 'ごはん'])
  })

  it('同じタスクは重複させず、元の順番を保つ', () => {
    expect(addTask(['散歩', 'ごはん'], '散歩')).toEqual(['散歩', 'ごはん'])
  })

  it('元の配列は書き換えない', () => {
    const tasks = ['散歩']
    addTask(tasks, 'ごはん')
    expect(tasks).toEqual(['散歩'])
  })
})

describe('shouldDogCome', () => {
  it('空のリストに最初のタスクが来たら犬が来る', () => {
    expect(shouldDogCome([])).toBe(true)
  })

  it('すでに犬が向かっている（タスクがある）ときは重ねて来ない', () => {
    expect(shouldDogCome(['散歩'])).toBe(false)
  })
})

describe('nextDogIndex', () => {
  it('次の犬に交代する', () => {
    expect(nextDogIndex(0, 3)).toBe(1)
  })

  it('最後の犬の次は最初に戻る', () => {
    expect(nextDogIndex(2, 3)).toBe(0)
  })
})

describe('shouldFlipDog', () => {
  const rightFacing = { fileName: 'a.png', loveToRunBackwards: true }
  const leftFacing = { fileName: 'b.png', loveToRunBackwards: false }

  it('向きをそろえる設定なら右向きの犬だけ反転する', () => {
    expect(shouldFlipDog(true, rightFacing)).toBe(true)
    expect(shouldFlipDog(true, leftFacing)).toBe(false)
  })

  it('そろえない設定ならどの犬も反転しない', () => {
    expect(shouldFlipDog(false, rightFacing)).toBe(false)
  })
})

describe('canSubmitByEnter', () => {
  it('Enter で確定できる', () => {
    expect(canSubmitByEnter('Enter', false, '散歩')).toBe(true)
  })

  it('IME の変換確定の Enter では送らない', () => {
    expect(canSubmitByEnter('Enter', true, '散歩')).toBe(false)
  })

  it('空文字は送らない', () => {
    expect(canSubmitByEnter('Enter', false, '')).toBe(false)
  })

  it('Enter 以外のキーでは送らない', () => {
    expect(canSubmitByEnter('a', false, '散歩')).toBe(false)
  })
})
