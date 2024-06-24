import { Link, Outlet } from 'react-router-dom'
import { Filtros } from '../../assets/icons/elements/Filtros'
import { Buscador } from '../../components/buscador/Buscador'
import { SelectorFecha } from '../../components/selectorFecha/SelectorFecha'
import { Notificacion } from '../../assets/icons/elements/Notificacion'
import { routes } from '../../routes'
import { useEffect, useRef, useState } from 'react'
import { changeDocTitle, titlePages } from '../../consts/titlePage'
import { useLayout } from '../../store/useLayout'
import { NuevoVale } from './components/modales/nuevoVale/NuevoVale'
import { useTaxistas } from '../../store/taxistas/useTaxistas'
import { useVehiculos } from '../../store/vehiculos/useVehiculos'
import { BotonDetalles } from '../../components/botones/BotonDetalles'
import { useUsuarioSupervisor } from '../../store/useUsuarioSupervisor'
import { apiRequest } from '../../consts/api'

export function Vales () {
  useEffect(() => changeDocTitle(titlePages.vales), [])

  const { getTaxistas } = useTaxistas()
  const { getVehiculos } = useVehiculos()

  useEffect(() => {
    getVehiculos()
    getTaxistas()
  }, [getTaxistas, getVehiculos])

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

function Header ({ solicitudes }) {
  const { valesRoutes } = routes

  const { token } = useUsuarioSupervisor()
  const [isFetchingReport, setIsFetchingReport] = useState(false)

  function downloadExcelReport () { // Funcion para descargar el reporte de excel desde el backend
    const url = apiRequest.descargarReporteVales
    const fileName = `Reporte de Vales - ${new Date().toLocaleString('es-PE')}`.replaceAll('.', '')

    setIsFetchingReport(true)

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
      cache: 'no-store' // Siempre quiero obtener el archivo excel actualizado del backend y por eso no quiero guardar la respuesta en cache
    }

    fetch(url, options)
      .then(response => {
        if (response.ok) return response.blob()
        if (response.status === 404) return Promise.reject(new Error('El recurso solicitado no existe'))

        response.json()
          .then(err => Promise.reject(err))
          .catch(err => Promise.reject(err))
      })
      .then(blob => {
        const fileUrl = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = fileUrl
        link.download = fileName
        link.click() // Iniciar la descarga
      })
      .catch(e => {
        alert(`Ocurrió un error mientras se intentaba descargar el reporte: ${e.message ?? e.error ?? 'Error desconocido'}`)
      })
      .finally(() => setIsFetchingReport(false))
  }

  const nuevoValeModal = useRef()

  return (
    <header
      className='w-full mb-8 flex flex-wrap gap-3 min-h-9 items-center justify-between'
    >
      <menu
        className='flex flex-wrap items-center justify-between gap-5'
      >
        <NuevoVale
          refModal={nuevoValeModal}
        />
        <button
          onClick={() => nuevoValeModal.current.showModal()}
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
      </menu>

      <section
        className='flex flex-wrap items-center gap-5'
      >
        <BotonDescargarReporte
          onClick={downloadExcelReport}
          isLoading={isFetchingReport}
        />

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

function BotonDescargarReporte ({ onClick, isLoading, ...props }) {
  return (
    <BotonDetalles
      {...props}
      className='bg-transparent flex-shrink-0 flex items-center gap-2'
      onClick={onClick}
    >
      {
        isLoading && (
          <span
            // Este span actuara como un loader
            className='inline-block size-3 border-[2px] animate-spin border-dashed rounded-full border-blue-400'
          />
        )
      }

      Exportar Vales
    </BotonDetalles>
  )
}
