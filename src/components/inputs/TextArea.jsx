export function TextArea ({ className, placeholder, name, ...props }) {
  return (
    <textarea
      {...props}
      className={`bg-superficiesInputEditable texto-m  resize-none h-[84px] placeholder:text-textoSuave outline-none caret-textoSuave border border-bordesIdle rounded-lg py-2 px-3 w-auto text-black ${className || ''}`}
      placeholder={placeholder}
      name={name}
    />
  )
}
