export function InputTime ({ className, placeholder, onChange, ...props }) {
  return (
    <input
      {...props}
      className={`w-[125px] appearance-none h-9 py-2 px-3 border border-bordesIdle bg-superficiesInputEditable rounded-lg ${className || ''}`}
      onChange={onChange}
      type={props.type || 'time'}
      autoComplete='off'
    />
  )
}
