export function DatoResumen ({ termino, descripcion, className, textClass }) {
  return (
    <dl
      className={`flex flex-col gap-2 justify-center items-center p-2 rounded-2xl min-w-[158px] h-[109px] ${className}`}
    >
      <dt
        title={typeof termino === 'string' ? termino : ''}
        className={`text-center overflow-clip max-h-10 max-w-full w-full truncate font-bold text-[32px] leading-10 ${textClass}`}
      >
        {termino}
      </dt>

      <dd
        title={typeof termino === 'string' ? descripcion : ''}
        className={`text-center max-w-full w-full truncate font-semibold text-base leading-5 ${textClass}`}
      >
        {descripcion}
      </dd>
    </dl>
  )
}
