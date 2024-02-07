import { Filtros } from '../../assets/icons/elements/Filtros'
import { Buscador } from '../../components/buscador/Buscador'
import { SelectorFecha } from '../../components/selectorFecha/SelectorFecha'
import { RenderCarreras } from './components/RenderCarreras'

export function Carreras () {
  return (
    <main
      className=''
    >
      <Header />
      <RenderCarreras />
    </main>
  )
}

function Header () {
  return (
    <header
      className='w-full mb-8 flex flex-wrap gap-3 min-h-9 items-center justify-between'
    >
      <section
        className='flex flex-wrap items-center justify-between gap-5'
      >

        <button
          onClick={() => alert('en construccion')}
          className='boton-primario-verde w-[200px] h-9'
        >
          Nueva Carrera
        </button>

        <SelectorFecha />
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
