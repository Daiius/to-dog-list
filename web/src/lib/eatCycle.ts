// 犬が来てタスクを食べて帰る一巡りを、時刻や実タイマーに依らない状態遷移として表したもの
//
// idle ──add──▶ coming ──eat(3s)──▶ eating ──leave(4s)──▶ leaving ──finish(5s)──▶ idle
//
// - coming / eating の間に足したタスクは、同じ犬が 4s にまとめて食べる
// - leaving（リストは空、食べた見た目はまだ残る）で足したタスクは、その巡りを
//   その場で終わらせ、次の犬の新しい巡りとして始める
// - タイマーの事象は巡りの番号（round）を持ち、いまの巡りと違えば無視する

import { addTask, nextDogIndex, shouldDogCome } from './tasks'

export type EatPhase = 'idle' | 'coming' | 'eating' | 'leaving'

export type EatCycleState = {
  phase: EatPhase
  tasks: string[]
  dogIndex: number
  /** 巡りの番号。新しい巡りが始まるたびに 1 増える */
  round: number
}

export type TimedEventType = 'eat' | 'leave' | 'finish'

export type EatCycleEvent =
  | { type: 'add'; task: string }
  | { type: TimedEventType; round: number }

/** 巡りの開始からの各事象の時刻（ミリ秒）。アニメーション come（5s）に合わせてある */
export const ROUND_SCHEDULE: readonly { at: number; type: TimedEventType }[] = [
  { at: 3000, type: 'eat' },
  { at: 4000, type: 'leave' },
  { at: 5000, type: 'finish' },
]

export const initialEatCycleState = (dogIndex = 0): EatCycleState => ({
  phase: 'idle',
  tasks: [],
  dogIndex,
  round: 0,
})

/** タスクを食べた見た目（フェードアウト）にするか */
export const isEaten = (state: EatCycleState): boolean =>
  state.phase === 'eating' || state.phase === 'leaving'

const startRound = (
  state: EatCycleState,
  task: string,
  dogIndex: number,
): EatCycleState => ({
  phase: 'coming',
  tasks: [task],
  dogIndex,
  round: state.round + 1,
})

export const eatCycleReducer = (
  dogCount: number,
): ((state: EatCycleState, event: EatCycleEvent) => EatCycleState) => {
  return (state, event) => {
    if (event.type === 'add') {
      if (!shouldDogCome(state.tasks)) {
        return { ...state, tasks: addTask(state.tasks, event.task) }
      }
      // leaving 中なら前の巡りをここで終わらせ、次の犬で始める
      const dogIndex =
        state.phase === 'leaving'
          ? nextDogIndex(state.dogIndex, dogCount)
          : state.dogIndex
      return startRound(state, event.task, dogIndex)
    }

    // 前の巡りのタイマーは、いまの巡りを書き換えない
    if (event.round !== state.round) return state

    switch (event.type) {
      case 'eat':
        return state.phase === 'coming' ? { ...state, phase: 'eating' } : state
      case 'leave':
        return state.phase === 'eating'
          ? { ...state, phase: 'leaving', tasks: [] }
          : state
      case 'finish':
        return state.phase === 'leaving'
          ? {
              ...state,
              phase: 'idle',
              dogIndex: nextDogIndex(state.dogIndex, dogCount),
            }
          : state
    }
  }
}
