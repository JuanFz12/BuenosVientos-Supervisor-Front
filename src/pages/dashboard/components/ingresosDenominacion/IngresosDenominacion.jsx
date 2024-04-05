import { Select } from '../../../../components/select/Select'
import { GraficoDashboard } from './components/GraficoDashboard'

export function IngresosDenominacion ({ className, data }) {
  // la data sera la informacion que se mostrara en el grafico
  return (
    <section
      className={`min-w-[min(636px,100%)]  flex flex-col gap-l rounded-modal bg-white p-5 ${className || ''}`}
    >
      <header
        className='flex flex-wrap justify-between gap-2'
      >
        <h4
          className='texto-semi-bold-l'
        >
          Ingresos por Denominación
        </h4>

        <Select
          placeholder='Año'
          className='!w-[120px]'
        />
      </header>

      <GraficoDashboard />

      <footer
        className='mb-5'
      >
        <ul
          className='flex flex-wrap max-w-full gap-8 lg:gap-[57px] items-center'
        >
          <li
            className='flex items-center gap-s'
          >
            <span
              className='block size-[15px] rounded bg-dashboardGraficoColor1'
            />

            <span
              className='texto-regular-m text-sm leading-4 font-normal'
            >
              Denominación 1
            </span>
          </li>

          <li
            className='flex items-center gap-s'
          >
            <span
              className='block size-[15px] rounded bg-dashboardGraficoColor3'
            />

            <span
              className='texto-regular-m text-sm leading-4 font-normal'
            >
              Denominación 2
            </span>
          </li>
        </ul>
      </footer>

    </section>
  )
}
