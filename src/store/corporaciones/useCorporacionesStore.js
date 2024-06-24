import { create } from 'zustand'
import { apiRequest } from '../../consts/api'
import { getData } from '../../services/getData'

export const useCorporacionesStore = create(set => {
  function getCorporaciones () {
    const url = apiRequest.corporaciones

    return getData({ url })
      .then(dataRes => {
        const {
          payload: corporaciones
        } = dataRes.data

        console.log(dataRes)
        set({ corporaciones })
      })
      .catch(err => {
        alert(`Error al obtener las corporaciones: ${err.error ?? err.message ?? 'Error desconocido'}`)
      })
      .finally(() => set({ isLoading: false }))
  }

  return {
    corporaciones: [],
    isLoading: true,
    getCorporaciones
  }
})
