import { useEffect } from 'react'
import { BotonFiltro } from '../../components/botones/BotonFiltro'
import { Buscador } from '../../components/buscador/Buscador'
import { InputTime } from '../../components/inputs/InputTime'
import { Select } from '../../components/select/Select'
import { routes } from '../../routes'
import { useLayout } from '../../store/useLayout'
import { RenderPagos } from './components/RenderPagos'
import { useMatch } from 'react-router-dom'

export function Pagos() {
  const { setTitulo } = useLayout()

  useEffect(() => {
    setTitulo('Pagos diarios')

    return () => setTitulo(undefined)
  }, [setTitulo])

  return (
    <main>
      <Header />
      <RenderPagos />
    </main>
  )
}

function Header() {
  const index = routes.pagos
  const { pagosDenominacion } = routes.pagosRoutes
  const rutaPagosDenominacion = `${index}/${pagosDenominacion}`
  const matchPagosDenominacion = useMatch(rutaPagosDenominacion)

  return (
    <header className="flex justify-between mb-8 flex-wrap gap-8">
      <menu className="flex flex-wrap items-center gap-5 [&>li]:flex-grow-[1] [&>li]:min-w-[140px]">
        <li>
          <InputTime
            defaultValue={new Date().toISOString().split('T')[0]}
            className="w-auto max-w-full uppercase"
            type="date"
          />
        </li>
        {matchPagosDenominacion && (
          <li>
            <Select placeholder="Denominacion" />
          </li>
        )}
      </menu>

      <menu className="flex flex-wrap gap-5 items-center flex-1 max-w-[480px]">
        <li>
          <BotonFiltro onClick={() => alert('en desarrollo')} />
        </li>

        <li className="flex-1">
          <Buscador labelClass="flex-1 max-w-[420px]" className="w-full" />
        </li>
      </menu>
    </header>
  )
}
