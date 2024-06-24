import { ListStyle } from '../listStyle/ListStyle'
import { ListStyleRow } from '../listStyle/ListStyleRow'
import { FooterPaginacion } from '../paginacion/FooterPaginacion'

export function TablaBase ({ className = '', classContainer = '', classTable = '', headers = [], headersClassName = [], additionalHeaders = <></>, loading, paginaActual, totalPaginas, anteriorPagina, siguientePagina, footer = true, rounded = true, overflow = false, children }) {
  return (
    <section
      className={`flex flex-col gap-2 ${rounded ? 'rounded-tablas' : ''} ${className}`}
    >
      <section
        className={`w-full ${overflow ? 'overflow-auto scroll-neutral' : 'overflow-clip'} ${rounded ? 'rounded-tr-tablas rounded-tl-tablas' : ''} ${classContainer}`}
      >
        <section
          className={`flex flex-col [&_li]:truncate ${overflow ? 'w-full min-w-max' : 'w-full max-w-full'} gap-2 ${classTable}`}
        >
          <header>
            <ListStyle
              className='py-3 px-6 text-xs font-normal leading-4 flex-wrap w-full min-h-11'
            >
              {
                headers.map((header, idx) => (
                  <li
                    key={header}
                    title={header}
                    className={`min-w-fit truncate text-nowrap ${headersClassName.length ? headersClassName[idx] : ''}`}
                  >
                    {header}
                  </li>
                ))
              }

              {additionalHeaders}
            </ListStyle>
          </header>

          {
            loading && (
              <ListStyleRow>
                Cargando...
              </ListStyleRow>
            )
          }

          {children}

        </section>
      </section>

      {
        footer && (
          <FooterPaginacion
            className={rounded ? 'rounded-br-tablas rounded-bl-tablas' : ''}
            loading={loading}
            paginaActual={paginaActual}
            totalPaginas={totalPaginas}
            anteriorPagina={anteriorPagina}
            siguientePagina={siguientePagina}
          />
        )
      }
    </section>
  )
}
