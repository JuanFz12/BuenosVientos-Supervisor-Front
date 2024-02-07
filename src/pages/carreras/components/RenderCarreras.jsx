import './RenderCarreras.css'

import { Etiqueta } from '../../../components/etiquetas/Etiquetas'
import { BotonPaginacion } from '../../../components/botones/BotonPaginacion'
import { BotonDetalles } from '../../../components/botones/BotonDetalles'
import { ListStyle } from '../../../components/listStyle/ListStyle'
import { NormalCheck } from '../../../components/checkbox/Checkbox'

export function RenderCarreras () {
  const data = [
    {
      id: 1,
      nombre: 'Nombre Nombre Apellido Apellido',
      placa: 'ABC-123',
      fecha: 'DD/MM/AA',
      tarifa: 'S/ 12.00',
      estado: 1,
      salida: false,
      regreso: false
    },
    {
      id: 2,
      nombre: 'Nombre Nombre Apellido Apellido',
      placa: 'ABC-123',
      fecha: 'DD/MM/AA',
      tarifa: 'S/ 12.00',
      estado: 2,
      salida: false,
      regreso: false
    },
    {
      id: 3,
      nombre: 'Nombre Nombre Apellido Apellido',
      placa: 'ABC-123',
      fecha: 'DD/MM/AA',
      tarifa: 'S/ 12.00',
      estado: 1,
      salida: false,
      regreso: false
    },
    {
      id: 4,
      nombre: 'Nombre Nombre Apellido Apellido',
      placa: 'ABC-123',
      fecha: 'DD/MM/AA',
      tarifa: 'S/ 12.00',
      estado: 1,
      salida: false,
      regreso: false
    },
    {
      id: 5,
      nombre: 'Nombre Nombre Apellido Apellido',
      placa: 'ABC-123',
      fecha: 'DD/MM/AA',
      tarifa: 'S/ 12.00',
      estado: 1,
      salida: false,
      regreso: false
    },
    {
      id: 6,
      nombre: 'Nombre Nombre Apellido Apellido',
      placa: 'ABC-123',
      fecha: 'DD/MM/AA',
      tarifa: 'S/ 12.00',
      estado: 1,
      salida: false,
      regreso: false
    },
    {
      id: 7,
      nombre: 'Nombre Nombre Apellido Apellido',
      placa: 'ABC-123',
      fecha: 'DD/MM/AA',
      tarifa: 'S/ 12.00',
      estado: 1,
      salida: false,
      regreso: false
    },
    {
      id: 8,
      nombre: 'Nombre Nombre Apellido Apellido',
      placa: 'ABC-123',
      fecha: 'DD/MM/AA',
      tarifa: 'S/ 12.00',
      estado: 1,
      salida: false,
      regreso: false
    },
    {
      id: 9,
      nombre: 'Nombre Nombre Apellido Apellido',
      placa: 'ABC-123',
      fecha: 'DD/MM/AA',
      tarifa: 'S/ 12.00',
      estado: 1,
      salida: false,
      regreso: false
    },
    {
      id: 10,
      nombre: 'Nombre Nombre Apellido Apellido',
      placa: 'ABC-123',
      fecha: 'DD/MM/AA',
      tarifa: 'S/ 12.00',
      estado: 1,
      salida: false,
      regreso: false
    }
  ]

  return (
    <section
      className='render-carreras w-full h-auto [&_li]:text-nowrap [&_li]:overflow-hidden [&_li]:text-ellipsis rounded-[20px] overflow-hidden flex flex-col gap-2'
    >
      <header>
        <ListStyle
          className='py-3 px-6 text-xs font-normal leading-4 flex-wrap w-full min-h-11'
        >
          <li>
            ID
          </li>
          <li>Taxista</li>
          <li>Fecha</li>
          <li>Tarifa</li>
          <li>Estado</li>
          <li>Salida</li>
          <li>Regreso</li>
        </ListStyle>
      </header>

      {
        data.map(({ id, nombre, fecha, tarifa, estado, salida, regreso }) => (
          <ListStyle
            key={id}
            className='py-3 px-6 text-sm font-normal leading-4 flex-wrap flex-1 lg:flex-grow-0 w-full min-h-[72px]'
          >
            <li>{id}</li>
            <li>{nombre}</li>
            <li>{fecha}</li>
            <li>{tarifa}</li>
            <li>
              {
                estado === 1
                  ? <Etiqueta className='max-w-min h-6' text='Completado' color='verde' />
                  : <Etiqueta className='max-w-min h-6' text='En proceso' color='celeste' />
              }
            </li>
            <li>
              <NormalCheck
                styleCheck='semi'
              />
            </li>
            <li>
              <NormalCheck
                styleCheck='semi'
              />
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
