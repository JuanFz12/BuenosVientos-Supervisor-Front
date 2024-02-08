import { create } from 'zustand'
import { getData } from '../../services/getData'
import { apiRequest } from '../../consts/api'
import { createData } from '../../services/createData'

export const useVales = create(set => {
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
        .then(data => {
          console.log(data)
          resolve(data)
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
    getSolicitudes,
    aceptarVale
  }
})
