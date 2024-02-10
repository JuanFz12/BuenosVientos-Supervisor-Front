export function TextInput ({ refInput, ...props }) {
  return (
    <input
      {...props}
      ref={refInput}
      autoComplete={props.autoComplete || 'off'}
      className={`bg-superficiesInputEditable texto-m [&:not(:read-only)]:focus:border-azul-600 transition-colors duration-200 ease-in-out placeholder:text-textoSuave outline-none caret-textoSuave border border-bordesIdle rounded-lg py-2 px-3 w-auto h-9 text-black ${props.className || ''}`}
      type={props.type || 'text'}
    />
  )
}
