import './PerfilSupervisor.css'

import { Link, useLocation } from 'react-router-dom'
import { EtiquetaVerde } from '../etiquetas/Etiquetas'
import { routes } from '../../routes'
import { Usuario } from '../../assets/icons/elements/Usuario'
import { useEffect, useState } from 'react'
import { useUsuarioSupervisor } from '../../store/useUsuarioSupervisor'

export function PerfilSupervisor () {
  const {
    usuario: {
      photo_user: fotoPerfil,
      user_name: nombre,
      surnames: apellidos,
      email,
      type_user: tipoUsuario
    },
    corporacion: {
      corporation_name: terminal
    },
    denominacion: {
      denomination_name: denominacion
    }
  } = useUsuarioSupervisor()

  const denominaciones = [denominacion]

  const [open, setOpen] = useState(false)

  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location])

  function handleOpen (e) {
    if (e.target !== e.currentTarget) return
    setOpen(!open)
  }

  return (
    <section
      tabIndex={1}
      // regresar el onMouseDown y onMouseUp a su estado original si se necesita
      onClick={handleOpen}
      onBlur={e => e.relatedTarget && setOpen(false)}
      className='relative before:content-[""] before:absolute before:inset-0 before:w-full before:h-full outline-none cursor-pointer flex items-center justify-end px-3 w-[280px] h-9 rounded-lg border border-bordesIdle'
    >
      <section
        className='flex items-center gap-2'
      >
        <strong
          className='text-base leading-5 font-normal text-textoPrincipal'
        >
          {`${nombre} ${apellidos}`}
        </strong>
        <Usuario fill='#4C64A6' />
      </section>

      <article
        className={`w-[280px] ${open ? 'active-dropdown py-5' : 'h-0'} px-5 cursor-auto transition-all duration-300 ease-in-out outline-none overflow-hidden absolute flex flex-col gap-5 items-center left-0 top-[42px] rounded-2xl bg-white`}
      >
        <header
          className='max-w-full flex flex-col items-center'
        >
          <div
            className='mb-5 w-[72px] h-20 border border-bordesIdle rounded-lg'
          >
            <img
              src={fotoPerfil}
              className='w-full h-full object-cover rounded-lg'
            />

          </div>

          <h2
            className='text-azul-500 text-base leading-5 font-semibold text-center max-w-full line-clamp-2'
          >
            {`${nombre} ${apellidos}`}
          </h2>

          <span
            className='mt-2 text-sm block leading-4 font-normal text-textoPrincipal max-w-full overflow-hidden text-ellipsis text-nowrap whitespace-nowrap'
          >
            {email}
          </span>
        </header>

        <strong
          className='text-sm leading-4 font-semibold text-textoPrincipal'
        >
          {tipoUsuario}
        </strong>

        <hr className='w-[200px] border-bordesSeparador' />

        <section
          className='flex flex-col items-center gap-2'
        >
          <header
            className='text-sm leading-4 font-normal'
          >
            <strong className='font-semibold'>Terminal:</strong> {terminal}
          </header>

          <EtiquetaVerde text='Asistido' />

          <Link
            to={routes.asistencias}
            className='text-azul-500 text-xs font-normal leading-4 hover:underline'
          >
            Mis Asistencias
          </Link>
        </section>

        <hr className='w-[200px] border-bordesSeparador' />

        <section
          className='flex flex-col gap-2 max-w-full'
        >
          <strong
            className='text-base leading-4 font-semibold text-azul-500'
          >
            Denominaciones:
          </strong>

          <ul
            className='flex flex-col gap-2 items-center max-w-full'
          >
            {
              denominaciones.map((denominacion) => (
                <li
                  key={denominacion}
                  className='text-xs max-w-full overflow-hidden text-ellipsis text-nowrap whitespace-nowrap leading-4 font-normal text-textoPrincipal'
                >
                  {denominacion}
                </li>
              ))
            }
          </ul>

        </section>
      </article>
    </section>
  )
}
