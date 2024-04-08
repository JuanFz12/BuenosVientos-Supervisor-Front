import { Link } from 'react-router-dom'
import { Notificacion } from '../../assets/icons/elements/Notificacion'

export function BotonNotificacion ({ to, className = '', color, ...props }) {
  return (
    to
      ? (
        <Link
          to={to}
          className={`p-[10px] h-9 w-10 flex items-center justify-center rounded-lg bg-rojoMarca-100 ${className}`}
          unstable_viewTransition
          {...props}
        >
          <Notificacion
            color={color}
          />
        </Link>
        )
      : (
        <button
          {...props}
          className={`p-[10px] h-9 w-10 flex items-center justify-center rounded-lg bg-rojoMarca-100 ${className}`}
          type={props.type || 'button'}
        >
          <Notificacion
            color={color}
          />
        </button>
        )
  )
}
