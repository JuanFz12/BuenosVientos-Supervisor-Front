import { useContext } from 'react'
import { useCorporativos } from '../../../../../store/usuariosCorporativos/useCorporativos'
import { ValeContext } from '../context/ValeContext'
import { initialValeState } from '../context/storeValeContext'
import { formatearASoles } from '../../../../../utils/formatearASoles'
import { usePasajeros } from '../../../../../store/pasajeros/usePasajeros'
import { tiposServicioApi } from '../../../consts/tiposServicio'
import { noNumbersRegex } from '../../../../../consts/regex'
import { parsearSoles } from '../../../../../utils/parsearSoles'
import { IGV, ceroSoles } from '../../../../../consts/consts'
import { formatearInputASoles } from '../../../../../utils/formatearInputASoles'

// Si esto tuviera TypeScript seria mucho mejor
// Este Hook siempre deve usarse dentro del Provider (ValeProvider) del ValeContext
export function useVales () {
  const initialState = initialValeState

  const { valeState, setValeState } = useContext(ValeContext)

  const { buscarCorporativo, resetCorporativosSearchList, corporativosSearchList } = useCorporativos()
  const { buscarPasajero, resetPasajerosSearchList, pasajerosSearchList } = usePasajeros()

  // Extra Props
  // Vehiculo
  const vehiculoId = valeState.vehiculo.id
  const isLlevarCarga = valeState.vehiculo.llevarCarga || ''

  const costoCarga = isLlevarCarga && formatearASoles({ numero: valeState.vehiculo.carga })
  const costoExtraCarga = isLlevarCarga && Boolean(parseInt(valeState.vehiculo.extraCarga)) && formatearASoles({ numero: valeState.vehiculo.extraCarga })

  // Tipo de servicio
  const isDestiny = valeState.tipoServicioActual === tiposServicioApi.destino
  const isRutaFija = valeState.tipoServicioActual === tiposServicioApi.rutasFijas

  // Carga
  const { isCarga, isExtraCarga } = valeState.solicitarCarga
  const costoAdicionalCarga = isCarga ? costoCarga : isExtraCarga ? costoExtraCarga : ceroSoles

  // costo
  const descuentoFormateado = valeState.usuarioCorporativo.descuento && (parseFloat(valeState.usuarioCorporativo.descuento.replace(noNumbersRegex, '')) / 100)

  // METHODS
  // Helpers
  function resetStateProp (prop) {
    setValeState(state => ({
      ...state,
      [prop]: initialState[prop]
    }))
  }

  function validate (data) {
    Object.entries(data).forEach(([key, value]) => {
      if (!value) throw new Error(`Los campos no pueden ser null, false o undefined para el campo ${key} en el payload`)
    })
  }

  // Usuario Corporativo
  function setUsuarioCorporativo (payload) {
    if (!payload) throw new Error('No existe data')

    const { id, nombreCompleto, area, areaId, descuento, firma } = payload

    const data = {
      id,
      nombreCompleto,
      area,
      areaId,
      descuento,
      firma
    }

    validate(data)

    setValeState(state => ({
      ...state,
      usuarioCorporativo: data
    }))
  }
  function resetUsuarioCorporativo () {
    resetStateProp('usuarioCorporativo')
  }

  // Vehiculo
  function setVehiculo (payload) {
    if (!payload) throw new Error('No existe data')

    const { id, disponible, llevarCarga, carga, extraCarga, personas, nombre } = payload

    const data = {
      id,
      disponible,
      llevarCarga,
      carga,
      extraCarga,
      personas,
      nombre
    }

    setValeState(state => ({
      ...state,
      vehiculo: data
    }))
  }

  // Tipo de servicio
  function setTipoServicioActual (servicio) {
    if (!servicio) throw new Error('El servicio no puede ser null, false, una cadena vacia o undefined')

    setValeState(state => ({
      ...state,
      tipoServicioActual: servicio
    }))
  }

  function resetTipoServicioActual () {
    resetStateProp('tipoServicioActual')
  }

  // Pasajeros
  function setPasajerosSelected (payload) {
    if (!payload) throw new Error('No existe data')

    setValeState(state => ({
      ...state,
      pasajerosSelected: payload
    }))
  }

  function resetPasajerosSelected () {
    resetStateProp('pasajerosSelected')
  }

  // Carga
  function setIsCarga (boolean) {
    setValeState(state => ({
      ...state,
      solicitarCarga: {
        isCarga: boolean,
        isExtraCarga: boolean ? false : state.solicitarCarga.isExtraCarga
      }
    }))
  }

  function setIsExtraCarga (boolean) {
    setValeState(state => ({
      ...state,
      solicitarCarga: {
        isCarga: boolean ? false : state.solicitarCarga.isCarga,
        isExtraCarga: boolean
      }
    }))
  }

  function resetSolicitarCarga ({ onlyCarga = false } = {}) {
    resetStateProp('solicitarCarga')

    if (onlyCarga) return

    const total = parsearSoles(valeState.costo.total) - parsearSoles(costoAdicionalCarga)
    setValeState(state => ({
      ...state,
      costo: {
        ...state.costo,
        total: formatearASoles({ numero: total }) || ceroSoles
      }
    }))
  }

  // Costo
  function setCostoReal (event) {
    if (!descuentoFormateado) throw new Error('No se ha seleccionado un usuario corporativo')

    const valorFormateado = formatearInputASoles({ event, controlled: true })

    if (!valorFormateado) {
      const total = parsearSoles(costoAdicionalCarga) + parsearSoles(valeState.costo.peaje)

      setValeState(state => ({
        ...state,
        costo: {
          ...initialState.costo,
          peaje: state.costo.peaje,
          total: formatearASoles({ numero: total }) || ceroSoles
        }
      }))

      return
    }

    const descuento = valorFormateado * descuentoFormateado
    const subTotal = parseFloat((valorFormateado * (1 - descuentoFormateado)).toFixed(2))
    const igv = parseFloat((subTotal * IGV).toFixed(2))
    const peaje = parsearSoles(valeState.costo.peaje) // peaje solo se usa para sumar el total
    const total = parsearSoles(costoAdicionalCarga) + parseFloat((subTotal + igv + peaje).toFixed(2))

    setValeState(state => ({
      ...state,
      costo: {
        costoReal: formatearASoles({ numero: valorFormateado }),
        descuento: formatearASoles({ numero: descuento }),
        subTotal: formatearASoles({ numero: subTotal }),
        igv: formatearASoles({ numero: igv }),
        peaje: state.costo.peaje,
        total: formatearASoles({ numero: total })
      }
    }))
  }

  function addCostoCarga ({ carga, extraCarga }) {
    let total

    if (!costoAdicionalCarga) {
      total = parsearSoles(valeState.costo.total) + parsearSoles(carga ? costoCarga : costoExtraCarga)
    } else {
      if (carga) {
        total = parsearSoles(valeState.costo.total) - parsearSoles(costoAdicionalCarga) + parsearSoles(costoCarga)
      } else {
        total = parsearSoles(valeState.costo.total) - parsearSoles(costoAdicionalCarga) + parsearSoles(costoExtraCarga)
      }
    }

    setValeState(state => ({
      ...state,
      costo: {
        ...state.costo,
        total: formatearASoles({ numero: total }) || ceroSoles
      }
    }))
  }

  function restCostoCarga ({ carga, extraCarga }) {
    let total

    if (costoAdicionalCarga) {
      total = parsearSoles(valeState.costo.total) - parsearSoles(carga ? costoCarga : costoExtraCarga)
    } else {
      if (carga) {
        total = parsearSoles(valeState.costo.total) + parsearSoles(costoAdicionalCarga) - parsearSoles(costoCarga)
      } else {
        total = parsearSoles(valeState.costo.total) + parsearSoles(costoAdicionalCarga) - parsearSoles(costoExtraCarga)
      }
    }

    setValeState(state => ({
      ...state,
      costo: {
        ...state.costo,
        total: formatearASoles({ numero: total }) || ceroSoles
      }
    }))
  }

  function setPeaje (event) {
    const valorFormateado = formatearInputASoles({ event, controlled: true })

    const subTotal = parsearSoles(valeState.costo.subTotal)
    const igv = parsearSoles(valeState.costo.igv)

    const total = parsearSoles(costoAdicionalCarga) + subTotal + igv + valorFormateado

    setValeState(state => ({
      ...state,
      costo: {
        ...state.costo,
        peaje: formatearASoles({ numero: valorFormateado }),
        total: formatearASoles({ numero: total }) || ceroSoles
      }
    }))
  }

  function resetCosto () {
    resetStateProp('costo')
  }

  function setCostoFijo ({ costoReal, costoTotal }) {
    let costoInicial
    let descuento
    let subTotal
    let igv
    let peaje
    let total

    if (costoReal) {
      const costo = costoReal

      costoInicial = costo

      descuento = costo * descuentoFormateado
      subTotal = parseFloat((costo * (1 - descuentoFormateado)).toFixed(2))

      igv = parseFloat((subTotal * IGV).toFixed(2))

      peaje = parseFloat((costoTotal - (subTotal + igv)).toFixed(2))

      total = parseFloat((subTotal + igv + peaje).toFixed(2))
    }

    if (!costoReal) {
      subTotal = parseFloat((costoTotal / 1 + IGV).toFixed(2))
      igv = parseFloat((subTotal * IGV).toFixed(2))

      costoInicial = parseFloat((subTotal / (1 - descuentoFormateado)).toFixed(2))

      descuento = parseFloat((costoInicial * descuentoFormateado).toFixed(2))

      const prePeaje = parseFloat((costoTotal - (subTotal + igv)).toFixed(2))
      peaje = prePeaje <= 0 ? 0 : prePeaje

      total = parseFloat((subTotal + igv + prePeaje).toFixed(2))
    }

    setValeState(state => ({
      ...state,
      costo: {
        costoReal: formatearASoles({ numero: costoInicial }),
        descuento: formatearASoles({ numero: descuento, cero: true }),
        subTotal: formatearASoles({ numero: subTotal, cero: true }),
        igv: formatearASoles({ numero: igv, cero: true }),
        peaje: formatearASoles({ numero: peaje, cero: true }),
        total: formatearASoles({ numero: total, cero: true })
      }
    }))
  }

  function resetValeState () {
    setValeState(initialState)
    resetCorporativosSearchList()
    resetPasajerosSearchList()
  }

  return {
    // STATE PROPS
    ...valeState,
    // Vehiculo
    vehiculoId,
    isLlevarCarga,
    costoCarga,
    costoExtraCarga,
    costoAdicionalCarga,

    // Tipo de servicio actual
    isDestiny,
    isRutaFija,

    // Busqueda de usuarios corporativos
    corporativosSearchList,

    // Busqueda de pasajeros
    pasajerosSearchList,

    // Carga
    isCarga,
    isExtraCarga,

    // METHODS
    setTipoServicioActual,
    resetTipoServicioActual,
    setUsuarioCorporativo,
    resetUsuarioCorporativo,
    setVehiculo,
    setCostoFijo,
    setCostoReal,
    setPeaje,
    addCostoCarga,
    restCostoCarga,
    resetCosto,
    setPasajerosSelected,
    resetPasajerosSelected,
    resetCorporativosSearchList,
    buscarCorporativo,

    setIsCarga,
    setIsExtraCarga,
    resetSolicitarCarga,

    resetPasajerosSearchList,
    buscarPasajero,
    resetValeState
  }
}
