import { useEffect, useRef, useState } from 'react'
import { TextInput } from '../inputs/TextInput'

export function InputSelect ({
  name,
  placeholder,
  options,
  visibleScroll,
  listClass,
  optionClass,
  className = '',
  classError = '',
  onSelect,
  onDeselect,
  onChange,
  maxVisibleOptions,
  maxOptions,
  defaultLabel,
  defaultValue,
  readOnly,
  errMessage,
  required
}) {
  const [labelInput, setLabelInput] = useState({
    label: '',
    value: ''
  })

  const initialOptions = useRef(options)

  // ARREGLAR Y REFACTORIZAR ESTE COMPONENTE URGENTEMENTE

  useEffect(() => {
    setLabelInput({
      label: defaultLabel ?? '',
      value: defaultValue ?? ''
    })
  }, [defaultLabel, defaultValue])

  const [internOptions, setInternOptions] = useState([])

  // arreglar todo este lio
  useEffect(() => {
    function isIqualOptions (options) {
      const orgOptions = initialOptions.current

      if (options?.length !== orgOptions?.length) return false

      const result = options.some(({ label, value }, idx) => {
        return label !== orgOptions?.[idx]?.label || value !== orgOptions?.[idx]?.value
      })

      return !result
    }

    function reduceHeight () {
      setOpenList(false)

      const list = itemsList.current

      list.style.height = '0px'
    }

    if (!options || !options.length) {
      // si es necesario aqui tambien disparar el onSelect
      reduceHeight()
      setLabelInput({ label: defaultLabel ?? '', value: defaultValue ?? '' })

      setInternOptions(options)
      initialOptions.current = options

      return
    }

    if (!isIqualOptions(options)) {
      initialOptions.current = options
      setLabelInput({ label: defaultLabel ?? '', value: defaultValue ?? '' })
    }
    reduceHeight()

    setInternOptions(options)
  }, [options, defaultLabel, defaultValue])

  const [openList, setOpenList] = useState(false)

  const itemsList = useRef()

  function handleHeight (e) {
    const list = itemsList.current

    if (e.type === 'blur' && e.currentTarget.contains(e.relatedTarget)) {
      return
    }

    if (openList || e.type === 'blur') {
      list.style.height = '0px'
      setOpenList(false)
      return
    }

    setOpenList(!openList)

    if (maxVisibleOptions && list.children.length) {
      const itemHeight = list.children[0].scrollHeight
      const heightList = ((itemHeight * maxVisibleOptions) + 18) + maxVisibleOptions * 2
      const final = list.scrollHeight + 18 > heightList ? heightList : list.scrollHeight + 18
      list.style.height = list.clientHeight ? '0px' : `${final}px`
    } else {
      list.style.height = list.clientHeight ? '0px' : `${list.scrollHeight + 18}px`
    }
  }

  function handleChange (e) {
    setOpenList(true)
    // no tiene sentido setear el mismo estado dos veces, luego lo cambiare y refactorizare pero por ahora no
    setLabelInput(prev => ({ ...prev, label: e.target.value }))

    if (!options) return onChange && onChange(e)

    const newOptions = options.filter(({ label }) => label.toLowerCase().includes(e.target.value.toLowerCase()))

    if (!e.target.value) {
      onDeselect && onDeselect()
    }
    // arreglar este desorden
    // const prevOptions = internOptions
    // // if (
    // //   newOptions.length === 1 &&
    // //   prevOptions[0]?.label.length === labelInput.label.length &&
    // //   newOptions[0].label.length !== e.target.value.length
    // // ) {
    // //   onDeselect && onDeselect({ label: prevOptions[0].label, value: prevOptions[0].value })
    // // }

    if (newOptions.length === 1) {
      const isValid = newOptions[0].label.toLowerCase() === e.target.value.toLowerCase()

      if (isValid) {
        onSelect && onSelect({ label: newOptions[0].label, value: newOptions[0].value })
      }
      setLabelInput(prev => ({ ...prev, value: isValid ? newOptions[0].value : '' }))
    } else if (newOptions.length === 0) {
      setLabelInput(prev => ({ ...prev, value: '' }))
    } else {
      setLabelInput(prev => ({ ...prev, value: '' }))
    }

    setInternOptions(newOptions)

    onChange && onChange(e)

    const list = itemsList.current

    if (!newOptions.length) {
      list.style.paddingTop = '0'
      list.style.paddingBottom = '0'
      e.target.style.border = '1px solid rgb(239 68 68)'

      onDeselect && onDeselect({ label: null, value: null })
      console.log('se cumple')
    } else {
      list.classList.add('py-2')
      list.style.paddingTop = ''
      list.style.paddingBottom = ''
      e.target.style.border = ''
    }
    list.style.height = 'auto'
  }

  // const selectWithKey = useRef(0)

  // function handleKeyDown (e) {
  //   if (!internOptions.length) return
  //   if (e.key === 'ArrowUp') {
  //     selectWithKey.current--
  //   }
  //   if (e.key === 'ArrowDown') {
  //     // terminar
  //     selectWithKey.current++
  //   }
  //   const index = Math.abs(selectWithKey.current % internOptions.length)
  //   const selection = internOptions[index]
  //   console.log({ index, current: selectWithKey.current })
  //   const element = e.target.parentElement.querySelector('ul')
  //   element.children[index].focus()
  // }

  const input = useRef()

  return (
    <label
      className={`relative w-full ${className}`}
      onBlur={handleHeight}
    >
      <TextInput
        className={`w-full ${readOnly ? 'cursor-default bg-white' : ''}`}
        placeholder={placeholder}
        onMouseDown={e => {
          if (internOptions && internOptions.length === 0) return
          !readOnly && handleHeight(e)
        }}
        onChange={handleChange}
        // onKeyDown={handleKeyDown}
        value={labelInput.label}
        required={required}
        readOnly={readOnly}
        refInput={input}
      />

      <ul
        ref={itemsList}
        className={`absolute z-10 shadow-1 bg-superficiesInputEditable overflow-y-auto ${visibleScroll ? 'scroll-neutral' : 'scroll-hide'} top-11 rounded-lg border-azul-600 left-0 w-full overflow-clip ${openList ? 'py-2' : 'py-0'} px-3 h-0 transition-all duration-200 ease-in-out flex flex-col gap-1 ${listClass || ''}`}
      >
        {
          options &&
          [...internOptions].slice(0, maxOptions || internOptions.length).map(({ label, value }) => (
            <li
              key={value}
              tabIndex={0}
              role='option'
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
              className={`cursor-pointer max-w-full text-ellipsis texto-m text-textoPrincipal flex items-center px-1 py-2 rounded-lg focus:bg-azul-100 hover:bg-azul-100 transition-colors duration-200 ease-out ${optionClass || ''}`}
              onClick={e => {
                e.stopPropagation()
                handleHeight(e)
                setLabelInput({ label, value })
                onSelect && onSelect({ label, value })
              }}
            >
              {label}
            </li>
          ))
        }
      </ul>

      <input
        type='text'
        name={name}
        className='absolute inset-0 w-0 h-0 pointer-events-none'
        value={labelInput.value}
        required={required}
        readOnly
      />
      {
        Boolean(input.current?.value.length) && internOptions && !internOptions.length && (
          <span
            className={`absolute left-0 -bottom-3.5 text-red-500 ${classError}`}
          >
            {errMessage || 'No se encontraron resultados'}
          </span>
        )
      }
    </label>
  )
}
