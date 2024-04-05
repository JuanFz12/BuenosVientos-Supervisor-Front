import { Link } from 'react-router-dom'
import { formatearASoles } from '../../../../../utils/formatearASoles'

export function TaxistaInfo ({ taxistaUrl, foto, nombreCompleto, carreras, ganancia }) {
  return (
    <Link
      to={taxistaUrl}
      unstable_viewTransition
    >
      <article
        className='flex flex-col gap-2 w-[184px] h-[238px] p-2 rounded-2xl bg-azulMarca-100 border border-bordesIdle text-textoPrincipal'
      >
        <header>
          <div
            className='w-full h-[120px] flex items-center justify-center bg-white rounded-2xl'
          >
            <img
              src={foto}
              loading='lazy'
              alt={nombreCompleto}
              className='w-full h-[120px] object-contain rounded-2xl'
            />
          </div>

          <strong
            title={nombreCompleto}
            className='line-clamp-2 text-ellipsis texto-semi-bold-xl'
          >
            {nombreCompleto}
          </strong>
        </header>

        <footer
          className='w-full h-[44px] flex flex-col gap-1'
        >
          <span
            title={`${carreras} carreras`}
            className='texto-regular-s block max-w-full truncate text-nowrap'
          >
            {carreras} carreras
          </span>

          <strong
            title={formatearASoles({ numero: ganancia, cero: true })}
            className='texto-semi-bold-xl max-w-full truncate text-nowrap'
          >
            {formatearASoles({ numero: ganancia, cero: true })}
          </strong>
        </footer>
      </article>
    </Link>
  )
}
