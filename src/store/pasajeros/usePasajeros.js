import { create } from 'zustand'
import { getData } from '../../services/getData'
import { apiRequest, apiRequestSearchParams } from '../../consts/api'
import { generateUrlSearchParams } from '../../utils/generateUrlSearchParams'

export const usePasajeros = create(set => {
  // function getPasajeros () {
  //   const url = apiRequest.pasajeros

  //   return getData({ url })
  //     .then(dataRes => {
  //       const {
  //         payload: pasajeros
  //       } = dataRes.data

  //       console.log(dataRes)
  //       set({ pasajeros })
  //     })
  //     .catch(err => {
  //       alert(`Error: ${err.error ?? err.message ?? 'Error desconocido'}`)
  //     })
  //     .finally(() => set({ loading: false }))
  // }

  function buscarPasajero (queryParam) {
    if (queryParam === undefined || queryParam === null) throw new Error('Query es requerida para realizar la búsqueda')

    const query = queryParam.toString().trim()
    if (!query) return resetPasajerosSearch()

    set({ loadingSearch: true })

    const urlReq = apiRequest.buscarPasajero
    const searchParam = apiRequestSearchParams.pasajeros.buscar

    const url = generateUrlSearchParams(urlReq, { [searchParam]: query })

    console.log({ url })

    return new Promise((resolve, reject) => getData({ url })
      .then(dataRes => {
        const {
          data: pasajerosSearch
        } = dataRes

        set({ pasajerosSearch })

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

  function resetPasajerosSearch () {
    set({ pasajerosSearch: [] })
  }

  return {
    pasajeros: [],
    pasajerosSearch: [],
    loading: true,
    loadingSearch: false,
    buscarPasajero,
    resetPasajerosSearch
  }
})
