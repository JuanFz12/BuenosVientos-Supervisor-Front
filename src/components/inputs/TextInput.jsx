export function TextInput ({ refInput, ...props }) {
  return (
    <input
      {...props}
      ref={refInput}
      autoComplete={props.autoComplete || 'off'}
      className={`bg-superficiesInputEditable placeholder:text-textoSuave outline-none caret-textoSuave border border-bordesIdle rounded-lg py-2 px-3 w-auto h-9 text-black ${props.className || ''}`}
      type={props.type || 'text'}
    />
  )
}
