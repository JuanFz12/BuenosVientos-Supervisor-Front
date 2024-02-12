import { useRef, useState } from 'react'
import { TextInput } from '../inputs/TextInput'

export function InputSelect ({
  name,
  placeholder,
  options,
  visibleScroll,
  listClass,
  optionClass,
  onSelect,
  maxVisibleOptions,
  maxOptions,
  required
}) {
  const [labelInput, setLabelInput] = useState({
    label: '',
    value: ''
  })

  const [internOptions, setInternOptions] = useState(options)

  const labelParent = useRef()

  const [openList, setOpenList] = useState(false)

  function handleHeight (e) {
    const { currentTarget } = e
    const list = currentTarget.parentElement.querySelector('ul')

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
    setLabelInput(prev => ({ ...prev, label: e.target.value }))

    const newOptions = options.filter(({ label }) => label.toLowerCase().includes(e.target.value.toLowerCase()))

    if (newOptions.length === 1) {
      const isValid = newOptions[0].label.toLowerCase() === e.target.value.toLowerCase()

      setLabelInput(prev => ({ ...prev, value: isValid ? newOptions[0].value : '' }))
    } else if (newOptions.length === 0) {
      setLabelInput(prev => ({ ...prev, value: '' }))
    } else {
      setLabelInput(prev => ({ ...prev, value: '' }))
    }

    setInternOptions(newOptions)

    const { currentTarget } = e
    const list = currentTarget.parentElement.querySelector('ul')

    if (!newOptions.length) {
      list.style.paddingTop = '0'
      list.style.paddingBottom = '0'
      e.target.style.border = '1px solid rgb(239 68 68)'
      console.log('se cumple')
    } else {
      list.classList.add('py-2')
      list.style.paddingTop = ''
      list.style.paddingBottom = ''
      e.target.style.border = ''
    }
    list.style.height = 'auto'
  }

  const inputLabel = useRef()
  const inputValue = useRef()

  return (
    <label
      className='relative h-9'
      ref={labelParent}
    >
      <TextInput
        className='w-full'
        placeholder={placeholder}
        onMouseDown={e => {
          if (internOptions.length === 0) return
          handleHeight(e)
        }}
        onBlur={handleHeight}
        onChange={handleChange}
        refInput={inputLabel}
        value={labelInput.label}
        required={required}
      />

      <input
        type='text'
        name={name}
        className='absolute inset-0 w-0 h-0 pointer-events-none'
        ref={inputValue}
        value={labelInput.value}
        readOnly
      />

      <ul
        className={`absolute z-10 shadow-1 bg-superficiesInputEditable overflow-y-auto ${visibleScroll ? 'scroll-neutral' : 'scroll-hide'} rounded-lg border-azul-600 left-0 w-full overflow-clip top-[${(labelParent.current?.clientHeight + 8)}px] ${openList ? 'py-2' : 'py-0'} px-3 h-0 transition-all duration-200 ease-in-out flex flex-col gap-1 ${listClass || ''}`}
      >
        {
          options &&
          [...internOptions].slice(0, maxOptions || internOptions.length).map(({ label, value }) => (
            <li
              key={value}
              tabIndex={0}
              role='option'
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
              className={`cursor-pointer max-w-full text-ellipsis texto-m text-textoPrincipal flex items-center px-1 py-2 rounded-lg hover:bg-azul-100 transition-colors duration-200 ease-out ${optionClass || ''}`}
              onMouseDown={() => {
                setLabelInput({ label, value })
                onSelect && onSelect({ label, value })
              }}
            >
              {label}
            </li>
          ))
        }
      </ul>

      {
        !internOptions.length && (
          <span
            className='absolute right-0 -top-5 text-red-500'
          >
            No se encontraron resultados
          </span>
        )
      }
    </label>
  )
}
