import { Upload } from '../../assets/icons/elements/Upload'

export function InputFile ({ name, inputRef: input }) {
  return (
    <label
      className='relative self-end boton-fantasma-marca h-9 w-[92px] texto-semi-bold-m flex items-center justify-center gap-2 cursor-pointer'
    >
      <Upload />
      Subir
      <input
        className='absolute w-0 h-0 opacity-0'
        type='file'
        name={name}
        onChange={e => {
          if (e.target.files.length) {
            const { name } = e.target.files[0]
            input.current.value = name
          } else {
            input.current.value = ''
          }
        }}
      />
    </label>
  )
}
