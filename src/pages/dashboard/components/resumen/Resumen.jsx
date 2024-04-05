import { CalendarInput } from '../../../../components/inputs/CalendarInput'
import { Select } from '../../../../components/select/Select'
import { DatoResumen } from './components/DatoResumen'

export function Resumen ({ className }) {
  return (
    <section
      className={`min-h-[334px] min-w-[220px] max-h-[495px] flex flex-col gap-5 rounded-[32px] bg-white p-5 ${className || ''}`}
    >
      <header
        className='flex flex-wrap justify-between gap-2'
      >
        <h3
          className='font-semibold text-base leading-5 text-textoPrincipal'
        >
          Resumen
        </h3>

        <menu
          className='flex flex-wrap gap-5 items-center'
        >
          <li>
            <CalendarInput />
          </li>
          <li>
            <Select
              placeholder='Denominación'
              className='!w-[160px]'
            />
          </li>
        </menu>
      </header>

      <ul
        className='flex flex-wrap gap-5 max-h-[367px] px-1 overflow-y-auto overflow-x-hidden scroll-neutral'
      >
        <DatoResumen
          termino='S/ 300'
          descripcion='Ingresos'
          className='bg-dashboardGraficoColor1 flex-1'
          textClass='text-textoPrincipal'
        />

        <DatoResumen
          termino='200'
          descripcion='Carreras'
          className='bg-dashboardGraficoColor2 flex-1'
          textClass='text-white'
        />

        <DatoResumen
          termino='20'
          descripcion='Vales'
          className='bg-dashboardGraficoColor3 flex-1'
          textClass='text-textoPrincipal'
        />

        <DatoResumen
          termino={
            <span
              title='200 / 400'
              className=''
            >
              <strong
                className='titulo-h2 leading-[30px] inline-block max-w-[50%] truncate'
              >
                200
              </strong>
              <span
                className='texto-semi-bold-l inline-block max-w-[50%] truncate'
              >
                /400
              </span>
            </span>
          }
          descripcion='Asistencias'
          className='bg-dashboardGraficoColor2 flex-1'
          textClass='text-white'
        />

        <DatoResumen
          termino='S/ 300'
          descripcion='Deudas cuota'
          className='bg-dashboardGraficoColor3 flex-1'
          textClass='text-textoPrincipal'
        />

        <DatoResumen
          termino='S/ 120'
          descripcion='Deudas vales'
          className='bg-dashboardGraficoColor1 flex-1'
          textClass='text-textoPrincipal'
        />
      </ul>
    </section>
  )
}
