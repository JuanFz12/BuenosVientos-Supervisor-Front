import { Dialog } from './Dialog'

export function ModalBase ({ refModal, children, overflowHidden = true, ...props }) {
  return (
    <Dialog
      {...props}
      overflowHidden={overflowHidden}
      className='p-5 rounded-[32px] bg-white'
      selfRef={refModal}
    >
      {children}
    </Dialog>
  )
}
