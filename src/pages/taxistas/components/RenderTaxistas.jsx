import './RenderTaxistas.css'

import { Etiqueta } from '../../../components/etiquetas/Etiquetas'
import { BotonPaginacion } from '../../../components/botones/BotonPaginacion'
import { BotonDetalles } from '../../../components/botones/BotonDetalles'
import { ListStyle } from '../../../components/listStyle/ListStyle'

export function RenderTaxistas () {
  const data = [
    {
      id: 1,
      nombre: 'Nombre Nombre Apellido Apellido',
      placa: 'ABC-123',
      denominacion: 'Tupac',
      pago: 1,
      disponibilidad: 1
    },
    {
      id: 2,
      nombre: 'Nombre Nombre Apellido Apellido',
      placa: 'ABC-123',
      denominacion: 'Tupac',
      pago: 1,
      disponibilidad: 1
    },
    {
      id: 3,
      nombre: 'Nombre Nombre Apellido Apellido',
      placa: 'ABC-123',
      denominacion: 'Tupac',
      pago: 2,
      disponibilidad: 1
    },
    {
      id: 4,
      nombre: 'Nombre Nombre Apellido Apellido',
      placa: 'ABC-123',
      denominacion: 'Tupac',
      pago: 1,
      disponibilidad: 1
    },
    {
      id: 5,
      nombre: 'Nombre Nombre Apellido Apellido',
      placa: 'ABC-123',
      denominacion: 'Tupac',
      pago: 1,
      disponibilidad: 1
    },
    {
      id: 6,
      nombre: 'Nombre Nombre Apellido Apellido',
      placa: 'ABC-123',
      denominacion: 'Tupac',
      pago: 1,
      disponibilidad: 1
    },
    {
      id: 7,
      nombre: 'Nombre Nombre Apellido Apellido',
      placa: 'ABC-123',
      denominacion: 'Tupac',
      pago: 1,
      disponibilidad: 1
    },
    {
      id: 8,
      nombre: 'Nombre Nombre Apellido Apellido',
      placa: 'ABC-123',
      denominacion: 'Tupac',
      pago: 1,
      disponibilidad: 1
    },
    {
      id: 9,
      nombre: 'Nombre Nombre Apellido Apellido',
      placa: 'ABC-123',
      denominacion: 'Tupac',
      pago: 1,
      disponibilidad: 1
    },
    {
      id: 10,
      nombre: 'Nombre Nombre Apellido Apellido',
      placa: 'ABC-123',
      denominacion: 'Tupac',
      pago: 1,
      disponibilidad: 1
    }
  ]

  return (
    <section
      className='render-taxistas w-full h-auto [&_li]:text-nowrap [&_li]:overflow-hidden [&_li]:text-ellipsis rounded-[20px] overflow-hidden flex flex-col gap-2'
    >
      <header>
        <ListStyle
          className='py-3 px-6 text-xs font-normal leading-4 flex-wrap w-full min-h-11'
        >
          <li>
            No.
          </li>
          <li>Nombre</li>
          <li>Placa</li>
          <li>Denominación</li>
          <li>Pago</li>
          <li>Disponibilidad</li>
        </ListStyle>
      </header>

      {
        data.map(({ id, nombre, placa, denominacion, pago, disponibilidad }) => (
          <ListStyle
            key={id}
            className='py-3 px-6 text-sm font-normal leading-4 flex-wrap flex-1 lg:flex-grow-0 w-full min-h-[72px]'
          >
            <li>{id}</li>
            <li>{nombre}</li>
            <li>{placa}</li>
            <li>{denominacion}</li>
            <li>
              {
                pago === 1
                  ? <Etiqueta className='max-w-min h-6' text='Al día' color='verde' />
                  : <Etiqueta className='max-w-min h-6' text='En Deuda' color='amarillo' />
              }
            </li>
            <li>
              {
                disponibilidad === 1
                  ? <Etiqueta className='max-w-min h-6' text='En terminal' color='celeste' />
                  : <Etiqueta className='max-w-min h-6' text='No disponible' color='amarillo' />
              }
            </li>
            <li
              className='flex items-center justify-center min-w-[90px] md:!flex-1'
            >
              <BotonDetalles
                onClick={() => alert('en construccion')}
              >
                Detalles
              </BotonDetalles>
            </li>
          </ListStyle>
        ))
      }

      <footer
        className='flex flex-wrap gap-2 items-center text-sm font-medium leading-4 justify-between w-full bg-white px-5 py-2 min-h-20'
      >
        <span>
          Página 1 de 15
        </span>

        <div
          className='flex items-center gap-5'
        >
          <BotonPaginacion text='Anterior' left />
          <BotonPaginacion text='Siguiente' />
        </div>
      </footer>
    </section>
  )
}
