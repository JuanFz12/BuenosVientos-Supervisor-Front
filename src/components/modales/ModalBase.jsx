import { Dialog } from './Dialog'

export function ModalBase ({ refModal, children, onClose, preventRemount, overflowHidden = true, className = '', ...props }) {
  return (
    <Dialog
      {...props}
      overflowHidden={overflowHidden}
      className={`p-5 rounded-[32px] bg-white ${className}`}
      selfRef={refModal}
      onClose={onClose}
      preventRemount={preventRemount}
    >
      {children}
    </Dialog>
  )
}
