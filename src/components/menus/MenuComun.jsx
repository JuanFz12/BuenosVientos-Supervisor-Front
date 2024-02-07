export function MenuComun ({ cancelName, confirmName, handleCancel, handleConfirm, cancelProps, confirmProps, className }) {
  return (
    <menu
      className={`flex w-auto items-center justify-between gap-5 ${className || ''}`}
    >
      <li>
        <button
          {...cancelProps}
          className={`boton-terciario-marca ${cancelProps?.className || ''}`}
          onClick={handleCancel}
        >
          {cancelName}
        </button>
      </li>

      <li>
        <button
          {...confirmProps}
          className={`boton-primario-marca ${confirmProps?.className || ''}`}
          onClick={handleConfirm}
        >
          {confirmName}
        </button>
      </li>
    </menu>
  )
}
