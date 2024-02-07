import { Filtros } from '../../assets/icons/elements/Filtros'
import { Buscador } from '../../components/buscador/Buscador'
import { SelectorFecha } from '../../components/selectorFecha/SelectorFecha'
import { RenderAsistencias } from './components/RenderAsistencias'

function Header () {
  return (
    <header
      className='w-full mb-8 flex flex-wrap gap-3 min-h-9 items-center justify-between'
    >
      <section
        className='flex flex-wrap items-center justify-between gap-5'
      >
        <SelectorFecha />

        <button
          onClick={() => alert('en construccion')}
          className='w-[160px] h-9 rounded-lg border border-bordesIdle bg-superficiesInputEditable text-textoPrincipal py-2 px-3 flex items-center justify-between text-sm leading-4 font-normal'
        >
          Tupac
        </button>
      </section>

      <section
        className='flex items-center gap-5'
      >
        <button
          onClick={() => alert('en construccion')}
          className='w-10 h-9 rounded-lg bg-rojoMarca-100 p-[10px] flex justify-center'
        >
          <Filtros fill='#E43530' />
        </button>

        <Buscador />
      </section>
    </header>
  )
}

export function Asistencias () {
  return (
    <main>
      <Header />
      <RenderAsistencias />
    </main>
  )
}
