import { BotonPaginacion } from '../botones/BotonPaginacion'

export function FooterPaginacion ({ className, loading, paginaActual, totalPaginas, anteriorPagina, siguientePagina }) {
  return (
    <footer
      className={`flex flex-wrap gap-2 items-center text-sm font-medium leading-4 justify-between w-full bg-white px-5 py-2 min-h-20 ${className || ''}`}
    >
      {
        !loading && (
          <>
            <span>
              Página {paginaActual ?? 1} de {totalPaginas ?? 15}
            </span>

            <div
              className='flex items-center gap-5'
            >
              <BotonPaginacion
                url={anteriorPagina}
                text='Anterior'
                left
              />
              <BotonPaginacion
                url={siguientePagina}
                text='Siguiente'
              />
            </div>
          </>
        )
        }
    </footer>
  )
}
