import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ROUND_SCHEDULE,
  eatCycleReducer,
  initialEatCycleState,
  isEaten,
  type EatCycleEvent,
  type EatCycleState,
} from './eatCycle'

const DOG_COUNT = 3
const reduce = eatCycleReducer(DOG_COUNT)
const run = (events: EatCycleEvent[], state = initialEatCycleState()) =>
  events.reduce(reduce, state)

describe('eatCycleReducer', () => {
  it('空のリストに足すと新しい巡りが始まる', () => {
    const s = run([{ type: 'add', task: 'A' }])
    expect(s).toEqual({ phase: 'coming', tasks: ['A'], dogIndex: 0, round: 1 })
  })

  it('一巡りで eating → leaving → idle と進み、最後に次の犬に交代する', () => {
    const s1 = run([
      { type: 'add', task: 'A' },
      { type: 'eat', round: 1 },
    ])
    expect(s1.phase).toBe('eating')
    expect(isEaten(s1)).toBe(true)

    const s2 = reduce(s1, { type: 'leave', round: 1 })
    expect(s2).toMatchObject({ phase: 'leaving', tasks: [], dogIndex: 0 })
    expect(isEaten(s2)).toBe(true)

    const s3 = reduce(s2, { type: 'finish', round: 1 })
    expect(s3).toMatchObject({ phase: 'idle', tasks: [], dogIndex: 1 })
    expect(isEaten(s3)).toBe(false)
  })

  it('coming / eating 中に足したタスクは同じ巡りに加わる', () => {
    const coming = run([
      { type: 'add', task: 'A' },
      { type: 'add', task: 'B' },
    ])
    expect(coming).toMatchObject({ tasks: ['A', 'B'], round: 1 })

    const eating = run([{ type: 'eat', round: 1 }], coming)
    const s = reduce(eating, { type: 'add', task: 'C' })
    expect(s).toMatchObject({ phase: 'eating', tasks: ['A', 'B', 'C'] })
    expect(reduce(s, { type: 'leave', round: 1 }).tasks).toEqual([])
  })

  it('leaving 中に足すと前の巡りを終え、次の犬で新しい巡りを始める', () => {
    const leaving = run([
      { type: 'add', task: 'A' },
      { type: 'eat', round: 1 },
      { type: 'leave', round: 1 },
    ])
    const s = reduce(leaving, { type: 'add', task: 'B' })
    expect(s).toEqual({ phase: 'coming', tasks: ['B'], dogIndex: 1, round: 2 })
    expect(isEaten(s)).toBe(false)
  })

  it('前の巡りのタイマーは新しい巡りを書き換えない', () => {
    const s = run([
      { type: 'add', task: 'A' },
      { type: 'eat', round: 1 },
      { type: 'leave', round: 1 },
      { type: 'add', task: 'B' },
    ])
    expect(reduce(s, { type: 'finish', round: 1 })).toBe(s)
    expect(reduce(s, { type: 'eat', round: 1 })).toBe(s)
  })

  it('最後の犬の次は最初の犬に戻る', () => {
    const s = run(
      [
        { type: 'add', task: 'A' },
        { type: 'eat', round: 1 },
        { type: 'leave', round: 1 },
        { type: 'finish', round: 1 },
      ],
      { ...initialEatCycleState(DOG_COUNT - 1) },
    )
    expect(s.dogIndex).toBe(0)
  })
})

// MainContainer と同じく、巡りが変わるたびに ROUND_SCHEDULE のタイマーを張り直す
const createDriver = () => {
  let state = initialEatCycleState()
  let timers: ReturnType<typeof setTimeout>[] = []
  const dispatch = (event: EatCycleEvent) => {
    const prev = state
    state = reduce(state, event)
    if (state.round !== prev.round) {
      timers.forEach(clearTimeout)
      const round = state.round
      timers = ROUND_SCHEDULE.map(({ at, type }) =>
        setTimeout(() => dispatch({ type, round }), at),
      )
    }
  }
  return { dispatch, get: (): EatCycleState => state }
}

describe('時刻に沿った流れ（偽のタイマー）', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  const at = (ms: number) => vi.advanceTimersByTime(ms - Date.now())

  it('A を 0.3s に足すだけ: 3.3s に食べ 4.3s に消え 5.3s に次の犬', () => {
    vi.setSystemTime(0)
    const d = createDriver()
    at(300)
    d.dispatch({ type: 'add', task: 'A' })
    at(3299)
    expect(isEaten(d.get())).toBe(false)
    at(3300)
    expect(isEaten(d.get())).toBe(true)
    at(4300)
    expect(d.get().tasks).toEqual([])
    at(5299)
    expect(d.get().dogIndex).toBe(0)
    at(5300)
    expect(d.get()).toMatchObject({ phase: 'idle', dogIndex: 1 })
  })

  it('A 0.3s + B 3.3s: B も 4.3s に一緒に食べられる', () => {
    vi.setSystemTime(0)
    const d = createDriver()
    at(300)
    d.dispatch({ type: 'add', task: 'A' })
    at(3300)
    d.dispatch({ type: 'add', task: 'B' })
    expect(d.get().tasks).toEqual(['A', 'B'])
    at(4300)
    expect(d.get().tasks).toEqual([])
    at(5300)
    expect(d.get()).toMatchObject({ phase: 'idle', dogIndex: 1, round: 1 })
  })

  it('A 0.3s + B 4.8s: B は普通に見え、次の犬が途中で入れ替わらずに食べる', () => {
    vi.setSystemTime(0)
    const d = createDriver()
    at(300)
    d.dispatch({ type: 'add', task: 'A' })
    at(4800)
    d.dispatch({ type: 'add', task: 'B' })
    expect(d.get()).toMatchObject({
      phase: 'coming',
      tasks: ['B'],
      dogIndex: 1,
    })
    expect(isEaten(d.get())).toBe(false)

    // 前の巡りの 5.3s を過ぎても犬は変わらず、B も見えたまま
    at(5300)
    expect(d.get()).toMatchObject({
      phase: 'coming',
      tasks: ['B'],
      dogIndex: 1,
    })
    at(7799)
    expect(isEaten(d.get())).toBe(false)
    at(7800)
    expect(isEaten(d.get())).toBe(true)
    at(8800)
    expect(d.get().tasks).toEqual([])
    at(9799)
    expect(d.get().dogIndex).toBe(1)
    at(9800)
    expect(d.get()).toMatchObject({ phase: 'idle', dogIndex: 2, round: 2 })
  })
})
