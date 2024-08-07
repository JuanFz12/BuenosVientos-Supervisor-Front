import { create } from 'zustand'
import { getData } from '../../services/getData'
import { apiRequest, apiRequestParams } from '../../consts/api'
import { createData } from '../../services/createData'

import { generateUrl } from '../../utils/generateUrl'
import { updateData } from '../../services/updateData'

export const useValesStore = create(set => {
  function getVales () {
    const url = apiRequest.vales

    return getData({ url })
      .then(dataRes => {
        const {
          payload: vales
        } = dataRes.data

        console.log(dataRes)
        set({ vales })
      })
      .catch(err => {
        alert(`Error en vales: ${err.error ?? err.message ?? 'Error desconocido'}`)
      })
      .finally(() => {
        set({ loading: false })
      })
  }

  function getSolicitudes () {
    const url = apiRequest.valesSolicitudes

    return getData({ url })
      .then(dataRes => {
        const {
          payload: solicitudes
        } = dataRes.data

        console.log(dataRes)

        set({ solicitudes })
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
      const paramIdVale = apiRequestParams.vales.idVale
      const url = generateUrl(apiRequest.aceptarVale, { [paramIdVale]: id })

      createData({ url, body })
        .then((data) => {
          console.log(data)
          const { data: valeAceptado } = data

          const { requestVale: { id } } = valeAceptado

          set(state => {
            // esto es para cambiar el estado del vale de 'enviado' a -> 'aceptado'
            // en la pagina de solicitudes

            const index = state.solicitudes.findIndex(({ requestVale: vale }) => vale.id === id)

            const newSolicitudes = [...state.solicitudes]

            const valeAModificar = newSolicitudes[index]

            valeAModificar.requestVale.application_status = valeAceptado.requestVale.application_status

            return { solicitudes: newSolicitudes, vales: [valeAceptado, ...state.vales] }
          })

          resolve(valeAceptado)
        })
        .catch(err => {
          alert(`Error: ${err.error ?? err.message ?? 'Error desconocido'}`)
          reject(err)
        })
    })
  }

  function crearVale ({ body }) {
    return new Promise((resolve, reject) => {
      const url = apiRequest.crearVale

      createData({ url, body })
        .then(dataRes => {
          const { data: nuevoVale } = dataRes

          console.log(dataRes)
          set(state => ({ vales: [nuevoVale, ...state.vales] }))
          resolve(nuevoVale)
        })
        .catch(err => {
          alert(`Error al crear un vale: ${err.error ?? err.reason ?? err.message ?? 'Error desconocido'}`)
          console.warn(err)
          reject(err)
        })
    })
  }

  function updateEstadoVale ({ idRequestVale, status }) {
    if (isNaN(+idRequestVale) || !status) {
      throw new Error('No existe idRequestVale o status')
    }

    const paramId = apiRequestParams.vales.idRequestVale
    const url = generateUrl(apiRequest.actualizarVale, { [paramId]: idRequestVale })

    return new Promise((resolve, reject) => {
      const body = {
        application_status: status
      }

      updateData({ url, body })
        .then(dataRes => {
          console.log(dataRes)

          const {
            data: valeActualizado
          } = dataRes

          set(state => {
            const index = state.vales.findIndex(({ requestVale: { id } }) => id === idRequestVale)

            const newVales = [...state.vales]

            const valeAModificar = newVales[index]
            valeAModificar.requestVale.application_status = valeActualizado.requestVale.application_status

            return { vales: newVales }
          })
          resolve(dataRes)
        })
        .catch(err => {
          alert(`Error al actualizar el estado del vale: ${err.error ?? err.message ?? 'Error desconocido'}`)
          reject(err)
          set(state => ({ vales: [...state.vales] })) // esto es para hacer un re-render del listado
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
    aceptarVale,
    crearVale,
    updateEstadoVale
  }
})
