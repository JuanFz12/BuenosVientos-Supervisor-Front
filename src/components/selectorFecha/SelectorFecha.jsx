import { Calendario } from '../../assets/icons/elements/Calendario'

export function SelectorFecha () {
  return (
    <div
      onClick={() => alert('en construccion')}
      className='cursor-pointer flex items-center gap-4 h-9 py-2 px-3 border border-bordesIdle rounded-lg bg-[#f3f7ff]'
    >
      <span
        className='text-sm leading-4 font-normal text-textoPrincipal'
      >
        DD/MM/AA
      </span>
      <Calendario fill='#4C64A6' />
    </div>
  )
}
