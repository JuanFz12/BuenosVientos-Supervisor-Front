import { localStorageNames } from '../consts/localStorageNames'

export function setUsuarioSupervisorToLS (data) {
  if (!data) throw new Error('Objeto vacio')

  const nuevoUsuarioSupervisor = btoa(JSON.stringify(data))

  localStorage.setItem(localStorageNames.USER_INFO_GENERAL, nuevoUsuarioSupervisor)
}
