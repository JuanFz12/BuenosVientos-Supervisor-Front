import { useEffect } from 'react'
import { useLayout } from '../../store/useLayout'
import { BotonFiltro } from '../../components/botones/BotonFiltro'
import { Buscador } from '../../components/buscador/Buscador'
import { RenderCuotas } from './components/RenderCuotas'
import { routes } from '../../routes'

export function Cuotas() {
  const { setTitulo, setBackTo } = useLayout()

  useEffect(() => {
    setTitulo('Cuotas por Taxista')
    setBackTo(routes.pagos)

    return () => setTitulo(undefined)
  }, [setTitulo, setBackTo])
  return (
    <main>
      <Header />
      <RenderCuotas />
    </main>
  )
}
function Header() {
  return (
    <header className="flex justify-between mb-8 flex-wrap gap-8">
      <menu className="flex flex-wrap items-center gap-5 [&>li]:flex-grow-[1] [&>li]:min-w-[140px]">
        <li>
          <button
            onClick={() => alert('en construccion')}
            className="w-[160px] h-9 rounded-lg border border-bordesIdle bg-superficiesInputEditable text-textoPrincipal py-2 px-3 flex items-center justify-between text-sm leading-4 font-normal"
          >
            Tupac
          </button>
        </li>
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
