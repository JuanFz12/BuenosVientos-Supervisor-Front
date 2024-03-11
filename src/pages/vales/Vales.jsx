import { Link, Outlet } from 'react-router-dom'
import { Filtros } from '../../assets/icons/elements/Filtros'
import { Buscador } from '../../components/buscador/Buscador'
import { SelectorFecha } from '../../components/selectorFecha/SelectorFecha'
import { Notificacion } from '../../assets/icons/elements/Notificacion'
import { routes } from '../../routes'
import { useEffect } from 'react'
import { changeDocTitle, titlePages } from '../../consts/titlePage'
import { useLayout } from '../../store/useLayout'

export function Vales () {
  useEffect(() => changeDocTitle(titlePages.vales), [])

  const { backTo } = useLayout()

  return (
    <main>
      <Header
        solicitudes={Boolean(backTo)}
      />

      <Outlet />

    </main>
  )
}

const { valesRoutes } = routes

function Header ({ solicitudes }) {
  return (
    <header
      className='w-full mb-8 flex flex-wrap gap-3 min-h-9 items-center justify-between'
    >
      <section
        className='flex flex-wrap items-center justify-between gap-5'
      >

        <button
          onClick={() => alert('en construccion')}
          className='boton-primario-verde w-[200px] h-9'
        >
          Nuevo Vale
        </button>

        {
          !solicitudes &&
          (
            <>
              <SelectorFecha />

              <Link
                to={valesRoutes.solicitudes}
                className='p-[10px] h-9 w-10 flex items-center justify-center rounded-lg bg-rojoMarca-100'
                unstable_viewTransition
              >
                <Notificacion />
              </Link>
            </>
          )
        }
      </section>

      <section
        className='flex items-center gap-5'
      >
        {
          !solicitudes &&
          (
            <button
              onClick={() => alert('en construccion')}
              className='w-10 h-9 rounded-lg bg-rojoMarca-100 p-[10px] flex justify-center'
            >
              <Filtros fill='#E43530' />
            </button>
          )
        }

        <Buscador />

      </section>
    </header>
  )
}
