import { BotonCerrar } from '../botones/BotonCerrar'
import { Dialog } from './Dialog'

export function VerImagenModal ({ refModal: thisModal, onClose, srcImage }) {
  return (
    <Dialog
      selfRef={thisModal}
      className='w-[min(540px,100%)] h-[min(596px,100%)] max-h-[85dvh]'
    >
      <section
        className='bg-white max-w-full w-full h-full max-h-full gap-5 flex flex-col p-5 rounded-modal overflow-x-clip overflow-y-auto scroll-neutral'
      >
        <div
          className='relative w-full h-[500px] max-h-full flex items-center justify-center'
        >
          <img
            src={srcImage}
            className='absolute inset-0 z-10 blur-[50px] saturate-200 contrast-200 w-full h-full max-w-full max-h-full object-contain rounded-xl'
          />
          <img
            src={srcImage}
            className='z-10 w-full max-h-full object-contain rounded-xl'
          />
        </div>

        <BotonCerrar
          className='self-center w-[min(200px,100%)]'
          onClick={e => {
            e.stopPropagation()
            thisModal.current.close()
          }}
        />
      </section>
    </Dialog>
  )
}
