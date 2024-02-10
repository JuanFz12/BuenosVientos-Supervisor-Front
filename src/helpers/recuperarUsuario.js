import { USER_INFO_GENERAL } from '../consts/consts'

// function recuperarLocalStorage ({ nombre, key }) {
//   return window.localStorage.getItem(nombre)
//     ? window.localStorage.getItem(nombre)[key]
//     : null
// }

export function recuperarUsuario ({ key }) {
  if (localStorage.getItem(USER_INFO_GENERAL)) {
    const usuarioParseado = JSON.parse(atob(window.localStorage.getItem(USER_INFO_GENERAL)))

    const usuario = {
      ...usuarioParseado.usuario,
      ...usuarioParseado.usuarioSupervisor
    }
    return usuario[key]
  }

  return null
}
