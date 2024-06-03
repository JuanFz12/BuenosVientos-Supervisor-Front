import { useEffect, useRef, useState } from 'react'
import { Abajo } from '../../assets/icons/elements/Abajo'

const colorOptions = {
  verde: '!bg-verdeExito-100',

  celeste: '!bg-celeste-100',

  amarillo: '!bg-amarilloAdvertencia-100',

  neutral: '!bg-neutrales-200',

  rojo: '!bg-[#FEF3F2]'

}

// NOTA: TODO --> El selected prop deberia ser un callback que pase el value como param y deberia retornar true o false para determinar el valor del selected
/**
 * @typedef {'verde' | 'celeste' | 'amarillo' | 'neutral' | 'rojo'} Color
 */
/**
 * @param {object} props
 * @param {string} props.id - ID del select
 * @param {string} props.placeholder - Texto que aparece como placeholder
 * @param {string} props.className - Clase CSS para el contenedor, es lo mismo que selectClass
 * @param {string} props.selectClass - Clase CSS para el select, es lo mismo que className
 * @param {string} props.placeholderClass - Clase CSS para el placeholder
 * @param {string} props.labelClass - Clase CSS para el label
 * @param {string} props.listClass - Clase CSS para la lista
 * @param {number} props.maxVisibleOptions - Cantidad de opciones visibles
 * @param {string} props.optionClass - Clase CSS para las opciones
 * @param {string} props.name - Nombre del input para el form
 * @param {Array<{label: string | number, value: string | number, color?: Color}>} props.options - Lista de objetos que tienen el atributo 'label' y 'value', opcional 'img'
 * @param {string} props.arrowImg - URL de la imagen de la flecha
 * @param {string} props.arrowColor - Color de la flecha por defecto
 * @param {number} props.arrowWidth - Ancho de la flecha
 * @param {number} props.arrowHeight - Alto de la flecha
 * @param {boolean} props.visibleScroll - Indica si se debe mostrar la barra de desplazamiento de la lista
 * @param {function({value: string | number, label: string}): void} props.onChange - Función que se ejecuta al cambiar el valor
 * @param {boolean} props.disabled - Indica si el select esta deshabilitado
 * @param {function({value: string | number | null, label: string}): void} props.fnDisabled - Función que se ejecuta para indicar cuando el select debe deshabilitarse, retorna true para deshabilitar
 * @param {function({value: string | number, label: string}): void} props.onSelect - Función que se ejecuta cuando se seleccione un valor
 * @param {function(?clickEvent): void} props.onDisabled - Función que se ejecuta cuando el select este deshabilitado, se deshabilite, o se haga click cuando el select este deshabilitado
 * @param {string | number} props.selected - Es el value de un objeto de las options, es lo que sera seleccionado por defecto. Solo debe usarse esta prop si (fnSelected) no esta definido.
 * @param {function({value: string, label: string}): boolean} props.fnSelected - Función que se ejecuta para seleccionar un valor por defecto, la funcion debe retornar un boolean para determinar que elemento sera seleccionado, true --> Value selected, false --> No selected. Solo debe usarse esta prop si (selected) no esta definido.
 * @param {boolean} props.saveLabel - Indica si debe guardarse el valor del label en el input con el name dado en lugar de guardar el value, estos valores son los proporcionados por las options.
 * @param {boolean} props.listUp - Indica si la lista se muestra hacia arriba, por defecto se muestra hacia abajo
 * @returns {JSX.Element}
*/
export function Select ({ id, placeholder = 'Seleccione una opción', className, selectClass, placeholderClass = '', labelClass = '', listClass, maxVisibleOptions, optionClass, name, options, arrowImg, arrowWidth, arrowHeight, arrowColor, visibleScroll, onChange, disabled, fnDisabled, onDisabled, selected, fnSelected, saveLabel, listUp }) {
  const [label, setLabel] = useState({
    label: placeholder,
    value: ''
  })

  const itemsList = useRef()

  const [isDisabled, setIsDisabled] = useState(disabled)

  const [open, setOpen] = useState(false)

  useEffect(() => {
    setIsDisabled(false)

    if (disabled) {
      setLabel({ label: placeholder, value: '' })
      setOpen(false)
      setIsDisabled(true)

      itemsList.current && (itemsList.current.style.height = '0px')
    }
  }, [disabled, placeholder])

  useEffect(() => {
    if (fnDisabled) {
      const isDisabledNow = fnDisabled(label)

      if (!isDisabledNow) {
        setIsDisabled(false)
        return
      }

      setIsDisabled(true)
      setOpen(false)

      itemsList.current && (itemsList.current.style.height = '0px')
    }
  }, [fnDisabled, options, label])

  const originalOptions = useRef(options)

  useEffect(() => {
    if (!fnSelected || selected || !options) return

    const optionSelected = options.find(option => fnSelected(option))

    if (!optionSelected) return

    setLabel(optionSelected)
  }, [fnSelected, selected, options])

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
        value={saveLabel ? label.label : label.value}
        readOnly
      />
      <div
        tabIndex={0}
        onClick={isDisabled ? onDisabled : handleHeight}
        ref={parent}
        id={id}
        onKeyDown={e => !isDisabled && (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        className={`relative ${!isDisabled ? 'focus:border-azul-600 cursor-pointer' : 'cursor-not-allowed opacity-50'} transition-colors duration-300 ease-in-out before:content-[""] before:absolute before:inset-0 before:w-full before:h-full flex items-center justify-between gap-2 w-auto py-2 px-3 bg-superficiesInputEditable outline-none border border-bordesIdle rounded-lg h-9 ${className || selectClass || ''}`}
        role='listbox'
      >
        <span
          className={`${label.label === placeholder ? `text-textoSuave font-normal ${placeholderClass}` : `text-textoPrincipal font-medium ${labelClass}`} transition-colors duration-200 ease-in-out text-sm leading-4`}
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
                className={`transition-transform duration-200 ease-in-out ${open ? '-rotate-180' : ''}`}
                size={arrowWidth || 16}
              />
              )
        }
        <menu
          style={{ [listUp ? 'bottom' : 'top']: parent.current?.clientHeight ? `${parent.current?.clientHeight + 8}px` : '' }}
          className={`absolute z-10 overscroll-contain cursor-auto bg-superficiesInputEditable overflow-y-auto ${visibleScroll ? 'scroll-neutral' : 'scroll-hide'} rounded-lg border-azul-600 left-0 w-full overflow-clip ${listUp ? 'bottom-[42px]' : 'top-[42px]'} ${open ? 'py-2 border' : 'py-0'} px-3 h-0 transition-all duration-200 ease-in-out flex flex-col gap-1 ${listClass || ''}`}
          role='list'
          ref={itemsList}
        >
          {
            !isDisabled &&
            options &&
            options.map(({ label, value, color, img }) => {
              const bgColor = colorOptions[color]

              return (
                <li
                  key={`${label}-${value}`}
                  tabIndex={0}
                  style={
                    !bgColor
                      ? {
                          backgroundColor: color
                        }
                      : undefined
                  }
                  role='option'
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
                  className={`cursor-pointer max-w-full text-ellipsis texto-m text-textoPrincipal flex items-center ${img ? 'gap-2' : ''} px-1 py-2 rounded-lg ${bgColor || 'hover:bg-azul-100'} transition-colors duration-200 ease-out ${optionClass || ''}`}
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
              )
            })
          }
        </menu>
      </div>
    </>
  )
}
