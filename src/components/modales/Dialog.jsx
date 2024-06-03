import { useEffect, useState } from 'react'

// TODO LO QUE ESTA COMENTADO ES UNA PROPUESTA PARA AGREGAR UNA NUEVA PROP PARA EL DIALOG COMPONENT

// * @param {boolean | string} props.askBeforeClose - Indica si el dialog abre una ventana de confirmación antes de cerrar. Por defecto se le pasa un boolean, pero si se le pasa un string, este string se muestra en la ventana de confirmación.

/**
 *
 * @param {object} props - Propiedades del Dialog component.
 * @param {React.RefObject<HTMLDialogElement>} props.selfRef - Referencia al dialog.
 * @param {boolean} props.overflowHidden - Indica si se debe limitar el scroll del body aplicandole la clase 'overflow-hidden'.
 * @param {React.ReactEventHandler<HTMLDialogElement> | undefined} props.onClose - Función que se ejecuta cuando se cierra el dialog.
 * @param {boolean} props.preventRemount - Indica si el dialog debe evitar remontarse cada vez que se cierra.
 * @param {string} props.className - Clases css para el dialog.
 * @param {boolean} props.disabled - Indica si el dialog debe estar deshabilitado, la forma en la que se deshabilita este dialog es através de before o after de css superponiendose por encima del dialogo entero.
 * @param {React.ReactEventHandler<HTMLButtonElement> | undefined} props.onClickDisabled - Función que se ejecuta cuando se hace click en el dialog cuando se encuentra deshabilitado.
 * @param {React.HTMLAttributes<HTMLDialogElement>} props - El resto de atributos que tendrá el dialog.
 * @returns {JSX.Element}
 */
export function Dialog ({ selfRef, overflowHidden, onClose, preventRemount, /* askBeforeClose = false */ className = '', disabled = false, onClickDisabled, children, ...props }) {
  const [key, setKey] = useState(Math.random())

  useEffect(() => {
    if (!selfRef) return

    // Si es necesario, crear un estado para identificar si el dialog esta abierto o cerrado

    const originalShow = selfRef.current.showModal
    const originalClose = selfRef.current.close

    selfRef.current.showModal = function () {
      originalShow.call(this)
      this.classList.add('active-show')
      overflowHidden && document.body.classList.add('overflow-hidden')
    }

    selfRef.current.close = function () {
      // if (askBeforeClose) {
      //   const messageToShow = typeof askBeforeClose === 'string' ? askBeforeClose : '¿Desea cerrar este modal?'
      //   const isClose = window.confirm(messageToShow)

      //   if (!isClose) return
      // }

      this.classList.remove('active-show')

      function handleTransitionEnd (e) {
        if (e.target !== e.currentTarget) return
        originalClose.call(this)
        this.removeEventListener('transitionend', handleTransitionEnd)
      }

      this.addEventListener('transitionend', handleTransitionEnd)
    }
  }, [overflowHidden, selfRef, key])

  useEffect(() => {
    // Se tiene que hacer esto con un useEffect porque el selfRef no dispara un renderizado al cambiar su valor

    selfRef.current && selfRef.current
      .querySelectorAll('button')
      .forEach(button => {
        button.disabled = disabled
      })

    selfRef.current && selfRef.current.focus()
  }, [selfRef, disabled])

  if (!selfRef) return null

  return (
    <dialog
      {...props}
      key={key}
      onCancel={e => {
        if (disabled) { // si tiene la prop disabled, no se puede cerrar el dialog y se sale de la funcion
          e.preventDefault()
          // return
        }

        // if (askBeforeClose) { // si tiene la prop askBeforeClose, se previene el comportamiento por defecto de cerrar el dialog, y se llama
        //   // a la funcion close de este mismo dialog, lo cual hara que se abra la ventana de confirmacion de cerrar el dialog
        //   e.preventDefault()
        //   e.currentTarget.close()
        // }
      }}
      onClose={e => {
        const dialogs = document.querySelectorAll('dialog')

        if (![...dialogs].some(dialog => dialog.open)) {
          overflowHidden && document.body.classList.remove('overflow-hidden')
        }

        onClose && onClose(e)
        !preventRemount && setKey(key + 1)
      }}
      ref={selfRef}
      className={`relative opacity-0 bg-transparent -translate-y-full transition-all duration-[400ms] backdrop:opacity-0 backdrop:transition-all backdrop:duration-[400ms] backdrop:ease-in-out ease-in-out scale-75 [&.active-show]:scale-100 [&.active-show]:opacity-100 [&.active-show]:translate-y-0 backdrop:[&.active-show]:opacity-100 backdrop:[&.active-show]:backdrop-blur-[3px] ${className}`}
    >
      {children}

      {
        disabled && (
          <div
            key='unique-key-for-this-div'
            onClick={e => disabled && onClickDisabled && onClickDisabled(e)}
            className={`${disabled ? 'absolute z-50 size-full inset-0 bg-[rgba(231,231,231,0.34)] cursor-not-allowed' : ''} transition-colors duration-200 ease-in-out`}
          />
        )
      }
    </dialog>
  )
}
