import { create } from 'zustand'
import { getData } from '../../services/getData'
import { apiRequest } from '../../consts/api'
import { createData } from '../../services/createData'

export const useVales = create(set => {
  function getVales () {
    return getData({ url: apiRequest.vales })
      .then(vales => {
        console.log(vales)
      })
      .catch(err => {
        alert(`Error: ${err.error ?? err.message ?? 'Error desconocido'}`)
      })
      .finally(() => {
        set({ loading: false })
      })
  }

  function getSolicitudes () {
    return getData({ url: apiRequest.valesSolicitudes })
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

  function aceptarVale ({ id, body }) {
    return new Promise((resolve, reject) => {
      createData({ url: `${apiRequest.aceptarVale}/${id}`, body })
        .then(({ vale }) => {
          set(state => {
            const { id } = vale
            const index = state.solicitudes.findIndex(v => v.id === id)

            const newSolicitudes = [...state.solicitudes]

            newSolicitudes[index] = vale

            return { solicitudes: newSolicitudes }
          })
          resolve(vale)
        })
        .catch(err => {
          alert(`Error: ${err.error ?? err.message ?? 'Error desconocido'}`)
          reject(err)
        })
    })
  }

  return {
    loading: true,
    loadingSolicitudes: true,
    vales: [],
    solicitudes: [],
    getVales,
    getSolicitudes,
    aceptarVale
  }
})
