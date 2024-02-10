import { create } from 'zustand'
import { getData } from '../../services/getData'
import { apiRequest } from '../../consts/api'
import { USER_INFO_GENERAL } from '../../consts/consts'

// se obtiene el id de la denominacion del supervisor

export const useTaxistas = create(set => {
  const {
    usuarioSupervisor: {
      denomination_id: denominacionId
    }
  } = window.localStorage.getItem(USER_INFO_GENERAL)
    ? JSON.parse(atob(window.localStorage.getItem(USER_INFO_GENERAL)))
    : {
        usuarioSupervisor: {
          denomination_id: null
        }
      }

  function getTaxistas () {
    return getData({ url: `${apiRequest.taxistas}/${denominacionId}` })
      .then(({ drivers: taxistas }) => {
        console.log(taxistas)
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
