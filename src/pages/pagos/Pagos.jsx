import { useEffect, useState } from 'react'
import { BotonFiltro } from '../../components/botones/BotonFiltro'
import { Buscador } from '../../components/buscador/Buscador'
import { InputTime } from '../../components/inputs/InputTime'
import { Select } from '../../components/select/Select'
import { routes } from '../../routes'
import { useLayout } from '../../store/useLayout'
import { RenderPagos } from './components/RenderPagos'
import { useMatch } from 'react-router-dom'
import { BotonDetalles } from '../../components/botones/BotonDetalles'
import { DownloadIcon } from '../../assets/icons/elements/DownloadIcon'
import { apiRequest } from '../../consts/api'
import { useUsuarioSupervisor } from '../../store/useUsuarioSupervisor'
import { getUsuarioSupervisor } from '../../utils/getUsuarioSupervisor'

export function Pagos() {
  const { setTitulo } = useLayout()

  useEffect(() => {
    setTitulo('Pagos diarios')

    return () => setTitulo(undefined)
  }, [setTitulo])

  return (
    <main>
      <Header />
      <RenderPagos />
    </main>
  )
}

function Header() {
  const index = routes.pagos
  const { pagosDenominacion } = routes.pagosRoutes
  const rutaPagosDenominacion = `${index}/${pagosDenominacion}`
  const matchPagosDenominacion = useMatch(rutaPagosDenominacion)

  const { token } = useUsuarioSupervisor()
  const { terminal } = getUsuarioSupervisor()
  const [isFetchingReport, setIsFetchingReport] = useState(false)

  const startDownloadExcelReport = async () =>
    await downloadExcelReport({
      token,
      setIsLoading: setIsFetchingReport,
      terminalId: terminal.id
    })

  return (
    <header className="flex justify-between mb-8 flex-wrap gap-8">
      <menu className="flex flex-wrap items-center gap-5 [&>li]:flex-grow-[1] [&>li]:min-w-[140px]">
        <li>
          <InputTime
            defaultValue={new Date().toISOString().split('T')[0]}
            className="w-auto max-w-full uppercase"
            type="date"
          />
        </li>
        {matchPagosDenominacion && (
          <li>
            <Select placeholder="Denominacion" />
          </li>
        )}
      </menu>

      <menu className="flex flex-wrap gap-5 items-center justify-end">
        <BotonDescargarReporte
          onClick={startDownloadExcelReport}
          isLoading={isFetchingReport}
        />
        <li>
          <BotonFiltro onClick={() => alert('en desarrollo')} />
        </li>

        <li className="flex-1">
          <Buscador labelClass="flex-1 max-w-[420px]" className="w-full" />
        </li>
      </menu>
    </header>
  )
}

function BotonDescargarReporte({ onClick, isLoading, ...props }) {
  return (
    <BotonDetalles
      {...props}
      className="bg-transparent flex-shrink-0 flex items-center gap-2 group"
      onClick={onClick}
    >
      {isLoading ? (
        <span
          // Este span actuara como un loader
          className="inline-block size-3 border-[2px] animate-spin border-dashed rounded-full border-blue-400"
        />
      ) : (
        <DownloadIcon
          color="#358643"
          size={12}
          className="scale-150 [&>path]:transition [&>path]:ease-in-out [&>path]:duration-[0.25s] group-hover:[&>path]:fill-[#195E25]"
        />
      )}
      Exportar Pagos
    </BotonDetalles>
  )
}
async function downloadExcelReport({ token, setIsLoading, terminalId }) {
  // Función para descargar el reporte de excel desde el backend
  const url = apiRequest.descargarReportesPagos
  const urlExcel = apiRequest.rutaExcelPagos
  const fileName = `Reporte de Pagos - ${new Date().toLocaleString(
    'es-PE'
  )}`.replaceAll('.', '')

  const options = {
    method: 'POSt',
    body: JSON.stringify({
      currentDate: '2024-08-01 00:00:00',
      terminalId
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }
  const optionsExcel = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    },
    cache: 'no-store' // Siempre quiero obtener el archivo excel actualizado del backend y por eso no quiero guardar la respuesta en cache
  }

  try {
    setIsLoading(true)

    const response = await fetch(url, options)

    if (response.status === 404)
      return Promise.reject(new Error('El recurso solicitado no existe'))

    const { data } = await response.json()
    const { filePath } = data

    const responseExcel = await fetch(`${urlExcel}/${filePath}`, optionsExcel)
    if (responseExcel.status === 404)
      return Promise.reject(new Error('El recurso solicitado no existe'))

    const blob = await responseExcel.blob()
    const fileUrl = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = fileUrl
    link.download = fileName
    link.click() // Iniciar la descarga

    // Revocar el Object Url creado anteriormente.
    window.URL.revokeObjectURL(fileUrl)
  } catch (error) {
    console.log(error)
  } finally {
    setIsLoading(false)
  }
}
