import { useRef, useState } from 'react'
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
import { useTaxistas } from '../../../../store/taxistas/useTaxistas'
import { PasajerosModalReadOnly } from './PasajerosModalReadOnly'
import { SelectTaxista } from '../vale/SelectTaxista'
import { PrimeraParteRO } from '../valeReadOnly/PrimeraParteRO'
import { costoRutasFijas, latLngValuesFromRutasFijas } from '../../consts/vales'
import { isEqual } from '../../../../utils/isEqual'
import { IGV, ceroSoles } from '../../../../consts/consts'
import { getNumbers } from '../../../../helpers/getNumbers'

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

export function ValeMovilidad({ refModal: thisModal, data, onClose }) {
  const {
    usuarioSupervisor: { id: supervisorId }
  } = useUsuarioSupervisor()

  const { aceptarVale } = useValesStore()
  const { taxistas } = useTaxistas()

  const initialCosto = {
    costoReal: '',
    descuento: ceroSoles,
    subTotal: ceroSoles,
    igv: ceroSoles,
    total: ceroSoles,
    peaje: ''
  }

  const [costo, setCosto] = useState(initialCosto)

  const formRef = useRef()
  const pasajerosModalReadOnlyRef = useRef()

  const dataToUse = data || {}

  const {
    requestVale: {
      id,
      passengers: pasajeros,
      request_to_load: carga,
      request_to_extraload: extraCarga,
      startLat,
      startLng,
      endLat,
      endLng
    } = {},
    area_corporative: { discount: descuento } = {},
    user_corporative: { signature: firma } = {}
  } = dataToUse

  const dataToSend = {
    ...dataToUse,
    detail_user_corporate: dataToUse.user,
    area: dataToUse.area_corporative
  }

  // vehiculo
  const vehiculo = dataToUse.vehicle

  const getPrice = key =>
    vehiculo &&
    vehiculo?.[key] !== 'undefined' &&
    formatearASoles({ numero: vehiculo?.[key] })

  const costoCargaVehiculo = getPrice('load')
  const costoExtraCargaVehiculo = getPrice('extra_load')

  const vehiculoId = vehiculo?.id

  const startCoords = {
    lat: startLat,
    lng: startLng
  }

  const endCoords = {
    lat: endLat,
    lng: endLng
  }

  // Servicio
  const isRutaFija = isRutaFijaFn({ startCoords, endCoords })

  // Carga
  const costoCarga = carga
    ? costoCargaVehiculo
    : extraCarga
    ? costoExtraCargaVehiculo
    : ceroSoles

  if (parsearSoles(costoCarga) > 0 && parsearSoles(costo.total) <= 0) {
    console.log({ costoCarga })
    setCosto(state => ({
      ...state,
      total: costoCarga
    }))
  }

  if (isRutaFija && !costo.costoReal) {
    const { costoReal, costoTotal } = costoRutasFijas[isRutaFija]

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
          setCosto(initialCosto)

          onClose && onClose(e)
        }}
      >
        <form
          ref={formRef}
          className="w-[640px] h-[804px] max-h-[85dvh] gap-5 flex flex-col p-5 rounded-[32px] overflow-x-clip overflow-y-auto scroll-neutral"
          onSubmit={e => {
            e.preventDefault()
            const formData = new FormData()

            for (const [key, value] of new FormData(e.target)) {
              if (!value) {
                alert(`El campo ${key} es obligatorio`)
                return
              }

              // Esto formatea todos los valores del formulario que puedan ser soles
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
                alert(
                  `Error: ${err.error ?? err.message ?? 'Error desconocido'}`
                )
                console.warn(err)
                atenuarFormulario({ form: e.target, restore: true })
              })
          }}
        >
          <header>
            <h4 className="titulo-h4 text-azul-500">Vale de movilidad</h4>
          </header>

          <fieldset className="flex gap-5 h-fit justify-between">
            {/* Primera parte */}
            <PrimeraParteRO
              data={dataToSend}
              pasajerosModalRef={pasajerosModalReadOnlyRef}
            />

            <hr className="w-px h-[584px] border-l border-bordesSeparador" />

            {/* Segunda parte ----> Tener en cuenta que los servicios fijos ya tienen un precio establecido y no se pueden cambiar ok */}
            <fieldset className="flex flex-col gap-3 h-full">
              <LabelText
                label="Costo Real"
                name={fields.costoReal}
                value={costo.costoReal}
                readOnly={isRutaFija}
                required
                onChange={e =>
                  setCostoReal({
                    event: e,
                    costo,
                    setCosto,
                    initialCosto,
                    costoAdicionalCarga: costoCarga,
                    descuento
                  })
                }
                placeholder={ceroSoles}
              />

              <LabelText
                label="Descuento"
                name={fields.descuento}
                value={costo.descuento}
                required
                inputClass="bg-white cursor-default"
                readOnly
              />

              <LabelText
                label="Sub Total"
                name={fields.subTotal}
                value={costo.subTotal}
                required
                inputClass="bg-white cursor-default"
                readOnly
              />

              <LabelText
                label="+ I.G.V."
                name={fields.igv}
                value={costo.igv}
                required
                inputClass="bg-white cursor-default"
                readOnly
              />

              <LabelText
                label="Peaje / Est."
                name={fields.peaje}
                value={costo.peaje}
                readOnly={isRutaFija}
                required={false}
                placeholder="S/ 00.00"
                onChange={e =>
                  setPeaje({
                    event: e,
                    costo,
                    setCosto,
                    costoAdicionalCarga: costoCarga
                  })
                }
              />

              <LabelText
                label="Total a pagar"
                name={fields.total}
                value={costo.total}
                required
                readOnly
                labelClass="text-amarilloAdvertencia-700 font-medium"
                inputClass="!text-amarilloAdvertencia-700 font-medium !border-[#EE8C0B] !bg-amarilloAdvertencia-100"
              />

              <LabelText
                label="Costo adicional de carga"
                value={costoCarga}
                readOnly
              />

              <fieldset className="relative cursor-default border-2 w-[190px] h-[108px] border-bordesIdle rounded-lg flex items-center justify-center">
                <img
                  className="max-w-[186px] h-[104px] object-contain rounded-md"
                  src={getImage(firma)}
                  alt="Imagen"
                />

                <input
                  className="absolute -z-50 inset-0 opacity-0 size-0 pointer-events-none"
                  type="text"
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
            costoTotal={costo.total}
          />

          <MenuComun
            cancelProps={{ type: 'button', className: 'w-[100px]' }}
            handleCancel={() => thisModal.current.close()}
            cancelName="Cancelar"
            confirmName="Aceptar"
            confirmProps={{ type: 'submit', className: 'w-[160px]' }}
          />
        </form>
      </ModalBase>

      <PasajerosModalReadOnly
        refModal={pasajerosModalReadOnlyRef}
        pasajeros={pasajeros}
      />
    </>
  )
}

function isRutaFijaFn({ startCoords, endCoords }) {
  let result = false

  Object.entries(latLngValuesFromRutasFijas).some(([key, value]) => {
    const isEqualStartCoords = isEqual(startCoords, value.start)
    const isEqualEndCoords = isEqual(endCoords, value.end)

    if (isEqualStartCoords && isEqualEndCoords) {
      result = key
      return true
    }
    return false
  })

  return result
}

function setCostoFijo({ costoInicial, costoTotal, setCosto, discountParam }) {
  let costoReal
  let descuento
  let subTotal
  let igv
  let peaje
  let total

  const igvPorcentaje = 0.18
  const descuentoFormateado =
    parseFloat(discountParam.replace(/[^\d.]/g, '')) / 100

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

function setCostoReal({
  event,
  descuento: discount,
  initialCosto,
  costo,
  setCosto,
  costoAdicionalCarga
}) {
  const descuentoParsed = getNumbers({ string: discount }) / 100

  if (!descuentoParsed)
    throw new Error('No se ha seleccionado un usuario corporativo')

  const valorFormateado = formatearInputASoles({ event, controlled: true })

  if (!valorFormateado) {
    const total = parsearSoles(costoAdicionalCarga) + parsearSoles(costo.peaje)

    setCosto(state => ({
      ...initialCosto,
      peaje: state.peaje,
      total: formatearASoles({ numero: total }) || ceroSoles
    }))

    return
  }

  const descuento = valorFormateado * descuentoParsed
  const subTotal = parseFloat(
    (valorFormateado * (1 - descuentoParsed)).toFixed(2)
  )
  const igv = parseFloat((subTotal * IGV).toFixed(2))
  const peaje = parsearSoles(costo.peaje) // peaje solo se usa para sumar el total
  const total =
    parsearSoles(costoAdicionalCarga) +
    parseFloat((subTotal + igv + peaje).toFixed(2))

  setCosto(state => ({
    costoReal: formatearASoles({ numero: valorFormateado }),
    descuento: formatearASoles({ numero: descuento, cero: true }),
    subTotal: formatearASoles({ numero: subTotal, cero: true }),
    igv: formatearASoles({ numero: igv, cero: true }),
    peaje: state.peaje,
    total: formatearASoles({ numero: total })
  }))
}

function setPeaje({ event, costo, setCosto, costoAdicionalCarga }) {
  const valorFormateado = formatearInputASoles({ event, controlled: true })

  const subTotal = parsearSoles(costo.subTotal)
  const igv = parsearSoles(costo.igv)

  const total =
    parsearSoles(costoAdicionalCarga) + subTotal + igv + valorFormateado

  setCosto(state => ({
    ...state,
    peaje: formatearASoles({ numero: valorFormateado }),
    total: formatearASoles({ numero: total }) || ceroSoles
  }))
}
