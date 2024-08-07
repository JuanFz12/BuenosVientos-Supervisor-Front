import './ListVales.css'

import { BotonDetalles } from '../../../components/botones/BotonDetalles'
import { BotonPaginacion } from '../../../components/botones/BotonPaginacion'
import { ListStyle } from '../../../components/listStyle/ListStyle'
import { ValeMovilidad } from './modales/ValeMovilidad'
import { useRef, useState } from 'react'
import { formatearFechaCorta } from '../../../utils/formatear'
import { ValeMovilidadReadOnly } from './modales/ValeMovilidadReadOnly'
import {
  apiEstados,
  estadosNoEditables,
  optionsEstados,
  tagStatus
} from '../consts/estados'
import { EtiquetaSelect } from '../../../components/etiquetas/EtiquetaSelect'
import { useValesStore } from '../../../store/vales/useValesStore'
import { Etiqueta } from '../../../components/etiquetas/Etiquetas'

export function ListVales({ loading, data, solicitudes = false }) {
  const valeMovilidadModal = useRef()

  const [currentData, setCurrentData] = useState(null)

  const { updateEstadoVale } = useValesStore()

  return (
    <>
      {solicitudes
        ? !loading &&
          Boolean(data?.length) && (
            <ValeMovilidad
              refModal={valeMovilidadModal}
              data={currentData}
              onClose={() => setCurrentData(null)}
            />
          )
        : !loading &&
          Boolean(data?.length) && (
            <ValeMovilidadReadOnly
              refModal={valeMovilidadModal}
              data={currentData}
              onClose={() => setCurrentData(null)}
            />
          )}

      <section className="render-vales w-full h-auto [&_li]:text-nowrap [&_li]:overflow-hidden [&_li]:text-ellipsis rounded-[20px] overflow-clip flex flex-col gap-2">
        <header>
          <ListStyle className="py-3 px-6 text-xs font-normal leading-4 flex-wrap w-full min-h-11">
            <li>No.</li>
            <li>Corporación</li>
            <li>Área</li>
            <li>Fecha</li>
            <li>Destino</li>
            {!solicitudes && <li className="w-[max(14%,_105px)]">Taxista</li>}
            {!solicitudes && (
              <li className="w-[max(10%,_100px)] flex-grow">Estado</li>
            )}
            <li className="w-[max(10%,_90px)] lg:max-w-[250px]" />
          </ListStyle>
        </header>

        {loading && (
          <ListStyle className="py-3 px-6 text-sm font-normal leading-4 flex-wrap w-full min-h-[72px]">
            Cargando...
          </ListStyle>
        )}

        {!loading &&
          Boolean(data?.length) &&
          data.map(
            (
              {
                [solicitudes ? 'requestVale' : 'submitVale']: { id },
                [solicitudes ? 'area_corporative' : 'area']: {
                  area_name: area
                },
                corporation: { corporation_name: corporacion },
                requestVale: {
                  id: idRequestVale,
                  destinyDestination,
                  application_status: estado,
                  date: fechaParam
                }
              },
              idx
            ) => {
              const fecha = formatearFechaCorta(fechaParam)

              // const destinyRegex = /, (.*?),/
              // const destino = destinyDestination.match(destinyRegex)?.[1] || 'Sin destino'
              const destino = destinyDestination || 'Sin destino' // No estoy seguro si usar o no regex.

              const taxista = !solicitudes && `${data[idx].driver.fullName}`

              return (
                <ListStyle
                  key={id}
                  className="py-3 px-6 text-sm font-normal leading-4 flex-wrap flex-1 lg:flex-grow-0 w-full min-h-[72px]"
                >
                  <li title={id}>{id}</li>
                  <li title={corporacion}>{corporacion}</li>
                  <li title={area}>{area}</li>
                  <li title={fecha}>{fecha}</li>
                  <li title={destino}>{destino}</li>
                  {!solicitudes && (
                    <li title={taxista} className="w-[max(14%,_105px)]">
                      {taxista}
                    </li>
                  )}
                  {!solicitudes && (
                    <li
                      className="!overflow-visible"
                      title={tagStatus[estado].text}
                    >
                      {estadosNoEditables[estado] ? (
                        <Etiqueta
                          className="w-fit"
                          text={tagStatus[estado].text}
                          color={tagStatus[estado].color}
                        />
                      ) : (
                        <EtiquetaSelect
                          className="max-w-[150px]"
                          color={tagStatus[estado].color}
                          options={optionsEstados} // hay estados que no pueden ser editados, ejemplo, si el vale esta completo, no se puede cambiar el estado, revisar la doc de la api
                          fnSelected={({ value }) => value === estado}
                          fnDisabled={({ value }) => value !== estado}
                          onChange={({ value }) => {
                            if (value === estado) return
                            updateEstadoVale({ idRequestVale, status: value })
                          }}
                          maxVisibleOptions={2}
                          placeholder="Estado"
                        />
                      )}
                    </li>
                  )}
                  <li className="w-[max(10%,_90px)] lg:max-w-[250px] text-center">
                    {' '}
                    {/* se esta haciendo un text-center para no usar flex */}
                    {/* si se puede mejorar esto despues */}
                    {solicitudes && estado === apiEstados.asignado ? (
                      ''
                    ) : (
                      <BotonDetalles
                        onClick={() => {
                          // alert('Funcionalidad no disponible en este momento')
                          setCurrentData(data[idx])
                          valeMovilidadModal.current.showModal()
                        }}
                      >
                        Detalles
                      </BotonDetalles>
                    )}
                  </li>
                </ListStyle>
              )
            }
          )}

        <footer className="flex flex-wrap gap-2 items-center text-sm font-medium leading-4 justify-between w-full bg-white px-5 py-2 min-h-20">
          <span>Página 1 de 15</span>

          <div className="flex items-center gap-5">
            <BotonPaginacion text="Anterior" left />
            <BotonPaginacion text="Siguiente" />
          </div>
        </footer>
      </section>
    </>
  )
}
