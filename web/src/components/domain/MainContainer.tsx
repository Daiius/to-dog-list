import { useEffect, useReducer } from 'react'
import clsx from 'clsx'

import { TaskInput } from '@/components/case/TaskInput'
import { TaskList } from '@/components/case/TaskList'
import { useSettings } from '@/hooks/useSettings'
import { shouldFlipDog, type DogData } from '@/lib/tasks'
import {
  ROUND_SCHEDULE,
  eatCycleReducer,
  initialEatCycleState,
  isEaten,
} from '@/lib/eatCycle'

const dogData: DogData[] = [
  { fileName: 'dog_belgian_groenendael.png', loveToRunBackwards: true },
  { fileName: 'dog_bernese_mountain.png', loveToRunBackwards: false },
  { fileName: 'dog_borzoi.png', loveToRunBackwards: false },
  { fileName: 'dog_english_springer_spaniel.png', loveToRunBackwards: false },
  { fileName: 'dog_great_dane.png', loveToRunBackwards: false },
  { fileName: 'dog_great_pyrenees.png', loveToRunBackwards: true },
  { fileName: 'dog_italian_greyhound2.png', loveToRunBackwards: false },
  { fileName: 'dog_kooikerhondje.png', loveToRunBackwards: false },
  {
    fileName: 'dog_shetland_sheepdog_blue_merle.png',
    loveToRunBackwards: true,
  },
  { fileName: 'dog_shetland_sheepdog.png', loveToRunBackwards: true },
  { fileName: 'dog_american_cocker_spaniel.png', loveToRunBackwards: true },
]

const reducer = eatCycleReducer(dogData.length)

export const MainContainer = () => {
  const [state, dispatch] = useReducer(reducer, undefined, () =>
    initialEatCycleState(),
  )
  const { tasks, dogIndex, round } = state
  const eaten = isEaten(state)
  const { headingTrained } = useSettings()

  // 巡りが始まるたびにその巡りのタイマーを張る。巡りが替わるか外れたら片付ける
  useEffect(() => {
    if (round === 0) return
    const timerIds = ROUND_SCHEDULE.map(({ at, type }) =>
      setTimeout(() => dispatch({ type, round }), at),
    )
    return () => timerIds.forEach(clearTimeout)
  }, [round])

  return (
    <div
      className={clsx(
        'max-h-[70vh] self-center p-5',
        // NOTE: relativeとoverflow-hiddenの組み合わせ、ほぼ必須と思われます
        //  犬の画像が画面横幅と同じ幅を持ったdiv要素に囲まれて、
        //  画面の右端外に描画されるのですが、
        //  relativeがなくてもoverflow-hiddenがなくても横スクロールバーが表示されてしまいます
        'overflow-hidden relative',
      )}
    >
      {/*
          TaskListの端から端まで犬を移動させたい
          こういう場合には、TaskListと同じ幅を持つラッパー要素を
          使うのがよいらしい
          （横向きのスクロールバーが表示されそうだがそれは対処できる？）
        */}
      <TaskList
        eaten={eaten}
        tasks={tasks}
        className={clsx('mb-5 w-[calc(100vw-6rem)]')}
      />
      <div
        className={clsx(
          'absolute translate-x-full top-0 w-full',
          'pointer-events-none h-fit',
          'opacity-100',
          tasks.length > 0 && 'animate-come-and-eat',
          'overflow-hidden',
          'z-40',
        )}
      >
        <img
          className={clsx(
            'h-auto',
            tasks.length > 0 ? 'opacity-100' : 'opacity-0',
            shouldFlipDog(headingTrained, dogData[dogIndex]) && '-scale-x-100',
          )}
          alt="cute dog"
          width={150}
          height={150}
          src={'/dogs/' + dogData[dogIndex].fileName}
        />
      </div>
      <TaskInput
        className="mb-5 w-[calc(100vw-4rem)]"
        autoFocus
        onAddTask={(task) => dispatch({ type: 'add', task })}
      />
    </div>
  )
}
