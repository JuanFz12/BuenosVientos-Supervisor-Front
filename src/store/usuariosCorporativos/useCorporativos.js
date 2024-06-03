import { create } from 'zustand'
import { getData } from '../../services/getData'
import { apiRequest, apiRequestSearchParams } from '../../consts/api'
import { generateUrlSearchParams } from '../../utils/generateUrlSearchParams'

export const useCorporativos = create(set => {
  // function getCorporativos () {
  //   const url = apiRequest.corporativos

  //   return getData({ url })
  //     .then(dataRes => {
  //       const {
  //         payload: corporativos
  //       } = dataRes.data

  //       console.log(dataRes)
  //       set({ corporativos })
  //     })
  //     .catch(err => {
  //       alert(`Error: ${err.error ?? err.message ?? 'Error desconocido'}`)
  //     })
  //     .finally(() => set({ loading: false }))
  // }

  function buscarCorporativo (queryParam) {
    if (queryParam === undefined || queryParam === null) throw new Error('Query es requerida para realizar la búsqueda')

    const query = queryParam.toString().trim()
    if (!query) return resetCorporativosSearchList()

    set({ loadingSearch: true })

    const urlReq = apiRequest.buscarCorporativo
    const searchParam = apiRequestSearchParams.corporativos.buscar

    const url = generateUrlSearchParams(urlReq, { [searchParam]: query })

    console.log({ url })

    return new Promise((resolve, reject) => getData({ url })
      .then(dataRes => {
        const {
          data: corporativosSearchList
        } = dataRes

        set({ corporativosSearchList })

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

  function resetCorporativosSearchList () {
    set({ corporativosSearchList: [] })
  }

  return {
    corporativos: [],
    corporativosSearchList: [],
    loading: true,
    loadingSearch: false,
    buscarCorporativo,
    resetCorporativosSearchList
  }
})
