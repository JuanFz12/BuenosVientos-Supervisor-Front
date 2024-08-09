import { create } from 'zustand'
import { apiRequest } from '../../consts/api'
import { getData } from '../../services/getData'
import { getUsuarioSupervisor } from '../../utils/getUsuarioSupervisor'

export const usePagosStore = create(set => {
  const { terminal } = getUsuarioSupervisor()

  function getPagos() {
    const idTerminal = terminal.id
    const url = `${apiRequest.pagos}/${idTerminal}`
    return getData({ url })
      .then(dataRes => {
        const { driverDatePayments: pagos } = dataRes.data
        set({ pagos })
      })
      .catch(err => {
        alert(
          `Error en pagos: ${err.error ?? err.message ?? 'Error desconocido'}`
        )
      })
      .finally(() => {
        set({ loadingPagos: false })
      })
  }

  function getPagosPorFecha({ date }) {
    const idTerminal = terminal.id
    const url = `${apiRequest.pagos}/for-date/${idTerminal}?date=${date}`
    return getData({ url })
      .then(dataRes => {
        const { convertDriver: cuotas } = dataRes.data

        set({ cuotas })
      })
      .catch(err => {
        alert(
          `Error en cuotas: ${err.error ?? err.message ?? 'Error desconocido'}`
        )
      })
      .finally(() => {
        set({ loadingCuotas: false })
      })
  }

  return {
    loadingPagos: true,
    loadingCuotas: true,
    pagos: [],
    cuotas: [],
    getPagos,
    getPagosPorFecha
  }
})
