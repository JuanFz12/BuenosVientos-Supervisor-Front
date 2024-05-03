import { create } from 'zustand'
import { getData } from '../../services/getData'
import { apiRequest } from '../../consts/api'

export const useVehiculos = create(set => {
  function getVehiculos () {
    const url = apiRequest.vehiculos

    return getData({ url })
      .then(dataRes => {
        const {
          payload: vehiculos
        } = dataRes.data

        console.log(dataRes)
        set({ vehiculos })
      })
      .catch(err => {
        alert(`Error: ${err.error ?? err.message ?? 'Error desconocido'}`)
      })
      .finally(() => set({ loading: false }))
  }

  return {
    vehiculos: [],
    loading: true,
    getVehiculos
  }
})
