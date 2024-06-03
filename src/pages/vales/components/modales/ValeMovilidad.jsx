import { useRef, useState } from 'react'
import { NormalCheck } from '../../../../components/checkbox/Checkbox'
import { TextArea } from '../../../../components/inputs/TextArea'
import { LabelText } from '../../../../components/labels/LabelText'
import { MenuComun } from '../../../../components/menus/MenuComun'
import { ModalBase } from '../../../../components/modales/ModalBase'
import { formatearInputASoles } from '../../../../utils/formatearInputASoles'
import { formatearASoles } from '../../../../utils/formatearASoles'
import { parsearSoles } from '../../../../utils/parsearSoles'
import { useUsuarioSupervisor } from '../../../../store/useUsuarioSupervisor'
import { useValesStore } from '../../../../store/vales/useValesStore'
import { atenuarFormulario } from '../../../../utils/atenuarFormulario'
import { getImage } from '../../../../consts/api'
import { formatearFechaCorta, formatearHoraCorta } from '../../../../utils/formatear'
import { useTaxistas } from '../../../../store/taxistas/useTaxistas'
import { useVehiculos } from '../../../../store/vehiculos/useVehiculos'
import { serviciosLabel, tipoServicio, tiposServicioApi } from '../../consts/tiposServicio'
import { costoRutasFijas, labelRutasFijasFromApi } from '../../consts/vales'
import { PasajerosModalReadOnly } from './PasajerosModalReadOnly'
import { SelectTaxista } from '../vale/SelectTaxista'

const fields = {
  taxista: 'taxista_id',
  supervisor: 'supervisor_id',
  costoReal: 'cost_actual',
  descuento: 'discount',
  igv: 'igv',
  peaje: 'peaje',
  subTotal: 'sub_total',
  total: 'total_cost',
  firma: 'signature'
}

export function ValeMovilidad ({ refModal: thisModal, data, onClose }) {
  const {
    usuarioSupervisor: {
      id: supervisorId
    }
  } = useUsuarioSupervisor()

  const { aceptarVale } = useValesStore()
  const { taxistas } = useTaxistas()
  const { vehiculos } = useVehiculos()

  const [costo, setCosto] = useState({
    costoReal: '',
    descuento: 'S/ 00.00',
    subTotal: 'S/ 00.00',
    igv: 'S/ 00.00',
    total: 'S/ 00.00',
    peaje: ''
  })

  const formRef = useRef()
  const pasajerosModalRef = useRef()

  const {
    requestVale: {
      id,
      date: fecha,
      // servicios
      destiny: destino,
      hours: horas,
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
    area_corporative: {
      area_name: area,
      discount: descuento
    } = {},
    user: {
      user_name: nombre,
      surnames: apellidos
    } = {},
    user_corporative: {
      signature: firma
    } = {}

  } = data || {}

  // vehiculo
  const vehiculo = vehiculos.find(v => parseInt(v.id) === parseInt(idVehiculo))

  const getPrice = (key) => vehiculo && vehiculo?.[key] !== 'undefined' && formatearASoles({ numero: vehiculo?.[key] })

  const costoCargaVehiculo = getPrice('load')
  const costoExtraCargaVehiculo = getPrice('extra_load')

  const vehiculoNombre = vehiculo?.vehicle_name
  const vehiculoId = vehiculo?.id

  // Pasajeros
  const primerPasajeroNombre = pasajeros && pasajeros[0].firstName

  // Tipo de servicio
  const servicio = tipoServicio[service]

  const isDestiny = tiposServicioApi.destino === service
  const isRutaFija = tiposServicioApi.rutasFijas === service

  const servicioLabel = serviciosLabel[service]
  const rutaFijaLabel = labelRutasFijasFromApi[rutaFija]

  // Carga
  const costoCarga = carga ? costoCargaVehiculo : extraCarga ? costoExtraCargaVehiculo : 'S/ 00.00'

  if (isRutaFija && !costo.costoReal) {
    const {
      costoReal,
      costoTotal
    } = costoRutasFijas[rutaFija]

    setCostoFijo({
      costoInicial: costoReal,
      costoTotal,
      discountParam: descuento,
      setCosto
    })
  }

  return (
    <>
      <ModalBase
        refModal={thisModal}
        onClose={e => {
          setCosto({
            costoReal: '',
            descuento: 'S/ 00.00',
            subTotal: 'S/ 00.00',
            igv: 'S/ 00.00',
            total: 'S/ 00.00',
            peaje: ''
          })

          onClose && onClose(e)
        }}
      >
        <form
          ref={formRef}
          className='w-[640px] h-[804px] max-h-[85dvh] gap-5 flex flex-col p-5 rounded-[32px] overflow-x-clip overflow-y-auto scroll-neutral'
          onSubmit={e => {
            e.preventDefault()
            const formData = new FormData()

            for (const [key, value] of new FormData(e.target)) {
              if (!value) {
                alert(`El campo ${key} es obligatorio`)
                return
              }

              formData.append(key, parsearSoles(value))
            }

            const body = Object.fromEntries(formData)
            body[fields.supervisor] = supervisorId
            body[fields.firma] = firma

            console.log({ body })

            atenuarFormulario({ form: e.target })

            aceptarVale({ id, body })
              .then(() => {
                alert('vale aceptado')
                thisModal.current.close()
              })
              .catch(err => {
                alert(`Error: ${err.error ?? err.message ?? 'Error desconocido'}`)
                console.warn(err)
                atenuarFormulario({ form: e.target, restore: true })
              })
          }}
        >
          <header>
            <h4
              className='titulo-h4 text-azul-500'
            >
              Vale de movilidad
            </h4>
          </header>

          <fieldset
            className='flex gap-5 h-fit justify-between'
          >
            <fieldset
              className='flex flex-col gap-5 h-full flex-grow'
            >
              <LabelText
                label='Funcionario'
                defaultValue={nombre && `${nombre} ${apellidos}`}
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
                  onClick={() => pasajerosModalRef.current.showModal()}
                >
                  Ver más
                </button>
              </fieldset>

              <fieldset
                className='flex gap-5 justify-between max-w-full'
              >
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
                defaultValue={isRutaFija ? rutaFijaLabel : horas}
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

              <fieldset
                className='flex flex-col gap-2'
              >
                <LabelText
                  label='Observaciones'
                >
                  <TextArea
                    className='w-full h-[84px] cursor-default bg-white'
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

              <fieldset
                className='flex gap-5 justify-between w-full max-w-full'
              >
                <LabelText
                  label='Hora Solicitada'
                  defaultValue={horaSolicitada && formatearHoraCorta(horaSolicitada)}
                  readOnly
                />

                <LabelText
                  label='Hora de Salida'
                  defaultValue={horaSalida && formatearHoraCorta(horaSalida)}
                  readOnly
                />
              </fieldset>

            </fieldset>

            <hr
              className='w-px h-[584px] border-l border-bordesSeparador'
            />

            {/* Segunda parte ----> Tener en cuenta que los servicios fijos ya tienen un precio establecido y no se pueden cambiar ok */}
            <fieldset
              className={`flex flex-col ${isDestiny ? 'gap-[19px]' : 'gap-3'} h-full`}
            >
              <LabelText
                label='Costo Real'
                name={fields.costoReal}
                value={costo.costoReal}
                readOnly={isRutaFija}
                required
                onChange={e => handleCosto({ event: e, costo, setCosto, discountParam: descuento })}
                placeholder='S/ 00.00'
              />

              <LabelText
                label='Descuento'
                name={fields.descuento}
                value={costo.descuento}
                required
                inputClass='bg-white cursor-default'
                readOnly
              />

              <LabelText
                label='Sub Total'
                name={fields.subTotal}
                value={costo.subTotal}
                required
                inputClass='bg-white cursor-default'
                readOnly
              />

              <LabelText
                label='+ I.G.V.'
                name={fields.igv}
                value={costo.igv}
                required
                inputClass='bg-white cursor-default'
                readOnly
              />

              <LabelText
                label='Peaje / Est.'
                name={fields.peaje}
                value={costo.peaje}
                readOnly={isRutaFija}
                required={false}
                onChange={e => {
                  const value = formatearInputASoles({ event: e, controlled: true })

                  if (isNaN(Number(value))) return
                  if (isNaN(Number(e.target.value.slice(-1)))) return

                  const subTotal = parsearSoles(costo.subTotal)
                  const igv = parsearSoles(costo.igv)

                  const total =
                  value
                    ? value + subTotal + igv
                    : subTotal + igv

                  setCosto(prev => ({
                    ...prev,
                    peaje: formatearASoles({ numero: value }),
                    total: formatearASoles({ numero: total }) || 'S/ 00.00'
                  }))
                }}
                placeholder='S/ 00.00'
              />

              <LabelText
                label='Total a pagar'
                name={fields.total}
                value={costo.total}
                required
                readOnly
                labelClass='text-amarilloAdvertencia-700 font-medium'
                inputClass='!text-amarilloAdvertencia-700 font-medium !border-[#EE8C0B] !bg-amarilloAdvertencia-100'
              />

              <LabelText
                label='Costo adicional de carga'
                value={costoCarga}
                readOnly
              />

              <fieldset className='relative cursor-default border-2 w-[190px] h-[108px] border-bordesIdle rounded-lg flex items-center justify-center'>
                <img
                  className='max-w-[186px] h-[104px] object-contain rounded-md'
                  src={getImage(firma)}
                  alt='Imagen'
                />

                <input
                  className='absolute -z-50 inset-0 opacity-0 size-0 pointer-events-none'
                  type='text'
                  defaultValue={firma}
                  readOnly
                />
              </fieldset>
            </fieldset>
          </fieldset>

          {/* realizar un buscador en tiempo real para buscar taxistas y seleccionarlos. UPDATE --> ya se hizo pero verificar si todo funciona bien */}
          <SelectTaxista
            vehiculoId={vehiculoId}
            taxistas={taxistas}
          />

          <MenuComun
            cancelProps={{ type: 'button', className: 'w-[100px]' }}
            handleCancel={() => thisModal.current.close()}
            cancelName='Cancelar'
            confirmName='Aceptar'
            confirmProps={{ type: 'submit', className: 'w-[160px]' }}
          />
        </form>
      </ModalBase>

      <PasajerosModalReadOnly
        refModal={pasajerosModalRef}
        pasajeros={pasajeros}
      />
    </>
  )
}

function setCostoFijo ({ costoInicial, costoTotal, setCosto, discountParam }) {
  let costoReal
  let descuento
  let subTotal
  let igv
  let peaje
  let total

  const igvPorcentaje = 0.18
  const descuentoFormateado = parseFloat(discountParam.replace(/[^\d.]/g, '')) / 100

  if (costoInicial) {
    const costo = costoInicial

    costoReal = costo

    descuento = costo * descuentoFormateado
    subTotal = parseFloat((costo * (1 - descuentoFormateado)).toFixed(2))

    igv = parseFloat((subTotal * igvPorcentaje).toFixed(2))

    peaje = parseFloat((costoTotal - (subTotal + igv)).toFixed(2))

    total = parseFloat((subTotal + igv + peaje).toFixed(2))
  }

  if (!costoInicial) {
    subTotal = parseFloat((costoTotal / 1 + igvPorcentaje).toFixed(2))
    igv = parseFloat((subTotal * igvPorcentaje).toFixed(2))

    costoReal = parseFloat((subTotal / (1 - descuentoFormateado)).toFixed(2))

    descuento = parseFloat((costoReal * descuentoFormateado).toFixed(2))

    const prePeaje = parseFloat((costoTotal - (subTotal + igv)).toFixed(2))
    peaje = prePeaje <= 0 ? 0 : prePeaje

    total = parseFloat((subTotal + igv + prePeaje).toFixed(2))
  }

  setCosto({
    costoReal: formatearASoles({ numero: costoReal }),
    descuento: formatearASoles({ numero: descuento, cero: true }),
    subTotal: formatearASoles({ numero: subTotal, cero: true }),
    igv: formatearASoles({ numero: igv, cero: true }),
    peaje: formatearASoles({ numero: peaje, cero: true }),
    total: formatearASoles({ numero: total, cero: true })
  })
}

function handleCosto ({ event, costo, setCosto, discountParam }) {
  const value = formatearInputASoles({ event, controlled: true })

  const discount = parseFloat(discountParam.replace(/[^\d.]/g, '')) / 100

  const descuento = value * discount
  const subTotal = parseFloat((value * (1 - discount)).toFixed(2))

  const igv = parseFloat((subTotal * 0.18).toFixed(2))

  const total = parsearSoles(costo.peaje) + subTotal + igv

  if (value === 0) {
    setCosto(prev => ({
      ...prev,
      total: prev.peaje || 'S/ 00.00',
      costoReal: '',
      descuento: 'S/ 00.00',
      subTotal: 'S/ 00.00',
      igv: 'S/ 00.00'
    }))
  } else {
    setCosto(prev => ({
      ...prev,
      total: formatearASoles({ numero: total }),
      costoReal: formatearASoles({ numero: value }),
      descuento: formatearASoles({ numero: descuento }),
      subTotal: formatearASoles({ numero: subTotal }),
      igv: formatearASoles({ numero: igv, cero: true })
    }))
  }
}
