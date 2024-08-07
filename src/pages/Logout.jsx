import { useEffect } from 'react'
import { routes } from '../routes'
import { localStorageNames } from '../consts/localStorageNames'
import { useUsuarioSupervisor } from '../store/useUsuarioSupervisor'
import { createData } from '../services/createData'
import { apiRequest } from '../consts/api'

export function Logout() {
  const { idSesion } = useUsuarioSupervisor()

  useEffect(() => {
    const rememberPassword = localStorage.getItem(
      localStorageNames.REMEMBER_PASSWORD
    )

    localStorage.clear()

    if (rememberPassword) {
      localStorage.setItem(
        localStorageNames.REMEMBER_PASSWORD,
        rememberPassword
      )
    }

    const url = apiRequest.logout

    const body = {
      id: idSesion
    }

    if (idSesion || idSesion === 0) {
      createData({ url, body })
        .catch(() => {
          alert(
            'Parece que esta sesión no existe.\nNo fue posible cerrar la sesión.'
          )
        })
        .finally(() => window.location.replace(routes.home))
    } else {
      window.location.replace(routes.home)
    }
  }, [idSesion])
}
