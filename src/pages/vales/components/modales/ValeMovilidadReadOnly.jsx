import { useRef } from 'react'
import { NormalCheck } from '../../../../components/checkbox/Checkbox'
import { TextArea } from '../../../../components/inputs/TextArea'
import { LabelText } from '../../../../components/labels/LabelText'
import { ModalBase } from '../../../../components/modales/ModalBase'
import { getImage } from '../../../../consts/api'
import { useVehiculos } from '../../../../store/vehiculos/useVehiculos'
import { formatearFechaCorta, formatearHoraLarga } from '../../../../utils/formatear'
import { formatearASoles } from '../../../../utils/formatearASoles'
import { serviciosLabel, tipoServicio, tiposServicioApi } from '../../consts/tiposServicio'
import { PasajerosModalReadOnly } from './PasajerosModalReadOnly'
import { labelRutasFijasFromApi } from '../../consts/vales'
import { SelectTaxista } from '../vale/SelectTaxista'

export function ValeMovilidadReadOnly ({
  refModal: thisModal,
  data,
  onClose
}) {
  const { vehiculos } = useVehiculos()

  const {
    detail_user_corporate: {
      user_name: nombres,
      surnames: apellidos
    } = {},
    area: {
      area_name: area
    } = {},
    requestVale: {
      date: fecha,
      hours: horas,
      destiny: destino,
      destiny_fixed: rutaFija,
      remarks: observaciones,
      request_time: horaSolicitada,
      departure_time: horaSalida,
      service,
      vehicle_id: idVehiculo,
      passengers: pasajeros,
      request_to_load: carga,
      request_to_extraload: extraCarga
    } = {},
    submitVale: {
      cost_actual: costoReal,
      discount: descuento,
      sub_total: subTotal,
      igv,
      payment_to_driver: pagoTaxista,
      peaje,
      total_cost: total
    } = {},
    driver: {
      fullName: taxista
    } = {},
    user_corporative: {
      signature: firma
    } = {}
  } = data || {}

  // Vehiculo
  const vehiculo = vehiculos.find(v => parseInt(v.id) === parseInt(idVehiculo))
  const getPrice = (key) => vehiculo && Boolean(parseFloat(vehiculo?.[key])) && formatearASoles({ numero: vehiculo?.[key] })

  const costoCargaVehiculo = getPrice('load')
  const costoExtraCargaVehiculo = getPrice('extra_load')

  const vehiculoNombre = vehiculo?.vehicle_name

  // Pasajeros
  const pasajerosModal = useRef()
  const primerPasajeroNombre = pasajeros && `${pasajeros[0].firstName} ${pasajeros[0].lastName}`

  // Tipo de servicio
  const servicio = tipoServicio[service]

  const isDestiny = tiposServicioApi.destino === service
  const isRutaFija = tiposServicioApi.rutasFijas === service

  const servicioLabel = serviciosLabel[service]
  const rutaFijaValor = labelRutasFijasFromApi[rutaFija]

  // Costo carga
  const costoCarga = carga ? costoCargaVehiculo : extraCarga ? costoExtraCargaVehiculo : 'S/ 00.00'

  return (
    <>
      <ModalBase
        refModal={thisModal}
        onClose={onClose}
      >
        <section
          // en un ideal el alto deberia ser de 804px
          className='w-[640px] h-fit max-h-[85dvh] gap-5 flex flex-col p-5 rounded-[32px] overflow-x-clip overflow-y-auto scroll-neutral'
        >
          <header>
            <h4 className='titulo-h4 text-azul-500'>Vale de movilidad</h4>
          </header>

          {/* En un ideal el alto deberia ser de 584px */}
          <fieldset className='flex gap-5 h-fit justify-between'>
            <fieldset className='flex flex-col gap-5 h-full w-[358px]'>
              <LabelText
                label='Funcionario'
                defaultValue={nombres && `${nombres} ${apellidos}`}
                readOnly
              />

              <fieldset
                className='flex gap-5 justify-between max-w-full'
              >
                <LabelText
                  label='Área'
                  defaultValue={area}
                  readOnly
                />

                <LabelText
                  label='Vehículo'
                  defaultValue={vehiculoNombre}
                  readOnly
                />
              </fieldset>

              <fieldset
                className='flex gap-m justify-between'
              >
                <LabelText
                  label='Pasajeros'
                  labelClass='flex-1'
                  defaultValue={primerPasajeroNombre}
                  readOnly
                />

                <button
                  className='boton-primario-marca h-9 self-end'
                  type='button'
                  onClick={() => pasajerosModal.current.showModal()}
                >
                  Ver más
                </button>
              </fieldset>

              <fieldset className='flex gap-5 justify-between'>
                <LabelText
                  label='Fecha'
                  defaultValue={fecha && formatearFechaCorta(fecha)}
                  readOnly
                />

                <LabelText
                  label='Servicio'
                  defaultValue={servicio}
                  readOnly
                />
              </fieldset>

              <LabelText
                label={servicioLabel}
                defaultValue={isRutaFija ? rutaFijaValor : horas}
                readOnly
              >
                {
                  // Renderizar condicionalmente dependiendo del tipo de servicio
                  (() => {
                    if (!isDestiny && !isRutaFija) return null

                    if (isDestiny) {
                      return (
                        <TextArea
                          defaultValue={destino}
                          readOnly
                        />
                      )
                    }

                    return null
                  })()
                }
              </LabelText>

              <fieldset className='flex flex-col gap-2'>
                <LabelText label='Observaciones'>
                  <TextArea
                    className='w-full h-[84px]'
                    defaultValue={observaciones}
                    readOnly
                  />
                </LabelText>

                <fieldset
                  className='flex justify-between gap-2 max-w-full'
                >
                  <label
                    className='flex items-center gap-2 h-4 texto-regular-m text-textoPrincipal'
                  >
                    <NormalCheck
                      labelClass='scale-[80%] cursor-default'
                      defaultChecked={carga}
                      disabled
                    />

                    Solicitar carga
                  </label>

                  <label
                    className='flex items-center gap-2 h-4 texto-regular-m text-textoPrincipal'
                  >
                    <NormalCheck
                      labelClass='scale-[80%] cursor-default'
                      defaultChecked={extraCarga}
                      disabled
                    />

                    Solicitar extra carga
                  </label>
                </fieldset>
              </fieldset>

              <fieldset className='flex gap-5 justify-between w-full max-w-full'>
                <LabelText
                  label='Hora Solicitada'
                  defaultValue={horaSolicitada && formatearHoraLarga(horaSolicitada)}
                  readOnly
                />

                <LabelText
                  label='Hora de Salida'
                  defaultValue={horaSalida && formatearHoraLarga(horaSalida)}
                  readOnly
                />
              </fieldset>
            </fieldset>

            <hr className='w-px h-full border-l border-bordesSeparador' />

            {/* Segunda parte */}
            <fieldset className={`flex flex-col ${isDestiny ? 'gap-[19px]' : 'gap-3'} h-full`}>
              <LabelText
                label='Costo Real'
                defaultValue={formatearASoles({ numero: costoReal })}
                inputClass='bg-white cursor-default'
                readOnly
              />

              <LabelText
                label='Descuento'
                defaultValue={formatearASoles({ numero: descuento })}
                inputClass='bg-white cursor-default'
                readOnly
              />

              <LabelText
                label='Sub Total'
                defaultValue={formatearASoles({ numero: subTotal })}
                inputClass='bg-white cursor-default'
                readOnly
              />

              <LabelText
                label='+ I.G.V.'
                defaultValue={formatearASoles({ numero: igv })}
                inputClass='bg-white cursor-default'
                readOnly
              />

              <LabelText
                label='Peaje / Est.'
                defaultValue={formatearASoles({ numero: peaje })}
                readOnly
                inputClass='bg-white cursor-default'
              />

              <LabelText
                label='Total a pagar'
                defaultValue={formatearASoles({ numero: total })}
                labelClass='text-amarilloAdvertencia-700 font-medium'
                inputClass='!text-amarilloAdvertencia-700 font-medium !border-[#EE8C0B] !bg-amarilloAdvertencia-100'
                readOnly
              />

              <LabelText
                label='Costo adicional de carga'
                value={costoCarga}
                readOnly
              />

              <fieldset className='cursor-default border-2 w-[190px] h-[108px] border-bordesIdle rounded-lg flex items-center justify-center'>
                <img
                  className='max-w-[186px] h-[104px] object-contain rounded-md'
                  src={getImage(firma)}
                  alt='Imagen'
                />
              </fieldset>
            </fieldset>
          </fieldset>

          <SelectTaxista
            readOnly
            defaultValue={taxista}
            pagoTaxista={pagoTaxista}
          />

          <button
            className='boton-terciario-marca w-[100px] self-end'
            type='button'
            onClick={() => thisModal.current.close()}
          >
            Cerrar
          </button>

        </section>
      </ModalBase>

      <PasajerosModalReadOnly
        refModal={pasajerosModal}
        pasajeros={pasajeros}
      />
    </>
  )
}
