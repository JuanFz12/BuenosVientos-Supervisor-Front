import { useRef, useState } from 'react'
import { Abajo } from '../../assets/icons/elements/Abajo'

/**
 * @param {object} props
 * @param {string} props.placeholder - Texto que aparece como placeholder
 * @param {string} props.selectClass - Clase CSS para el select
 * @param {string} props.placeholderClass - Clase CSS para el placeholder
 * @param {string} props.listClass - Clase CSS para la lista
 * @param {number} props.maxVisibleOptions - Cantidad de opciones visibles
 * @param {string} props.optionClass - Clase CSS para las opciones
 * @param {string} props.name - Nombre del input para el form
 * @param {Array<object>} props.options - Lista de objetos que tienen el atributo 'label' y 'value', opcional 'img'
 * @param {string} props.arrowImg - URL de la imagen de la flecha
 * @param {string} props.arrowColor - Color de la flecha por defecto
 * @param {number} props.arrowWidth - Ancho de la flecha
 * @param {number} props.arrowHeight - Alto de la flecha
 * @param {boolean} props.visibleScroll - Indica si se debe mostrar la barra de desplazamiento de la lista
 * @param {function({value: string, label: string}): void} props.onChange - Función que se ejecuta al cambiar el valor
 * @param {boolean} props.disabled - Indica si el select es deshabilitado
 * @returns {JSX.Element}
 */
export function Select ({ placeholder = 'Seleccione una opción', selectClass, placeholderClass, listClass, maxVisibleOptions, optionClass, name, options, arrowImg, arrowWidth, arrowHeight, arrowColor, visibleScroll, onChange, disabled }) {
  const [label, setLabel] = useState({
    label: placeholder,
    value: ''
  })

  const [open, setOpen] = useState(false)

  const parent = useRef()

  function handleHeight (e) {
    const { currentTarget } = e
    const list = currentTarget.querySelector('ul')
    if (maxVisibleOptions && list.children.length) {
      const itemHeight = list.children[0].scrollHeight
      const heightList = ((itemHeight * maxVisibleOptions) + 18) + maxVisibleOptions * 2
      const final = list.scrollHeight + 18 > heightList ? heightList : list.scrollHeight + 18
      list.style.height = list.clientHeight ? '0px' : `${final}px`
    } else {
      list.style.height = list.clientHeight ? '0px' : `${list.scrollHeight + 18}px`
    }
    setOpen(!open)
  }

  return (
    <>
      <input
        type='text'
        name={name}
        className='absolute left-1/2 top-1/2 w-0 h-0 pointer-events-none hidden'
        value={label.value}
        readOnly
      />
      <div
        tabIndex={0}
        onClick={disabled ? null : handleHeight}
        ref={parent}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        className={`relative ${!disabled ? 'focus:border-azul-600 cursor-pointer' : 'cursor-not-allowed opacity-50'} before:content-[""] before:absolute before:inset-0 before:w-full before:h-full flex items-center justify-between w-auto py-2 px-3 bg-superficiesInputEditable outline-none border border-bordesIdle rounded-lg h-9 ${selectClass || ''}`}
        role='listbox'
      >
        <span
          className={`${label.label === placeholder ? 'text-textoSuave font-normal' : 'text-textoPrincipal font-medium'} transition-colors duration-200 ease-in-out text-sm leading-4 ${placeholderClass || ''}`}
        >
          {label.label}
        </span>
        {
          arrowImg
            ? (
              <img
                src={arrowImg}
                width={arrowWidth || 16}
                height={arrowHeight || 16}
                className={`w-5 h-5 object-cover transition-transform duration-200 ease-in-out ${open ? '-rotate-180' : ''}`}
              />
              )
            : (
              <Abajo
                color={arrowColor || '#4C64A6'}
                className={`w-[${arrowWidth || 16}px] h-[${arrowHeight || 16}px] transition-transform duration-200 ease-in-out ${open ? '-rotate-180' : ''}`}
              />
              )
        }
        <ul
          className={`absolute z-10 bg-superficiesInputEditable overflow-y-auto ${visibleScroll ? 'scroll-neutral' : 'scroll-hide'} rounded-lg border-azul-600 left-0 w-full overflow-clip top-[${(parent.current?.clientHeight + 8)}px] ${open ? 'py-2 border' : 'py-0'} px-3 h-0 transition-all duration-200 ease-in-out flex flex-col gap-1 ${listClass || ''}`}
        >
          {
          options && options.map(({ label, value, img }) => (
            <li
              key={value}
              tabIndex={0}
              role='option'
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
              className={`cursor-pointer max-w-full text-ellipsis texto-m text-textoPrincipal flex items-center ${img ? 'gap-2' : ''} px-1 py-2 rounded-lg hover:bg-azul-100 transition-colors duration-200 ease-out ${optionClass || ''}`}
              onClick={() => {
                setLabel({ label, value })
                onChange && onChange({ label, value })
              }}
            >
              {
                img && (
                  <img src={img} className='w-5 h-5 object-cover' />
                )
              }
              {label}
            </li>
          ))
        }
        </ul>
      </div>
    </>
  )
}
