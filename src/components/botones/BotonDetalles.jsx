export function BotonDetalles ({ ...props }) {
  return (
    <button
      {...props}
      className={`boton-fantasma-verde ${props.className || ''}`}
    />
  )
}
