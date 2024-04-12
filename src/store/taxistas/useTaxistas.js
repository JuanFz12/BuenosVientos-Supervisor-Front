import { create } from 'zustand'
import { getData } from '../../services/getData'
import { apiRequest } from '../../consts/api'
import { USER_INFO_GENERAL } from '../../consts/consts'

export const useTaxistas = create(set => {
  const { corporacion } = window.localStorage.getItem(USER_INFO_GENERAL)
    ? JSON.parse(atob(window.localStorage.getItem(USER_INFO_GENERAL)))
    : {
        usuarioSupervisor: {
          denomination_id: null
        }
      }

  function getTaxistas () {
    return getData({ url: `${apiRequest.taxistas}/${corporacion.id}` })
      .then(dataRes => {
        const {
          payload: taxistas
        } = dataRes.data

        console.log(dataRes)
        set({ taxistas })
      })
      .catch(err => {
        alert(`Error: ${err.error ?? err.message ?? 'Error desconocido'}`)
      })
      .finally(() => set({ loading: false }))
  }

  return {
    taxistas: [],
    loading: true,
    getTaxistas
  }
})
