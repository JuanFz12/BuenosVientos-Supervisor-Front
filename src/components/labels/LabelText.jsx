import { TextInput } from '../inputs/TextInput'

export function LabelText ({ label, refInput, name, placeholder, inputClass, labelClass, children, readOnly = false, ...props }) {
  return (
    <label
      className={`flex flex-col gap-1 relative texto-regular-s text-textoPrincipal ${labelClass || ''}`}
    >
      {label}
      {
        children ||
        (
          <TextInput
            refInput={refInput}
            name={name}
            placeholder={placeholder}
            className={`texto-m ${inputClass || ''}`}
            readOnly={readOnly}
            {...props}
          />
        )
      }
    </label>
  )
}
