import { Notificacion } from '../../assets/icons/elements/Notificacion'

export function BotonNotificacion ({ ...props }) {
  return (
    <button
      {...props}
      className={`p-[10px] h-9 w-10 flex items-center justify-center rounded-lg bg-rojoMarca-100 ${props.className || ''}`}
      type={props.type || 'button'}
    >
      <Notificacion
        color={props.color}
      />
    </button>
  )
}
