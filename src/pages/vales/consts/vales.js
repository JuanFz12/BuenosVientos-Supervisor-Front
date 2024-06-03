export const fields = {
  supervisor: 'supervisor_id',

  funcionario: 'user_corporation_id',
  area: 'area_corporative_id',
  vehiculo: 'vehicle_id',
  pasajeros: 'passengers',

  fecha: 'date',
  servicio: 'service',

  // tipo de servicios
  destino: 'destiny',
  horas: 'hours',
  rutasFijas: 'destiny_fixed',

  observaciones: 'remarks',
  carga: 'request_to_load',
  extraCarga: 'request_to_extraload',

  horaSolicitada: 'request_time',
  horaSalida: 'departure_time',

  costoReal: 'cost_actual',
  descuento: 'discount',
  igv: 'igv',
  peaje: 'peaje',
  subTotal: 'sub_total',
  total: 'total_cost',

  firma: 'signature',
  taxista: 'taxista_id'
}

export const rutasFijasApi = {
  PLMS: 'PLMS',
  MSPL: 'MSPL',
  MLCM: 'MLCM',
  MLWX: 'MLWX',
  MLOS: 'MLOS'
}

export const labelRutasFijasFromApi = {
  [rutasFijasApi.PLMS]: 'Plaza Norte a Mall del Sur',
  [rutasFijasApi.MSPL]: 'Mall del Sur a Plaza Norte',
  [rutasFijasApi.MLCM]: 'Mall del Sur a Calle 7 La Molina',
  [rutasFijasApi.MLWX]: 'Mall del Sur a Willax',
  [rutasFijasApi.MLOS]: 'Mall del Sur a Orion Surco'
}

export const rutasFijasEspeciales = [
  {
    label: labelRutasFijasFromApi[rutasFijasApi.PLMS],
    value: rutasFijasApi.PLMS
  },
  {
    label: labelRutasFijasFromApi[rutasFijasApi.MSPL],
    value: rutasFijasApi.MSPL
  },
  {
    label: labelRutasFijasFromApi[rutasFijasApi.MLCM],
    value: rutasFijasApi.MLCM
  },
  {
    label: labelRutasFijasFromApi[rutasFijasApi.MLWX],
    value: rutasFijasApi.MLWX
  },
  {
    label: labelRutasFijasFromApi[rutasFijasApi.MLOS],
    value: rutasFijasApi.MLOS
  }
]

export const costoRutasFijas = {
  // las rutas fijas que tienen costoReal y costoTotal por lo general
  // van a ser rutas que tienen peaje
  [rutasFijasApi.PLMS]: {
    costoReal: 20,
    costoTotal: 26.6
  },
  [rutasFijasApi.MSPL]: {
    costoReal: 20,
    costoTotal: 26.6
  },
  [rutasFijasApi.MLCM]: {
    costoReal: null,
    costoTotal: 18
  },
  [rutasFijasApi.MLWX]: {
    costoReal: null,
    costoTotal: 10.62
  },
  [rutasFijasApi.MLOS]: {
    costoReal: null,
    costoTotal: 10
  }
}
