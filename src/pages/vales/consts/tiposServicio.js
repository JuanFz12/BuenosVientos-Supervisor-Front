export const tiposServicioApi = {
  destino: 'Destiny',
  rutasFijas: 'Fixed'
}

export const tipoServicio = {
  [tiposServicioApi.destino]: 'Tipo destino',
  [tiposServicioApi.rutasFijas]: 'Ruta Fija'
}

export const serviciosLabel = {
  [tiposServicioApi.destino]: {
    start: 'Origen',
    end: 'Destino'
  },
  [tiposServicioApi.rutasFijas]: 'Ruta Fija'
}
