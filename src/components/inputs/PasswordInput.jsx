import { useRef } from 'react'
import ojoNoVer from '/src/assets/icons/ojoNoVer.svg'
import ojoVer from '/src/assets/icons/ojoVer.svg'

export function PasswordInput ({ name, placeholder, labelClass, inputClass, ...props }) {
  const inputRef = useRef()

  return (
    <label
      className={`relative bg-superficiesInputEditable rounded-lg flex items-center border border-bordesIdle has-[:focus]:border-azul-500 transition-colors duration-300 ease-in-out h-9 ${labelClass || ''}`}
    >
      <input
        {...props}
        name={name}
        ref={inputRef}
        type='password'
        placeholder={placeholder}
        className={`bg-transparent texto-m w-full placeholder:text-textoSuave outline-none caret-textoSuave rounded-lg py-2 pl-3 h-full text-black ${inputClass || ''}`}
      />
      <button
        tabIndex={-1}
        type='button'
        className='w-14 h-full cursor-default flex justify-center items-center'
      >
        <img
          onClick={function ({ target }) {
            const input = inputRef.current

            if (input.type === 'password') {
              target.src = ojoVer
              input.type = 'text'
            } else {
              target.src = ojoNoVer
              input.type = 'password'
            }
          }}
          src={ojoNoVer}
          aria-label='show | hide password text'
          className='w-[28px] h-auto cursor-pointer'
        />
      </button>
    </label>
  )
}
