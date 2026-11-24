import { Button } from '@headlessui/react'
import { InformationCircleIcon } from '@/components/base/InformationCircleIcon'

export const HelpButton = ({ onClick }: { onClick: () => void }) => (
  <Button onClick={onClick} aria-label="Help">
    <InformationCircleIcon className="size-6" />
  </Button>
)
