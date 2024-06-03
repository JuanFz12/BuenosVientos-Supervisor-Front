import { tiposServicioApi } from '../../../consts/tiposServicio'

// Usuario Corporativo (Se llenara los datos con el usuario corporativo seleccionado por el buscador)
const initialUsuarioCorporativo = {
  id: null,
  nombreCompleto: '',
  area: '',
  areaId: '',
  descuento: null,
  firma: ''
}

// Vehiculo
const initialVehiculo = {
  id: null,
  disponible: null,
  llevarCarga: null,
  carga: '',
  extraCarga: '',
  personas: null,
  nombre: ''
}

// Tipo de servicio
const initialTipoServicioActual = tiposServicioApi.destino

// Pasajeros
const initialPasajerosSelected = [] // los pasajeros seleccionados siempre tendran la estructura original de la response de la api

// Carga
const initialSolicitarCarga = {
  isCarga: false,
  isExtraCarga: false
}

// GESTION DEL COSTO
const initialCosto = {
  costoReal: '',
  descuento: 'S/ 00.00',
  subTotal: 'S/ 00.00',
  igv: 'S/ 00.00',
  total: 'S/ 00.00',
  peaje: ''
}

export const initialValeState = {
  usuarioCorporativo: initialUsuarioCorporativo,
  vehiculo: initialVehiculo,
  tipoServicioActual: initialTipoServicioActual,
  pasajerosSelected: initialPasajerosSelected,
  solicitarCarga: initialSolicitarCarga,
  costo: initialCosto
}
