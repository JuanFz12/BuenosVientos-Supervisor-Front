import { create } from 'zustand'
import { getData } from '../../services/getData'
import { apiRequest, apiRequestSearchParams } from '../../consts/api'
import { generateUrlSearchParams } from '../../utils/generateUrlSearchParams'
import { createData } from '../../services/createData'

export const usePasajeros = create(set => {
  function getPasajeros () {
    const url = apiRequest.pasajeros

    return getData({ url })
      .then(dataRes => {
        const {
          payload: pasajeros
        } = dataRes.data

        console.log(dataRes)
        set({ pasajeros })
      })
      .catch(err => {
        alert(`Error al obtener los pasajeros: ${err.error ?? err.message ?? 'Error desconocido'}`)
      })
      .finally(() => set({ isLoading: false }))
  }

  function crearPasajero ({ body }) {
    if (!body) throw new Error('Body es requerido para crear un nuevo pasajero')

    const url = apiRequest.crearPasajero

    return new Promise((resolve, reject) => createData({ url, body })
      .then(dataRes => {
        const {
          data: nuevoPasajero
        } = dataRes

        console.log(dataRes)
        set(state => ({ pasajeros: [nuevoPasajero, ...state.pasajeros] }))
        resolve(nuevoPasajero)
      })
      .catch(err => {
        alert(`Error al crear el pasajero: ${err.error ?? err.message ?? 'Error desconocido'}`)
        console.warn(err)
        reject(err)
      })
    )
  }

  function buscarPasajero (queryParam) {
    if (queryParam === undefined || queryParam === null) throw new Error('Query es requerida para realizar la búsqueda')

    const query = queryParam.toString().trim()
    if (!query) return resetPasajerosSearchList()

    set({ loadingSearch: true })

    const urlReq = apiRequest.buscarPasajero
    const searchParam = apiRequestSearchParams.pasajeros.buscar

    const url = generateUrlSearchParams(urlReq, { [searchParam]: query })

    console.log({ url })

    return new Promise((resolve, reject) => getData({ url })
      .then(dataRes => {
        const {
          data: pasajerosSearchList
        } = dataRes

        set({ pasajerosSearchList })

        console.log(dataRes)
        resolve(dataRes)
      })
      .catch(err => {
        console.warn(err)
        reject(err)
      })
      .finally(() => set({ loadingSearch: false }))
    )
  }

  function resetPasajerosSearchList () {
    set({ pasajerosSearchList: [] })
  }

  return {
    pasajeros: [],
    pasajerosSearchList: [],
    isLoading: true,
    loadingSearch: false,
    getPasajeros,
    crearPasajero,
    buscarPasajero,
    resetPasajerosSearchList
  }
})
