import { TextInput } from './TextInput'

export function InputDoble ({ placeholder, required, label, defaultLabel, defaultValue, value, name, className }) {
  return (
    <>
      <TextInput
        type='text'
        placeholder={placeholder}
        value={label}
        defaultValue={defaultLabel}
        readOnly
        required={required}
        className={className}
      />

      <input
        name={name}
        type='text'
        readOnly
        defaultValue={defaultValue}
        value={value}
        className='size-0 absolute -z-50 inset-0 opacity-0 pointer-events-none'
      />
    </>
  )
}