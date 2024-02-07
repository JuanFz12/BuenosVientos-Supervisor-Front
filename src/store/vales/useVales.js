import { create } from 'zustand'
import { getData } from '../../services/getData'
import { apiRequest } from '../../consts/api'

export const useVales = create(set => {
  function getSolicitudes () {
    getData({ url: apiRequest.valesSolicitudes })
      .then(solicitudes => {
        set({ solicitudes })
        console.log(solicitudes)
      })
      .catch(err => {
        alert(`Error: ${err.error ?? err.message ?? 'Error desconocido'}`)
      })
      .finally(() => {
        set({ loadingSolicitudes: false })
      })
  }

  return {
    getSolicitudes,
    loading: true,
    loadingSolicitudes: true,
    vales: [],
    solicitudes: []
  }
})
