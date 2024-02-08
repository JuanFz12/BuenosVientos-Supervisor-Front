import { create } from 'zustand'
import { USER_INFO_GENERAL } from '../consts/consts'

export const useUsuarioSupervisor = create(set => {
  const user =
    window.localStorage.getItem(USER_INFO_GENERAL)
      ? JSON.parse(atob(window.localStorage.getItem(USER_INFO_GENERAL)))
      : null

  return {
    usuarioSupervisor: user?.usuarioSupervisor,
    usuario: user?.usuario
  }
})
