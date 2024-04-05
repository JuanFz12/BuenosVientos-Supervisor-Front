import { SelectorFecha } from '../../../../components/selectorFecha/SelectorFecha'
import { Estado } from './Estado'
import { DetalleAreaDashboard } from './components/DetalleAreasDashboard'

export function CarrerasAreasDashboard ({ className = '' }) {
  return (
    <section
      className={`flex flex-col max-w-full gap-8 ${className}`}
    >
      <Estado />

      <section
        className='flex flex-col gap-8 min-w-[min(388px,100%)] bg-white p-5 rounded-modal'
      >
        <header
          className='w-full'
        >
          <menu
            className='flex justify-between flex-wrap gap-5 w-full'
          >
            <li>
              <h4
                className='texto-semi-bold-l'
              >
                Carreras por áreas
              </h4>
            </li>

            <li>
              <SelectorFecha />
            </li>
          </menu>
        </header>

        <DetalleAreaDashboard />
      </section>
    </section>
  )
}
