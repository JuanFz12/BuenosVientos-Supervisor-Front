import { tipoServicio, tiposServicioApi } from '../../../../consts/tiposServicio'

export const TIPOS_SERVICIO_LIST = [
  {
    label: tipoServicio[tiposServicioApi.destino],
    value: tiposServicioApi.destino
  },
  {
    label: tipoServicio[tiposServicioApi.horas],
    value: tiposServicioApi.horas
  },
  {
    label: tipoServicio[tiposServicioApi.rutasFijas],
    value: tiposServicioApi.rutasFijas
  }
]
