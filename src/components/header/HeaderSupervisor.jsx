import { Link, useLocation } from 'react-router-dom'
import { getCapitalizedLastPath } from '../../utils/getCapLastPath'
import { PerfilSupervisor } from './PerfilSupervisor'
import { Izquierda } from '../../assets/icons/elements/Izquierda'

export function HeaderSupervisor ({ title, backTo }) {
  const { pathname } = useLocation()

  return (
    <header
      className='header-sup flex flex-wrap gap-3 z-10 w-full min-h-9 box-content sticky bg-neutrales-200 top-0 items-center justify-between py-3 pt-5'
    >
      <div
        className='flex gap-3 items-center'
      >
        {
          backTo &&
          (
            <Link
              to={backTo}
              unstable_viewTransition
            >
              <Izquierda />
            </Link>
          )
        }

        <h1
          className='titulo-h4 lg:pl-0 text-azul-500'
        >
          {title || getCapitalizedLastPath(pathname)}
        </h1>
      </div>

      <PerfilSupervisor />
    </header>
  )
}
