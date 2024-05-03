export function TextArea ({ className, placeholder, name, defaultValue, readOnly, maxLength, minLength, ...props }) {
  return (
    <textarea
      {...props}
      className={`bg-superficiesInputEditable scroll-neutral [&:read-only]:bg-white [&:read-only]:cursor-default texto-m [&:not(:read-only)]:focus:border-azul-600 transition-colors duration-200 ease-in-out resize-none h-[84px] placeholder:text-textoSuave outline-none caret-textoSuave border border-bordesIdle rounded-lg py-2 px-3 w-auto text-black ${className || ''}`}
      placeholder={placeholder}
      name={name}
      readOnly={readOnly}
      defaultValue={defaultValue}
      maxLength={maxLength}
      minLength={minLength}
    />
  )
}
