import './ListVales.css'

import { BotonDetalles } from '../../../components/botones/BotonDetalles'
import { BotonPaginacion } from '../../../components/botones/BotonPaginacion'
import { Etiqueta } from '../../../components/etiquetas/Etiquetas'
import { ListStyle } from '../../../components/listStyle/ListStyle'
import { ValeMovilidad } from './modales/ValeMovilidad'
import { useRef, useState } from 'react'
import { formatearFechaCorta } from '../../../utils/formatear'
import { ValeMovilidadReadOnly } from './modales/ValeMovilidadReadOnly'
import { tipoServicio } from '../consts/tiposServicio'

const colors = {
  celeste: 'celeste',
  naranja: 'naranja',
  rojo: 'rojo',
  verde: 'verde'
}

const estados = {
  enviado: 'Submitted',
  aprobado: 'Approved'
}

const status = {
  [estados.enviado]: {
    text: 'Enviado',
    color: colors.celeste
  },
  [estados.aprobado]: {
    text: 'Completo',
    color: colors.verde
  }
}

export function ListVales ({ loading, data, solicitudes = false }) {
  const valeMovilidadModal = useRef()

  const [currentData, setCurrentData] = useState(null)

  return (
    <>
      {
        solicitudes
          ? (
              !loading && Boolean(data?.length) &&
                (
                  <ValeMovilidad
                    refModal={valeMovilidadModal}
                    data={currentData}
                    onClose={() => setCurrentData(null)}
                  />
                )
            )
          : (
              !loading && Boolean(data?.length) &&
                (
                  <ValeMovilidadReadOnly
                    refModal={valeMovilidadModal}
                    data={currentData}
                    onClose={() => setCurrentData(null)}
                  />
                )
            )
      }

      <section className='render-vales w-full h-auto [&_li]:text-nowrap [&_li]:overflow-hidden [&_li]:text-ellipsis rounded-[20px] overflow-hidden flex flex-col gap-2'>
        <header>
          <ListStyle className='py-3 px-6 text-xs font-normal leading-4 flex-wrap w-full min-h-11'>
            <li>No.</li>
            <li>Corporación</li>
            <li>Área</li>
            <li>Fecha</li>
            <li>Tipo de Servicio</li>
            {!solicitudes && <li className='w-[max(14%,_105px)]'>Taxista</li>}
            <li className='w-[max(10%,_90px)]'>Estado</li>
            <li className='w-[max(10%,_90px)]' />
          </ListStyle>
        </header>

        {
          loading && (
            <ListStyle className='py-3 px-6 text-sm font-normal leading-4 flex-wrap w-full min-h-[72px]'>
              Cargando...
            </ListStyle>
          )
        }

        {
          !loading &&
          Boolean(data?.length) &&
          data.map(({
            [solicitudes ? 'requestVale' : 'submitVale']: { id },
            [solicitudes ? 'area_corporative' : 'area']: { area_name: area },
            corporation: { corporation_name: corporacion },
            requestVale: {
              service: servicioParam,
              application_status: estado,
              date: fechaParam
            }
          }, idx) => {
            const fecha = formatearFechaCorta(fechaParam)
            const servicio = tipoServicio[servicioParam]

            const taxista = !solicitudes && `${data[idx].driver.fullName}`

            return (
              <ListStyle
                key={id}
                className='py-3 px-6 text-sm font-normal leading-4 flex-wrap flex-1 lg:flex-grow-0 w-full min-h-[72px]'
              >
                <li title={id}>{id}</li>
                <li title={corporacion}>{corporacion}</li>
                <li title={area}>{area}</li>
                <li title={fecha}>{fecha}</li>
                <li title={servicio}>{servicio}</li>
                {
                  !solicitudes && (
                    <li title={taxista} className='w-[max(14%,_105px)]'>
                      {taxista}
                    </li>
                  )
                }
                <li
                  className='w-[max(10%,_90px)]'
                  title={status[estado].text}
                >
                  <Etiqueta
                    className='w-max'
                    text={status[estado].text}
                    color={status[estado].color}
                  />
                </li>
                <li className='w-[max(10%,_90px)]'>
                  {/* si se puede mejorar esto despues */}
                  {
                    solicitudes &&
                    estado === estados.aprobado
                      ? ''
                      : (
                        <BotonDetalles
                          onClick={() => {
                            // alert('Funcionalidad no disponible en este momento')
                            setCurrentData(data[idx])
                            valeMovilidadModal.current.showModal()
                          }}
                        >
                          Detalles
                        </BotonDetalles>
                        )
                  }
                </li>
              </ListStyle>
            )
          })
        }

        <footer className='flex flex-wrap gap-2 items-center text-sm font-medium leading-4 justify-between w-full bg-white px-5 py-2 min-h-20'>
          <span>Página 1 de 15</span>

          <div className='flex items-center gap-5'>
            <BotonPaginacion text='Anterior' left />
            <BotonPaginacion text='Siguiente' />
          </div>
        </footer>
      </section>
    </>
  )
}
