export function BotonCerrar ({ onClick, className = '', children, ...props }) {
  return (
    <button
      {...props}
      onClick={onClick}
      type={props.type || 'button'}
      className={`boton-secundario-marca w-[160px] ${className}`}
    >
      {children || 'Cerrar'}
    </button>
  )
}
