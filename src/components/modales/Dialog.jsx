import { useEffect, useState } from 'react'

/**
 *
 * @param {object} props - Propiedades del Dialog component
 * @param {React.RefObject<HTMLDialogElement>} props.selfRef - Referencia al dialog
 * @param {boolean} props.overflowHidden - Indica si se debe limitar el scroll del body aplicandole la clase 'overflow-hidden'
 * @param {React.ReactEventHandler<HTMLDialogElement> | undefined} props.onClose - Función que se ejecuta cuando se cierra el dialog
 * @param {boolean} props.preventRemount - Indica si el dialog debe evitar remontarse cada vez que se cierra
 * @param {string} props.className - Clases css para el dialog
 * @param {React.HTMLAttributes<HTMLDialogElement>} props - El resto de atributos que tendrá el dialog
 * @returns {JSX.Element}
 */
export function Dialog ({ selfRef, overflowHidden, onClose, preventRemount, className = '', ...props }) {
  const [key, setKey] = useState(Math.random())

  useEffect(() => {
    if (!selfRef) return

    const originalShow = selfRef.current.showModal
    const originalClose = selfRef.current.close

    selfRef.current.showModal = function () {
      originalShow.call(this)
      this.classList.add('active-show')
      overflowHidden && document.body.classList.add('overflow-hidden')
    }

    selfRef.current.close = function () {
      this.classList.remove('active-show')

      function handleTransitionEnd (e) {
        if (e.target !== e.currentTarget) return
        originalClose.call(this)
        this.removeEventListener('transitionend', handleTransitionEnd)
      }

      this.addEventListener('transitionend', handleTransitionEnd)
    }
  }, [overflowHidden, selfRef, key])

  if (!selfRef) return null

  return (
    <dialog
      {...props}
      key={key}
      onClose={e => {
        const dialogs = document.querySelectorAll('dialog')

        if (![...dialogs].some(dialog => dialog.open)) {
          overflowHidden && document.body.classList.remove('overflow-hidden')
        }

        onClose && onClose(e)
        !preventRemount && setKey(key + 1)
      }}
      ref={selfRef}
      className={`opacity-0 bg-transparent -translate-y-full transition-all duration-[400ms] backdrop:opacity-0 backdrop:transition-all backdrop:duration-[400ms] backdrop:ease-in-out ease-in-out scale-75 [&.active-show]:scale-100 [&.active-show]:opacity-100 [&.active-show]:translate-y-0 backdrop:[&.active-show]:opacity-100 backdrop:[&.active-show]:backdrop-blur-[3px] ${className}`}
    />
  )
}
