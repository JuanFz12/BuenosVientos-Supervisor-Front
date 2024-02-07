import { useEffect, useState } from 'react'

/**
 *
 * @param {object} props
 * @param {React.RefObject<HTMLDialogElement>} props.selfRef - Referencia al dialog
 * @param {boolean} props.overflowHidden - Indica si se debe limitar el scroll del body aplicandole la clase 'overflow-hidden'
 * @param {React.HTMLAttributes<HTMLDialogElement>} props - El resto de atributos que tendrá el dialog
 * @returns {JSX.Element}
 */
export function Dialog ({ selfRef, overflowHidden, ...props }) {
  const [key, setKey] = useState(crypto.randomUUID())

  useEffect(() => {
    const originalShow = HTMLDialogElement.prototype.showModal

    const originalClose = HTMLDialogElement.prototype.close

    HTMLDialogElement.prototype.showModal = function () {
      originalShow.call(this)
      this.classList.add('active-show')
      overflowHidden && document.body.classList.add('overflow-hidden')
    }

    HTMLDialogElement.prototype.close = function () {
      this.classList.remove('active-show')
      // setTimeout(() => {
      //   originalClose.call(this)
      // }, 250)

      function handleTransitionEnd (e) {
        if (e.target !== e.currentTarget) return
        originalClose.call(this)
        this.removeEventListener('transitionend', handleTransitionEnd)
      }

      this.addEventListener('transitionend', handleTransitionEnd)
    }

    return () => {
      HTMLDialogElement.prototype.showModal = originalShow
      HTMLDialogElement.prototype.close = originalClose
    }
  }, [overflowHidden])

  if (!selfRef) return null

  return (
    <dialog
      {...props}
      key={key}
      onClose={() => {
        setKey(crypto.randomUUID())
        overflowHidden && document.body.classList.remove('overflow-hidden')
        props?.onClose && props.onClose()
      }}
      ref={selfRef}
      className={`opacity-0 bg-transparent -translate-y-full transition-all duration-[400ms] backdrop:opacity-0 backdrop:transition-all backdrop:duration-[400ms] backdrop:ease-in-out ease-in-out scale-75 [&.active-show]:scale-100 [&.active-show]:opacity-100 [&.active-show]:translate-y-0 backdrop:[&.active-show]:opacity-100 backdrop:[&.active-show]:backdrop-blur-[3px] ${props.className || ''}`}
    />
  )
}
