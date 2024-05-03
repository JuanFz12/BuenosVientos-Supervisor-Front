import { create } from 'zustand'
import { getData } from '../../services/getData'
import { apiRequest, apiRequestParams } from '../../consts/api'
import { getUsuarioSupervisor } from '../../utils/getUsuarioSupervisor'
import { generateUrl } from '../../utils/generateUrl'

export const useTaxistas = create(set => {
  const { terminal } = getUsuarioSupervisor()

  if (!terminal) return

  const idTerminal = terminal.id

  function getTaxistas () {
    const paramIdTerminal = apiRequestParams.taxistas.idTerminal
    const url = generateUrl(apiRequest.taxistas, { [paramIdTerminal]: idTerminal })

    return getData({ url })
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
