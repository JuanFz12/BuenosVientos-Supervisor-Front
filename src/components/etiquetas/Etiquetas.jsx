import './Etiquetas.css'

export function EtiquetaVerde ({ text }) {
  return (
    <span
      className='relative flex items-center gap-[6px] w-min rounded-2xl bg-verdeExito-100 text-verdeExito-700
      text-xs leading-3 font-medium text-center py-[4.5px] px-2
      before:content-[""] before:block before:w-2 before:h-2 before:rounded-full before:bg-verdeExito-600'
    >
      {text}
    </span>
  )
}

/**
 * @typedef {'verde' | 'celeste' | 'amarillo' | 'neutral' | 'rojo'} Color
 *
 * @typedef {Object} EtiquetaProps
 * @property {string} className - Clase CSS para la etiqueta.
 * @property {string} text - Texto de la etiqueta.
 * @property {Color} color - Color de la etiqueta ('verde', 'celeste' o 'amarillo').
 */
/**
 * Componente Etiqueta.
 *
 * @param {EtiquetaProps} props - Propiedades del componente.
 * @returns {JSX.Element} Elemento JSX que representa la etiqueta.
 */
export function Etiqueta ({ className = '', text, color, ...props }) {
  return (
    <span
      {...props}
      className={`relative cursor-default etiqueta ${color} flex items-center gap-[6px] minm-w-max rounded-2xl 
      text-xs leading-3 font-medium text-center py-[4.5px] px-2
      ${className}`}
    >
      {text}
    </span>
  )
}
