import { useEffect } from 'react'
import { Buscador } from '../../components/buscador/Buscador'
import { changeDocTitle, titlePages } from '../../consts/titlePage'
import { useLocation } from 'react-router-dom'
import { routes } from '../../routes'
import { BotonNotificacion } from '../../components/botones/BotonNotificacion'
import { RenderExoneraciones } from './components/RenderExoneraciones'

export function Exoneraciones () {
  useEffect(() => changeDocTitle(titlePages.exoneraciones), [])

  return (
    <main>
      <Header />
      <RenderExoneraciones />
    </main>
  )
}

function Header () {
  // const nuevaExoneracionModal = useRef()

  const { pathname } = useLocation()

  return (
    <header
      className='flex justify-between mb-8 flex-wrap gap-8'
    >
      <menu
        className='flex flex-wrap gap-5 items-center'
      >
        <li>
          <button
            type='button'
            // onClick={() => nuevaExoneracionModal.current.showModal()}
            onClick={() => alert('en construccion')}
            className='boton-primario-verde w-[200px]'
          >
            Nueva Exoneración
          </button>
          {/* <NuevaExoneracion refModal={nuevaExoneracionModal} /> */}
        </li>

        {
          pathname === routes.exoneraciones && (
            <li>
              <BotonNotificacion
                // to={routes.asistencias.exoneracionesRoutes.solicitudes}
                onClick={() => alert('en construccion')}
              />
            </li>
          )
        }
      </menu>

      <Buscador
        labelClass='flex-1 max-w-[420px]'
        className='w-full'
      />
    </header>
  )
}
