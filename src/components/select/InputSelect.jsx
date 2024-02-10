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
  maxVisibleOptions
}) {
  const [label, setLabel] = useState({
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

  return (
    <div
      className='relative block'
      ref={labelParent}
    >
      <TextInput
        className='w-full'
        placeholder={placeholder}
        onMouseDown={handleHeight}
        onBlur={handleHeight}
      />

      <input
        type='text'
        name={name}
        className='absolute inset-0 w-0 h-0 pointer-events-none'
        readOnly
      />

      <ul
        className={`absolute z-10 bg-superficiesInputEditable overflow-y-auto ${visibleScroll ? 'scroll-neutral' : 'scroll-hide'} rounded-lg border-azul-600 left-0 w-full overflow-clip top-[${(labelParent.current?.clientHeight + 8)}px] ${openList ? 'py-2 border' : 'py-0'} px-3 h-0 transition-all duration-200 ease-in-out flex flex-col gap-1 ${listClass || ''}`}
      >
        {
          options &&
          internOptions.map(({ label, value }) => (
            <li
              key={value}
              tabIndex={0}
              role='option'
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
              className={`cursor-pointer max-w-full text-ellipsis texto-m text-textoPrincipal flex items-center px-1 py-2 rounded-lg hover:bg-azul-100 transition-colors duration-200 ease-out ${optionClass || ''}`}
              onClick={() => {
                setLabel({ label, value })
                onSelect && onSelect({ label, value })
              }}
            >
              {label}
            </li>
          ))
        }
      </ul>
    </div>
  )
}
