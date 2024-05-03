import { create } from 'zustand'
import { getUsuarioSupervisor } from '../utils/getUsuarioSupervisor'

export const useUsuarioSupervisor = create(set => {
  const usuarioSupervisor = getUsuarioSupervisor()

  function updateUsuarioSupervisor () {
    const nuevaData = getUsuarioSupervisor()

    set({ ...nuevaData })
  }

  return {
    ...usuarioSupervisor,
    updateUsuarioSupervisor
  }
})
