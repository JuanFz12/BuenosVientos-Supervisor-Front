import { create } from 'zustand'
import { USER_INFO_GENERAL } from '../consts/consts'

export const useUsuarioSupervisor = create(set => {
  const user =
    window.localStorage.getItem(USER_INFO_GENERAL)
      ? JSON.parse(atob(window.localStorage.getItem(USER_INFO_GENERAL)))
      : {}

  const usuarioSupervisor = {
    usuarioSupervisor: user.usuarioSupervisor,
    usuario: user.usuario,
    denominacion: user.denominacion,
    zona: user.zona,
    area: user.area,
    corporacion: user.corporacion
  }

  return {
    ...usuarioSupervisor
  }
})
