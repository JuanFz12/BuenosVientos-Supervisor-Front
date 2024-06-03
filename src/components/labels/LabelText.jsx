import { TextInput } from '../inputs/TextInput'

export function LabelText ({ label, refInput, name, placeholder, defaultValue, inputClass, labelClass, children, readOnly = false, ...props }) {
  return (
    <label
      className={`flex flex-col gap-1 relative texto-regular-s text-textoPrincipal ${labelClass || ''}`}
    >
      {label}
      {
        children ||
        (
          <TextInput
            {...props}
            refInput={refInput}
            name={name}
            defaultValue={defaultValue}
            placeholder={placeholder}
            className={`texto-m ${inputClass || ''}`}
            readOnly={readOnly}
          />
        )
      }
    </label>
  )
}
