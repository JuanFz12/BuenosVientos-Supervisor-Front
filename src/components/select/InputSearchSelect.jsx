import { useEffect, useRef, useState } from 'react'
import { TextInput } from '../inputs/TextInput'
import { useDebounce } from '../../hooks/useDebounce'

export function InputSearchSelect ({
  onChange = () => {},
  onSelect = () => {},
  onDeselect = () => {},
  className = '',
  optionClass,
  listClass,
  readOnly,
  name,
  placeholder,
  required,
  options,
  maxVisibleOptions,
  visibleScroll,
  defaultLabel,
  defaultValue,
  delay = 0
}) {
  const initialOptions = useRef(options)

  const itemsList = useRef()
  const input = useRef()

  const [labelInput, setLabelInput] = useState({
    label: '',
    value: ''
  })

  useEffect(() => {
    setLabelInput({
      label: defaultLabel ?? '',
      value: defaultValue ?? ''
    })
  }, [defaultLabel, defaultValue])

  // arreglar despues esto
  useEffect(() => {
    function isIqualOptions (options) {
      const orgOptions = initialOptions.current

      if (options?.length !== orgOptions?.length) return false

      const result = options.some(({ label, value }, idx) => {
        return label !== orgOptions?.[idx]?.label || value !== orgOptions?.[idx]?.value
      })

      return !result
    }

    function handleHeightIntern (boolean = false) {
      const list = itemsList.current

      if ((options && !options.length) || !options || readOnly || !boolean) {
        list.style.height = '0px'
        list.classList.remove('py-2')

        return
      }

      if (list.scrollHeight === list.clientHeight) return

      list.classList.add('py-2')

      const listHeight = list.scrollHeight
      list.style.height = `${listHeight}px`
    }

    if (options && isIqualOptions(options)) return

    if (options && options.length) {
      document.activeElement === input.current && handleHeightIntern(true)
    } else {
      handleHeightIntern(false)
    }

    initialOptions.current = options
  }, [options, readOnly])

  function handleHeight (boolean = false) {
    const list = itemsList.current

    if ((options && !options.length) || !options || readOnly || !boolean) {
      list.style.height = '0px'
      list.classList.remove('py-2')

      return
    }

    if (list.scrollHeight === list.clientHeight) return

    list.classList.add('py-2')

    const listHeight = list.scrollHeight
    list.style.height = `${listHeight}px`
  }

  const onChangeDebounce = useDebounce(onChange, delay)

  function handleChange (e) {
    if (!e.target.value) onDeselect(e)
    if (!e.target.value || !options || !options.length) {
      handleHeight(false)
      setLabelInput({ label: e.target.value, value: '' })

      onChangeDebounce(e)

      return
    }

    if (e.target.value) handleHeight(true)

    setLabelInput(prev => ({ ...prev, label: e.target.value }))

    onChangeDebounce(e)
  }

  return (
    <label
      className={`relative w-full ${className}`}
      onBlur={e => {
        e.relatedTarget && !e.currentTarget.contains(e.relatedTarget) && handleHeight(false)
      }}
    >
      <TextInput
        className={`w-full ${readOnly ? 'cursor-default bg-white' : ''}`}
        placeholder={placeholder}
        onMouseDown={e => {
          handleHeight(true)
        }}
        onChange={handleChange}
        value={labelInput.label}
        required={required}
        readOnly={readOnly}
        refInput={input}
      />

      <ul
        ref={itemsList}
        className={`absolute z-10 shadow-1 bg-superficiesInputEditable overflow-y-auto ${visibleScroll ? 'scroll-neutral' : 'scroll-hide'} top-11 rounded-lg left-0 box-content w-[calc(100%-24px)] h-0 py-0 px-3 overflow-clip transition-all duration-200 ease-in-out flex flex-col gap-1 ${listClass || ''}`}
      >
        {
          options &&
          (maxVisibleOptions ? options.slice(0, maxVisibleOptions) : options)
            .map(({ label, value }) => (
              <li
                key={value}
                tabIndex={0}
                role='option'
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
                className={`cursor-pointer max-w-full text-ellipsis texto-m text-textoPrincipal flex items-center px-1 py-2 rounded-lg focus:bg-azul-100 hover:bg-azul-100 transition-colors duration-200 ease-out ${optionClass || ''}`}
                onClick={e => {
                  e.stopPropagation()
                  handleHeight(false)
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
        readOnly
      />
    </label>
  )
}
