import { Dialog } from './Dialog'

export function ModalBase ({ refModal, children, onClose, preventRemount, /* askBeforeClose = false */ overflowHidden = true, className = '', disabled = false, onClickDisabled, ...props }) {
  return (
    <Dialog
      {...props}
      overflowHidden={overflowHidden}
      className={`p-5 rounded-[32px] bg-white ${className}`}
      selfRef={refModal}
      onClose={onClose}
      preventRemount={preventRemount}
      // askBeforeClose={askBeforeClose}
      disabled={disabled}
      onClickDisabled={onClickDisabled}
    >
      {children}
    </Dialog>
  )
}
