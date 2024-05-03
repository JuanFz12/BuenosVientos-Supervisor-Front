import { Eliminar } from '../../assets/icons/elements/Eliminar'

export function BotonEliminar ({ onClick, className, classIcon, color, width, height, ...props }) {
  return (
    <button
      {...props}
      type='button'
      onClick={onClick}
      className={className}
    >
      <Eliminar
        color={color}
        width={width}
        height={height}
        className={classIcon}
      />
    </button>
  )
}
