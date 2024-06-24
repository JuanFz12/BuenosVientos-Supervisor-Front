import { localStorageNames } from '../consts/localStorageNames'
import { routes } from '../routes'

export function getUsuarioSupervisor () {
  try {
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
  } catch (error) {
    // Si no se puede parsear el usuario se cierra la sesión
    window.localStorage.clear()
    window.location.replace(routes.logout)
  }
}
