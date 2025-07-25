
import { clsx } from 'clsx'

import { DogIcon } from '@/components/base/DogIcon'

export const HeadingIcon = ({ headingTrained }: { headingTrained: boolean }) => (
  <div className="flex flex-row">
    <DogIcon
      className="
      fill-slate-400 w-5 h-5 stroke-[10px] stroke-slate-400"
    />
    <DogIcon
      className={clsx(
        'w-5 h-5 stroke-[10px] stroke-slate-400 -scale-x-100',
        headingTrained ? 'fill-none' : 'fill-slate-400',
      )}
    />
  </div>
)
