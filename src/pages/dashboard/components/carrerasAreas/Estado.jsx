import { Link } from 'react-router-dom'
import { routes } from '../../../../routes'
import { Etiqueta } from '../../../../components/etiquetas/Etiquetas'
import { COLORES_ETIQUETAS } from '../../../../components/etiquetas/consts/etiquetas'
import { formatearHoraCorta } from '../../../../utils/formatear'

const estados = {
  asistido: 'Assisted',
  tardanza: 'Late'
}

const tagStatus = {
  [estados.asistido]: {
    text: 'Asistido',
    color: COLORES_ETIQUETAS.verde
  },
  [estados.tardanza]: {
    text: 'Tardanza',
    color: COLORES_ETIQUETAS.amarillo
  }
}

export function Estado ({ className = '', estado = estados.asistido }) {
  return (
    <section
      className={`bg-white min-h-[126px] flex flex-col gap-[18px] p-5 rounded-modal ${className}`}
    >
      <header
        className='min-h-5 flex flex-wrap gap-4 justify-between'
      >
        <strong
          className='texto-semi-bold-l text-textoPrincipal'
        >
          Estado
        </strong>

        <Link
          to={routes.asistencias}
          unstable_viewTransition
          className='texto-regular-m text-textoTitulo '
        >
          Mis asistencias
        </Link>
      </header>

      <ul
        className='flex flex-col items-center gap-2 w-full min-h-12'
      >
        <li>
          <Etiqueta
            text={tagStatus[estado].text}
            color={tagStatus[estado].color}
            className='h-6 w-fit'
          />
        </li>

        <li
          className='h-4 flex items-center'
        >
          <span
            title={`Hora de ingreso: ${formatearHoraCorta(new Date())}`}
            className='text-center texto-regular-m'
          >
            Hora de ingreso: {formatearHoraCorta(new Date())}
          </span>
        </li>
      </ul>
    </section>
  )
}
