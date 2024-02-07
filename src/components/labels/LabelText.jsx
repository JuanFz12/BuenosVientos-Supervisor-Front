import { TextInput } from '../inputs/TextInput'

export function LabelText ({ label, refInput, name, placeholder, inputClass, labelClass, children, falseValue, trueValue, ...props }) {
  const firstInput =
    falseValue
      ? { value: falseValue, readOnly: true }
      : { name }

  const secondInput =
    trueValue
      ? { value: trueValue, name }
      : {}

  return (
    <label
      className={`flex flex-col gap-1 relative texto-regular-s text-textoPrincipal ${labelClass || ''}`}
    >
      {label}
      {
        children ||
        (
          <>
            <TextInput
              refInput={refInput}
              placeholder={placeholder}
              className={`texto-m ${inputClass || ''}`}
              {...firstInput}
              {...props}
            />
            {
              trueValue &&
              (
                <input
                  {...secondInput}
                  tabIndex={-1}
                  readOnly
                  className='w-0 h-0 opacity-0 absolute inset-0'
                />
              )
            }
          </>
        )
      }
    </label>
  )
}
