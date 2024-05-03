import { useEffect, useRef, useState } from 'react'
import { Abajo } from '../../assets/icons/elements/Abajo'

/**
 * @param {object} props
 * @param {string} props.placeholder - Texto que aparece como placeholder
 * @param {string} props.className - Clase CSS para el contenedor, es lo mismo que selectClass
 * @param {string} props.selectClass - Clase CSS para el select, es lo mismo que className
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
 * @param {boolean} props.disabled - Indica si el select esta deshabilitado
 * @param {function(?clickEvent): void} props.onDisabled - Función que se ejecuta cuando el select este deshabilitado, se deshabilite, o se haga click cuando el select este deshabilitado
 * @param {object} props.selected - Es el value de un objeto de las options, es lo que sera seleccionado por defecto
 * @returns {JSX.Element}
 */
export function Select ({ placeholder = 'Seleccione una opción', className, selectClass, placeholderClass, listClass, maxVisibleOptions, optionClass, name, options, arrowImg, arrowWidth, arrowHeight, arrowColor, visibleScroll, onChange, disabled, onDisabled, selected }) {
  const [label, setLabel] = useState({
    label: placeholder,
    value: ''
  })

  const originalOptions = useRef(options)

  useEffect(() => {
    if (disabled) {
      setLabel({
        label: placeholder,
        value: ''
      })

      onDisabled && onDisabled()

      setOpen(false)

      itemsList.current.style.height = '0px'
    }
  }, [placeholder, disabled, onDisabled])

  useEffect(() => {
    if (selected && options.length) {
      const option = options.find(({ value }) => value === selected)

      if (!option) return

      setLabel(option)

      onChange && onChange(option)

      itemsList.current.style.height = '0px'
      setOpen(false)
    }
  }, [selected, options, onChange])

  useEffect(() => {
    function isIqualOptions (ops) {
      const orgOptions = originalOptions.current

      if (ops?.length !== orgOptions?.length) return false

      const result = ops.some(({ label, value }, idx) => {
        return label !== orgOptions?.[idx]?.label || value !== orgOptions?.[idx]?.value
      })

      return !result
    }

    function reduceHeight () {
      setOpen(false)

      const list = itemsList.current

      list.style.height = '0px'
    }

    if (!options || !options.length) {
      reduceHeight()
      // si es necesario aqui tambien disparar el onChange
      setLabel({ label: placeholder, value: '' })
      originalOptions.current = options

      return
    }

    if (isIqualOptions(options)) {
      reduceHeight()
      return
    }

    if (!isIqualOptions(options)) {
      reduceHeight()
      setLabel({ label: placeholder, value: '' })
      originalOptions.current = options
    }
  }, [options, placeholder])

  const itemsList = useRef()

  const [open, setOpen] = useState(false)

  const parent = useRef()

  function handleHeight () {
    const list = itemsList.current
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
        className='absolute inset-1/2 w-0 h-0 pointer-events-none'
        value={label.value}
        readOnly
      />
      <div
        tabIndex={0}
        onClick={disabled ? onDisabled : handleHeight}
        ref={parent}
        onKeyDown={e => !disabled && (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        className={`relative ${!disabled ? 'focus:border-azul-600 cursor-pointer' : 'cursor-not-allowed opacity-50'} transition-colors duration-300 ease-in-out before:content-[""] before:absolute before:inset-0 before:w-full before:h-full flex items-center justify-between gap-2 w-auto py-2 px-3 bg-superficiesInputEditable outline-none border border-bordesIdle rounded-lg h-9 ${className || selectClass || ''}`}
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
          style={{ top: parent.current?.clientHeight ? `${parent.current?.clientHeight + 8}px` : '' }}
          className={`absolute z-10 overscroll-contain cursor-auto bg-superficiesInputEditable overflow-y-auto ${visibleScroll ? 'scroll-neutral' : 'scroll-hide'} rounded-lg border-azul-600 left-0 w-full overflow-clip top-[42px] ${open ? 'py-2 border' : 'py-0'} px-3 h-0 transition-all duration-200 ease-in-out flex flex-col gap-1 ${listClass || ''}`}
          role='list'
          ref={itemsList}
        >
          {
            !disabled && options && options.map(({ label, value, img }) => (
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
