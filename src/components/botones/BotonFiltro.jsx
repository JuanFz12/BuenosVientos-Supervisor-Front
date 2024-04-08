import { Filtros } from '../../assets/icons/elements/Filtros'

export function BotonFiltro ({ ...props }) {
  return (
    <button
      {...props}
      className={`p-[10px] h-9 w-10 flex items-center justify-center rounded-lg bg-rojoMarca-100 ${props.className || ''}`}
      type={props.type || 'button'}
    >
      <Filtros
        fill={props.color || '#E43530'}
      />
    </button>
  )
}
