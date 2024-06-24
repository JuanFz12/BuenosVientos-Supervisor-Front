import { Agregar } from '../../assets/icons/elements/Agregar'

export function BotonAgregar ({ onClick, className = '', ...props }) {
  return (
    <button
      {...props}
      type='button'
      className={`boton-primario-marca flex-shrink-0 size-9 flex items-center justify-center p-0 ${className}`}
      onClick={onClick}
    >
      <Agregar
        color='white'
      />
    </button>
  )
}
