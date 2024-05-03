export function TextInput ({ refInput, readOnly, ...props }) {
  return (
    <input
      {...props}
      ref={refInput}
      readOnly={readOnly}
      autoComplete={props.autoComplete || 'off'}
      className={`bg-superficiesInputEditable [&:read-only]:cursor-default [&:read-only]:bg-white texto-m [&:not(:read-only)]:focus:border-azul-600 transition-colors duration-200 ease-in-out placeholder:text-textoSuave outline-none caret-azul-600 border border-bordesIdle rounded-lg py-2 px-3 w-full h-9 text-black ${props.className || ''}`}
      type={props.type || 'text'}
    />
  )
}
