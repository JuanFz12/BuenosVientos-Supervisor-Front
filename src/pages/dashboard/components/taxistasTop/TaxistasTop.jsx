import { Izquierda } from '../../../../assets/icons/elements/Izquierda'
import { Select } from '../../../../components/select/Select'
import { TaxistaInfo } from './components/TaxistasInfo'

export function TaxistasTop ({ className, taxistas, denominacion }) {
  return (
    <section
      className={`min-h-[334px] max-h-[495px] md:w-[430px] flex flex-col gap-5 rounded-[32px] bg-white p-5 ${className || ''}`}
    >
      <header
        className='flex w-full flex-wrap justify-between gap-2'
      >
        <h3
          className='font-semibold text-base leading-5 text-textoPrincipal'
        >
          Taxistas Top
        </h3>

        <menu
          className='flex flex-wrap gap-2 items-center'
        >
          <li>
            <menu
              className='flex gap-2 items-center'
            >
              <li
                className='flex items-center justify-center size-9 rounded-full bg-azul-500 cursor-pointer'
              >
                <Izquierda
                  width={16}
                  height={16}
                  color='white'
                  className='mr-1'
                />
              </li>

              <li
                className='flex items-center justify-center size-9 rounded-full bg-azul-500 cursor-pointer'
              >
                <Izquierda
                  width={16}
                  height={16}
                  color='white'
                  className='rotate-180 ml-1'
                />
              </li>
            </menu>
          </li>
          <li>
            <Select
              placeholder='Denominación'
              className='!w-[160px]'
              // aqui mapeare la denominación
            />
          </li>
        </menu>
      </header>

      <ul
        className='m-auto px-0.5 flex flex-col md:flex-row gap-5 w-fit max-w-full min-h-[245px] max-h-[367px] pb-0.5 overflow-auto overscroll-y-auto xl:overscroll-y-contain overscroll-x-contain scroll-neutral'
      >
        {
          taxistas && taxistas.map(taxista => (
            <li
              key={taxista.id}
            >
              <TaxistaInfo
                foto={taxista.foto}
                nombreCompleto={taxista.nombreCompleto}
                carreras={taxista.carreras}
                ganancia={taxista.ganancia}
              />
            </li>
          ))
        }
      </ul>

    </section>
  )
}
