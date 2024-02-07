import flecha from '/src/assets/icons/simpleFlecha.svg'

export function BotonPaginacion ({ text, left, ...props }) {
  return (
    <button
      {...props}
      className={`flex flex-shrink-0 items-center gap-2 text-sm font-medium leading-5 text-textoPrincipal px-[17px] py-[10px] rounded-lg border border-bordesSeparador ${props.className || ''}`}
    >
      <img
        src={flecha}
        className={left ? '' : '-rotate-180'}
      />
      {text}
    </button>
  )
}
