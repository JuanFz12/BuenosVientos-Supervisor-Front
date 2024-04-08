import { Link } from 'react-router-dom'
import flecha from '/src/assets/icons/simpleFlecha.svg'

/**
 *
 * @param {object} props
 * @param {string} props.text - El texto del botón.
 * @param {boolean} props.left - Indica si la flecha debe apuntar a la izquierda, por defecto apunta a la derecha.
 * @param {string} props.url - La url de la página a la que se redireccionará.
 * @returns {JSX.Element}
 */
export function BotonPaginacion ({ text, left, url, ...props }) {
  return (
    !url
      ? (
        <button
          disabled
          type='button'
          className={`flex flex-shrink-0 opacity-65 cursor-not-allowed items-center gap-2 text-sm font-medium leading-5 text-textoPrincipal px-[17px] py-[10px] rounded-lg border border-bordesSeparador ${props.className || ''}`}
        >
          <img
            src={flecha}
            className={left ? '' : '-rotate-180'}
          />
          {text}
        </button>
        )
      : (
        <Link
          {...props}
          to={url}
          unstable_viewTransition
          className={`flex flex-shrink-0 items-center gap-2 text-sm font-medium leading-5 text-textoPrincipal px-[17px] py-[10px] rounded-lg border border-bordesSeparador ${props.className || ''}`}
        >
          <img
            src={flecha}
            className={left ? '' : '-rotate-180'}
          />
          {text}
        </Link>
        )
  )
}
