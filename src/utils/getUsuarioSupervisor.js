import { localStorageNames } from '../consts/localStorageNames'

export function getUsuarioSupervisor () {
  const user =
    window.localStorage.getItem(localStorageNames.USER_INFO_GENERAL)
      ? JSON.parse(atob(window.localStorage.getItem(localStorageNames.USER_INFO_GENERAL)))
      : {}

  const usuarioSupervisor = {
    usuarioSupervisor: user.usuarioSupervisor,
    usuario: user.usuario,
    denominacion: user.denominacion,
    zona: user.zona,
    area: user.area,
    terminal: user.terminal,
    token: user.token,
    idSesion: user.idSesion
  }

  return usuarioSupervisor
}
