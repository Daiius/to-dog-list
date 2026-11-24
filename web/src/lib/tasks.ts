// 犬がタスクを食べる流れのうち、描画に依らない判定をまとめたもの

export type DogData = {
  fileName: string
  loveToRunBackwards: boolean // 右向きの画像ならtrue
}

/** 新しいタスクを末尾に足す。同じ文字列のタスクは重複させない */
export const addTask = (tasks: string[], newTask: string): string[] => [
  ...new Set([...tasks, newTask]),
]

/** リストが空のところへ最初のタスクが来たときだけ、犬が食べに来る */
export const shouldDogCome = (tasks: string[]): boolean => tasks.length === 0

/** 食べ終わったら次の犬に交代する（最後の犬の次は最初に戻る） */
export const nextDogIndex = (index: number, dogCount: number): number =>
  (index + 1) % dogCount

/** 向きをそろえる設定のとき、右向きの画像を左右反転する */
export const shouldFlipDog = (headingTrained: boolean, dog: DogData): boolean =>
  headingTrained && dog.loveToRunBackwards

/** Enter で確定できるか。IME の変換中と空文字は送らない */
export const canSubmitByEnter = (
  key: string,
  isComposing: boolean,
  newTask: string,
): boolean => !isComposing && key === 'Enter' && newTask.length > 0
