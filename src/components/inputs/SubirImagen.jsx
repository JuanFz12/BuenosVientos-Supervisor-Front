import { Imagen } from '../../assets/icons/elements/Imagen'

export function SubirImagen ({ name, label, labelClass, className, ...props }) {
  return (
    <div
      className={`flex flex-col items-center justify-end gap-6 w-[120px] h-[130px] rounded-lg border-2 py-2 px-5 border-dashed border-bordesIdle ${className || ''}`}
    >
      <Imagen className='w-[52px] h-[52px]' />
      <label
        className={`relative w-[68px] h-5 flex items-center justify-center cursor-pointer text-azul-500 texto-regular-s border border-azul-500 rounded-[4px] ${labelClass || ''}`}
      >
        {label || 'Subir'}
        <input
          {...props}
          className='absolute w-0 h-0 opacity-0'
          name={name}
          type='file'
          accept='image/*, webp'
        />
      </label>
    </div>
  )
}
