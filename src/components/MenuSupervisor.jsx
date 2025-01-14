import './MenuSupervisor.css'

// React
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

// Consts
import { routes } from '../routes'

// Icons
import apagar from '/src/assets/icons/apagar.svg'
import { Dashboard } from '../assets/icons/elements/Dashboard'
import { Usuario } from '../assets/icons/elements/Usuario'
import { Carro } from '../assets/icons/elements/Carro'
import { Vale } from '../assets/icons/elements/Vale'
import { Pasajeros } from '../assets/icons/elements/Pasajeros'
import { Calendario } from '../assets/icons/elements/Calendario'
import { Alerta } from '../assets/icons/elements/Alerta'
import { Finanzas } from '../assets/icons/elements/Finanzas'

export function MenuSupervisor () {
  const rutas = [
    {
      label: 'Dashboard',
      path: routes.dashboard,
      Icon: Dashboard
    },
    {
      label: 'Taxistas',
      path: routes.taxistas,
      Icon: Usuario
    },
    {
      label: 'Carreras',
      path: routes.carreras,
      Icon: Carro
    },
    {
      label: 'Vales',
      path: routes.vales,
      Icon: Vale
    },
    {
      label: 'Pasajeros',
      path: routes.pasajeros,
      Icon: Pasajeros
    },
    {
      label: 'Asistencias',
      path: routes.asistencias,
      Icon: Calendario
    },
    {
      label: 'Exoneraciones',
      path: routes.exoneraciones,
      Icon: Alerta
    },
    {
      label: 'Pagos',
      path: routes.pagos,
      Icon: Finanzas
    }
  ]

  const { pathname } = useLocation()

  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    setShowMenu(false)
    document.querySelector('.burger').classList.remove('open')
  }, [pathname])

  return (
    <>
      <div
        onClick={e => {
          e.currentTarget.firstElementChild.classList.toggle('open')
          setShowMenu(prev => !prev)
        }}
        className='lg:hidden left-4 top-4 cursor-pointer fixed z-20 h-[29px]'
      >
        <div className='burger' />
      </div>

      <aside
        className={`menu-sup ${showMenu ? 'px-5' : 'px-0 lg:px-5'} overflow-x-hidden lg:overflow-auto transition-all duration-200 ease-in-out bg-white fixed z-[11] lg:sticky left-0 top-0 ${showMenu ? 'w-dvw sm:w-[220px]' : 'w-0'} lg:w-[220px] h-[100dvh] overflow-auto lg:scroll-neutral py-[52px]`}
      >
        <header
          className='mt-10 lg:mt-0 mb-10 flex justify-center'
        >
          <img
            src='/LogoBuenosVientos.jpeg'
            className='w-full max-w-[180px] h-[46px]'
          />
        </header>

        <ul
          className='flex flex-col gap-2 h-[380px] 2xl:h-[654px]'
        >
          {
            rutas.map(({ label, path, Icon }) => (
              <li
                key={label}
                className='flex items-center gap-2'
              >
                <NavLink
                  to={path}
                  className={({ isActive }) => `h-9 p-2 flex-1 w-full lg:w-auto flex items-center gap-2 [&>div]:lg:hover:after:w-full rounded-lg ${isActive ? 'bg-azul-500 lg:w-full text-white' : ''}`}
                  unstable_viewTransition
                >
                  <div
                    className='flex items-center gap-2 lg:slider-animation lg:after:bg-azul-500 '
                  >
                    <Icon
                      fill={pathname.includes(path) ? 'white' : '#4C64A6'}
                      color={pathname.includes(path) ? 'white' : '#4C64A6'}
                    />
                    {label}
                  </div>
                </NavLink>
              </li>
            ))
          }
        </ul>

        <footer
          className='flex mt-5'
        >
          <Link
            className='h-9 p-2 flex items-center gap-2 slider-animation after:bg-azul-500 after:bottom-1 after:left-2 after:hover:w-[calc(100%-15px)]'
            reloadDocument
            to={routes.logout}
          >
            <img src={apagar} />
            Salir
          </Link>
        </footer>
      </aside>
    </>
  )
}
