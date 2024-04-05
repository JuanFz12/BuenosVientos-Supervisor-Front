import { useState } from 'react'
import { Imagen } from '../../assets/icons/elements/Imagen'

export function SubirImagen ({ name, label, labelClass, className, onChange, onClick, ...props }) {
  const [preview, setPreview] = useState(null)

  return (
    <div
      className={`relative flex flex-col items-center gap-6 w-[120px] h-[130px] rounded-lg border-2 border-dashed border-bordesIdle ${className || ''}`}
    >
      {
        preview
          ? (
            <>
              <img
                src={preview}
                className='absolute inset-0 z-10 blur-[10px] contrast-125 w-full h-full max-w-full max-h-full object-cover rounded-lg'
              />
              <img
                onClick={onClick}
                src={preview}
                className='relative cursor-pointer z-10 w-full h-full max-w-full max-h-full object-cover rounded-lg'
              />
            </>
            )

          : <Imagen className='mt-[26px] w-[52px] h-[52px]' />
      }
      <label
        className={`absolute z-10 bottom-2 w-[68px] h-5 flex items-center justify-center backdrop-filter backdrop-blur-lg bg-white/75 cursor-pointer text-azul-500 texto-regular-s border border-azul-500 rounded-[4px] ${labelClass || ''}`}
      >
        {label || 'Subir'}
        <input
          {...props}
          className='absolute w-0 h-0 opacity-0'
          onChange={e => {
            const [file] = e.target.files

            const regex = /^image/ig
            if (!file || !regex.test(file.type)) {
              setPreview(null)

              onChange && onChange(e, null)
              e.target.value = ''
              return
            }

            const url = file ? URL.createObjectURL(file) : null
            setPreview(url)

            onChange && onChange(e, url)
          }}
          name={name}
          type='file'
          accept='image/*'
        />
      </label>
    </div>
  )
}
