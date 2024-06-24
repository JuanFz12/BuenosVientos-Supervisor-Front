import { Link } from 'react-router-dom'

export function BotonDetalles ({ to, className = '', onClick, children, ...props }) {
  return (
    to
      ? (
        <Link
          to={to}
          className={`boton-fantasma-verde inline-block ${className}`}
          unstable_viewTransition
          {...props}
        >
          {children || 'Detalles'}
        </Link>
        )
      : (
        <button
          {...props}
          onClick={onClick}
          className={`boton-fantasma-verde ${className}`}
        >
          {children || 'Detalles'}
        </button>
        )
  )
}
