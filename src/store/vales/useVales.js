import { create } from 'zustand'
import { getData } from '../../services/getData'
import { apiRequest } from '../../consts/api'
import { createData } from '../../services/createData'
import { USER_INFO_GENERAL } from '../../consts/consts'

export const useVales = create(set => {
  const { corporacion } = window.localStorage.getItem(USER_INFO_GENERAL)
    ? JSON.parse(atob(window.localStorage.getItem(USER_INFO_GENERAL)))
    : {}

  function getVales () {
    const url = `${apiRequest.vales}/${corporacion.id}`

    return getData({ url })
      .then(({ data: vales }) => {
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
    const url = `${apiRequest.valesSolicitudes}/${corporacion.id}`
    return getData({ url })
      .then(({ data: solicitudes }) => {
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
        .then((data) => {
          const { data: valeAceptado } = data

          const { requestVale: { id } } = valeAceptado

          set(state => {
            // esto es para cambiar el estado del vale de 'enviado' a -> 'aceptado'
            const index = state.solicitudes.findIndex(({ request: vale }) => vale.id === id)

            const newSolicitudes = [...state.solicitudes]

            const valeAModificar = newSolicitudes[index]

            valeAModificar.request.application_status = valeAceptado.requestVale.application_status

            return { solicitudes: newSolicitudes, vales: [valeAceptado, ...state.vales] }
          })

          console.log(data)
          resolve(valeAceptado)
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
