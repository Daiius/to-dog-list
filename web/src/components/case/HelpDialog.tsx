

import {
  Transition,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'

import { HeadingIcon } from '@/components/case/HeadingIcon'

export const HelpDialog = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) => (
  <Transition appear show={open}>
    <Dialog
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={onClose}
    >
      <div className="fixed inset-0 bg-black/30 w-screen">
        <div className="flex min-h-full items-start justify-center p-4">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 transform-[scale(95%)]"
            enterTo="opecity-100 transform-[scale(100%)]"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 transform-[scale(100%)]"
            leaveTo="opacity-0 transform-[scale(95%)]"
          >
            <DialogPanel
              onClick={onClose}
              className="w-full max-w-4/5 rounded-xl bg-slate-300 dark:bg-slate-600 py-2 px-5 backdrop-blur-2xl"
            >
              <DialogTitle className="my-1 font-bold">
                <div>
                  To-Do
                  <span className="text-slate-400 dark:text-slate-500">g</span>
                  List Settings:
                </div>
              </DialogTitle>
              <div className="flex flex-row gap-4 ml-2">
                <HeadingIcon headingTrained={false} />:
                <p>後ろ向きに走るのが好きな犬がいます</p>
              </div>
              <div className="flex flex-row gap-4 ml-2">
                <HeadingIcon headingTrained={true} />:
                <p>みんな前向きに走る様にトレーニングします</p>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </Transition>
)
