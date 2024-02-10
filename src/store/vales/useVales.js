import { create } from 'zustand'
import { getData } from '../../services/getData'
import { apiRequest } from '../../consts/api'
import { createData } from '../../services/createData'
import { USER_INFO_GENERAL } from '../../consts/consts'

export const useVales = create(set => {
  const {
    usuarioSupervisor: {
      corporation_id: corporacionId
    }
  } = window.localStorage.getItem(USER_INFO_GENERAL)
    ? JSON.parse(atob(window.localStorage.getItem(USER_INFO_GENERAL)))
    : {
        usuarioSupervisor: {
          corporation_id: null
        }
      }

  function getVales () {
    return getData({ url: `${apiRequest.vales}/${corporacionId}` })
      .then(({ vales }) => {
        // const newState = vales.map(({ vale }) => vale)
        set({ vales })
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
    return getData({ url: `${apiRequest.valesSolicitudes}/${corporacionId}` })
      .then(({ vale: solicitudes }) => {
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
