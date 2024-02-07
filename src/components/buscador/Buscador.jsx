import { Buscar } from '../../assets/icons/elements/Buscar'

export function Buscador ({ labelClass, ...props }) {
  return (
    <label
      className={`flex items-center gap-2 h-9 border border-bordesIdle bg-[#f3f7ff] rounded-lg px-3 ${labelClass || ''}`}
    >
      <Buscar fill='#A9BCF0' />
      <input
        {...props}
        placeholder={props.placeholder || 'Buscar'}
        type='text'
        className={`bg-transparent min-w-[200px] outline-none placeholder:text-neutrales-500 caret-bordesIdle text-sm font-normal leading-4 ${props.className || ''}`}
      />
    </label>
  )
}
