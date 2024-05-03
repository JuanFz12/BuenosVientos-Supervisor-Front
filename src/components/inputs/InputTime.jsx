export function InputTime ({ className, placeholder, onChange, defaultValue, value, ...props }) {
  return (
    <input
      {...props}
      className={`min-w-[125px] w-full appearance-none h-9 py-2 px-3 border border-bordesIdle read-only:bg-white bg-superficiesInputEditable rounded-lg ${className || ''}`}
      onChange={onChange}
      type={props.type || 'time'}
      defaultValue={
        defaultValue
          ? props.type === 'date'
            ? new Date(defaultValue).toISOString().split('T')[0]
            : new Date(defaultValue).toLocaleTimeString('es-PE').split(':', 2).join(':')
          : undefined
      }
      value={
        value
          ? props.type === 'date'
            ? new Date(value).toISOString().split('T')[0]
            : new Date(value).toLocaleTimeString('es-PE').split(':', 2).join(':')
          : undefined
      }
      autoComplete='off'
    />
  )
}
