import './RenderAsistencias.css'

import { Etiqueta } from '../../../components/etiquetas/Etiquetas'
import { BotonPaginacion } from '../../../components/botones/BotonPaginacion'
import { ListStyle } from '../../../components/listStyle/ListStyle'
import { NormalCheck } from '../../../components/checkbox/Checkbox'

export function RenderAsistencias () {
  const data = [
    {
      id: 1,
      terminal: 'Mall del Sur',
      usuario: 'Nombre Nombre Apellido Apellido',
      rol: 'Supervisor',
      fecha: 'DD/MM/AA',
      hora: '13:00',
      tardanza: 'HH:MM',
      huella: false,
      asistencia: 1
    },
    {
      id: 2,
      terminal: 'Mall del Sur',
      usuario: 'Nombre Nombre Apellido Apellido',
      rol: 'Supervisor',
      fecha: 'DD/MM/AA',
      hora: '13:00',
      tardanza: 'HH:MM',
      huella: false,
      asistencia: 1
    },
    {
      id: 3,
      terminal: 'Mall del Sur',
      usuario: 'Nombre Nombre Apellido Apellido',
      rol: 'Supervisor',
      fecha: 'DD/MM/AA',
      hora: '13:00',
      tardanza: 'HH:MM',
      huella: false,
      asistencia: 2
    },
    {
      id: 4,
      terminal: 'Mall del Sur',
      usuario: 'Nombre Nombre Apellido Apellido',
      rol: 'Supervisor',
      fecha: 'DD/MM/AA',
      hora: '13:00',
      tardanza: 'HH:MM',
      huella: false,
      asistencia: 1
    },
    {
      id: 5,
      terminal: 'Mall del Sur',
      usuario: 'Nombre Nombre Apellido Apellido',
      rol: 'Supervisor',
      fecha: 'DD/MM/AA',
      hora: '13:00',
      tardanza: 'HH:MM',
      huella: false,
      asistencia: 3
    },
    {
      id: 6,
      terminal: 'Mall del Sur',
      usuario: 'Nombre Nombre Apellido Apellido',
      rol: 'Supervisor',
      fecha: 'DD/MM/AA',
      hora: '13:00',
      tardanza: 'HH:MM',
      huella: false,
      asistencia: 1
    },
    {
      id: 7,
      terminal: 'Mall del Sur',
      usuario: 'Nombre Nombre Apellido Apellido',
      rol: 'Supervisor',
      fecha: 'DD/MM/AA',
      hora: '13:00',
      tardanza: 'HH:MM',
      huella: false,
      asistencia: 1
    },
    {
      id: 8,
      terminal: 'Mall del Sur',
      usuario: 'Nombre Nombre Apellido Apellido',
      rol: 'Supervisor',
      fecha: 'DD/MM/AA',
      hora: '13:00',
      tardanza: 'HH:MM',
      huella: false,
      asistencia: 1
    },
    {
      id: 9,
      terminal: 'Mall del Sur',
      usuario: 'Nombre Nombre Apellido Apellido',
      rol: 'Supervisor',
      fecha: 'DD/MM/AA',
      hora: '13:00',
      tardanza: 'HH:MM',
      huella: false,
      asistencia: 1
    },
    {
      id: 10,
      terminal: 'Mall del Sur',
      usuario: 'Nombre Nombre Apellido Apellido',
      rol: 'Supervisor',
      fecha: 'DD/MM/AA',
      hora: '13:00',
      tardanza: 'HH:MM',
      huella: false,
      asistencia: 1
    }
  ]

  return (
    <section
      className='render-asistencias w-full h-auto [&_li]:text-nowrap [&_li]:overflow-hidden [&_li]:text-ellipsis rounded-[20px] overflow-hidden flex flex-col gap-2'
    >
      <header>
        <ListStyle
          className='py-3 px-6 text-xs font-normal leading-4 flex-wrap w-full min-h-11'
        >
          <li>
            Terminal
          </li>
          <li>Usuario</li>
          <li>Rol</li>
          <li>Fecha</li>
          <li>Hora</li>
          <li>Tardanza</li>
          <li>Huella</li>
          <li>Asistencia</li>
        </ListStyle>
      </header>

      {
        data.map(({ id, terminal, usuario, rol, fecha, hora, tardanza, huella, asistencia }) => (
          <ListStyle
            key={id}
            className='py-3 px-6 text-sm font-normal leading-4 flex-wrap flex-1 lg:flex-grow-0 w-full min-h-[72px]'
          >
            <li>{terminal}</li>
            <li>{usuario}</li>
            <li>{rol}</li>
            <li>{fecha}</li>
            <li>
              {
                new Date()
                  .toLocaleTimeString('en-us', { hour: '2-digit', minute: 'numeric', hour12: true })
              }
            </li>
            <li>
              {tardanza}
            </li>
            <li>
              <NormalCheck
                styleCheck='semi'
              />
            </li>
            <li>
              {
                asistencia === 1
                  ? <Etiqueta className='max-w-min h-6' text='Asistido' color='verde' />
                  : <Etiqueta className='max-w-min h-6' text='Tarde' color='amarillo' />
              }
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
