import { useContext } from 'react'
import { useCorporativos } from '../../../../../store/usuariosCorporativos/useCorporativos'
import { ValeContext } from '../context/ValeContext'
import { initialValeState } from '../context/storeValeContext'
import { formatearASoles } from '../../../../../utils/formatearASoles'
import { usePasajeros } from '../../../../../store/pasajeros/usePasajeros'
import { tiposServicioApi } from '../../../consts/tiposServicio'
import { parsearSoles } from '../../../../../utils/parsearSoles'
import { IGV, ceroSoles } from '../../../../../consts/consts'
import { formatearInputASoles } from '../../../../../utils/formatearInputASoles'
import { getNumbers } from '../../../../../helpers/getNumbers'

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

  // Destino Info, cuando el tipo sea destino se usara esta información
  // Coords and Names
  function setCoords ({ coords, prop }) {
    setValeState(state => ({
      ...state,
      coords: {
        ...state.coords,
        [prop]: coords
      }
    }))
  }

  function setPlaceName ({ placeName, prop }) {
    setValeState(state => ({
      ...state,
      [`${prop}PlaceName`]: placeName
    }))
  }

  function setStartCoordsAndName ({ lat, lng, placeName }) {
    setCoords({ coords: { lat, lng }, prop: 'start' })
    setPlaceName({ placeName, prop: 'start' })
  }

  function setEndCoordsAndName ({ lat, lng, placeName }) {
    setCoords({ coords: { lat, lng }, prop: 'end' })
    setPlaceName({ placeName, prop: 'end' })
  }

  function resetCoordsAndName (prop) {
    setCoords({ coords: initialState.coords[prop], prop })
    setPlaceName({ placeName: '', prop })
  }

  // Carga
  const { isCarga, isExtraCarga } = valeState.solicitarCarga
  const costoAdicionalCarga = isCarga ? costoCarga : isExtraCarga ? costoExtraCarga : ceroSoles

  // Costo
  const descuentoParsed = getNumbers({ string: valeState.usuarioCorporativo.descuento }) / 100

  const costoComputed = (() => {
    const costoReal = valeState.costo.costoReal
    const costoRealParsed = getNumbers({ string: costoReal })

    const peaje = valeState.costo.peaje
    const peajeParsed = getNumbers({ string: peaje })

    const descuento = costoRealParsed * descuentoParsed

    const subTotal = getNumbers({ string: (costoRealParsed * (1 - descuentoParsed)), fixed: 2 })

    const igv = getNumbers({ string: subTotal * IGV, fixed: 2 })

    const total = parsearSoles(costoAdicionalCarga) + subTotal + igv + peajeParsed

    const result = {
      costoReal,
      descuento: formatearASoles({ numero: descuento, cero: true }),
      subTotal: formatearASoles({ numero: subTotal, cero: true }),
      igv: formatearASoles({ numero: igv, cero: true }),
      peaje,
      total: formatearASoles({ numero: getNumbers({ string: total, fixed: 2 }), cero: true })
    }

    return result
  })()

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
      if (typeof value !== 'string' && !value) throw new Error(`Los campos no pueden ser null, false o undefined para el campo ${key} en el payload`)
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
    if (!descuentoParsed) throw new Error('No se ha seleccionado un usuario corporativo')

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

    const descuento = valorFormateado * descuentoParsed
    const subTotal = parseFloat((valorFormateado * (1 - descuentoParsed)).toFixed(2))
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
    // if (!carga && !extraCarga) throw new Error('No se ha seleccionado una carga o extra-carga')
    if (carga && extraCarga) throw new Error('No se puede agregar una carga y una extra-carga al mismo tiempo')

    if (carga) {
      setIsCarga(true)
    } else if (extraCarga) {
      setIsExtraCarga(true)
    }

    let total

    if (!costoAdicionalCarga) {
      total = parsearSoles(valeState.costo.total) + parsearSoles(carga ? costoCarga : costoExtraCarga)
    } else {
      if (carga) {
        total = parsearSoles(valeState.costo.total) - parsearSoles(costoAdicionalCarga) + parsearSoles(costoCarga)
      } else if (extraCarga) {
        total = parsearSoles(valeState.costo.total) - parsearSoles(costoAdicionalCarga) + parsearSoles(costoExtraCarga)
      }
    }

    // console.log({ totalActual: parsearSoles(valeState.costo.total), costoAdicionalCarga, costoCarga, costoExtraCarga })

    setValeState(state => ({
      ...state,
      costo: {
        ...state.costo,
        total: formatearASoles({ numero: total }) || ceroSoles
      }
    }))
  }

  function restCostoCarga ({ carga, extraCarga }) {
    // if (!carga && !extraCarga) throw new Error('No se ha seleccionado una carga o extra-carga')
    if (carga && extraCarga) throw new Error('No se puede restar una carga y una extra-carga al mismo tiempo')

    if (carga) {
      setIsCarga(false)
    } else if (extraCarga) {
      setIsExtraCarga(false)
    }

    let total

    if (costoAdicionalCarga) {
      total = parsearSoles(valeState.costo.total) - parsearSoles(carga ? costoCarga : costoExtraCarga)
    } else {
      if (carga) {
        total = parsearSoles(valeState.costo.total) + parsearSoles(costoAdicionalCarga) - parsearSoles(costoCarga)
      } else if (extraCarga) {
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
    if (!costoReal && !costoTotal) throw new Error('Debe pasar al menos costoReal o costoTotal')

    let costoInicial
    let descuento
    let subTotal
    let igv
    let peaje
    let total

    if (costoReal) {
      const costo = costoReal

      costoInicial = costo

      descuento = costo * descuentoParsed
      subTotal = parseFloat((costo * (1 - descuentoParsed)).toFixed(2))

      igv = parseFloat((subTotal * IGV).toFixed(2))

      peaje = parseFloat((costoTotal - (subTotal + igv)).toFixed(2))

      total = parseFloat((subTotal + igv + peaje).toFixed(2))
    }

    if (!costoReal) {
      subTotal = parseFloat((costoTotal / (1 + IGV)).toFixed(2))

      igv = parseFloat((subTotal * IGV).toFixed(2))

      costoInicial = parseFloat((subTotal / (1 - descuentoParsed)).toFixed(2))

      descuento = parseFloat((costoInicial * descuentoParsed).toFixed(2))

      // las rutas fijas que tienen costoReal y costoTotal por lo general
      // van a ser rutas que tienen peaje
      // Como esta no tiene costo real entonces el peaje es 0
      peaje = 0

      // total = parseFloat((subTotal + igv).toFixed(2)) // A veces sale un resultado exacto q no es igual al costoTotal, es minima la diferencia pero ahi esta
      total = costoTotal
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

    // Costo
    costoComputed,

    // METHODS
    setTipoServicioActual,
    resetTipoServicioActual,
    setStartCoordsAndName,
    setEndCoordsAndName,
    resetCoordsAndName,
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
