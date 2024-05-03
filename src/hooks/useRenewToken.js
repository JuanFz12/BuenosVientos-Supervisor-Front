import { useEffect } from 'react'
import { useUsuarioSupervisor } from '../store/useUsuarioSupervisor'
import { localStorageNames } from '../consts/localStorageNames'
import { getUsuarioSupervisor } from '../utils/getUsuarioSupervisor'
import { createData } from '../services/createData'
import { apiRequest } from '../consts/api'
import { setUsuarioSupervisorToLS } from '../utils/setUsuarioSupervisorToLS'

export function useRenewToken () {
  const { updateUsuarioSupervisor } = useUsuarioSupervisor()

  useEffect(() => {
    renovarToken(() => updateUsuarioSupervisor())

    // Renovar token por cada 20 minutos
    setInterval(() => {
      renovarToken(() => updateUsuarioSupervisor())
    }, 1200000)
  }, [updateUsuarioSupervisor])
}

function renovarToken (callback) {
  const tokenName = localStorageNames.TOKEN_NAME

  const oldToken = localStorage.getItem(tokenName)

  const usuarioSupervisor = getUsuarioSupervisor()

  const body = { id_sesion: parseInt(usuarioSupervisor.idSesion) }

  oldToken && usuarioSupervisor.idSesion && createData({ url: apiRequest.renovarToken, body })
    .then(dataRes => {
      const {
        token: newToken,
        id_sesion: newIdSesion
      } = dataRes.data

      if (newToken && newIdSesion) {
        localStorage.setItem(tokenName, newToken)

        const nuevaInfoSupervisor = { ...usuarioSupervisor, token: newToken, idSesion: newIdSesion }
        setUsuarioSupervisorToLS(nuevaInfoSupervisor)
      } else {
        throw new Error('No se pudo renovar el token ni la sesión')
      }

      callback && callback(null, dataRes)
      console.log(dataRes)
    })
    .catch(err => {
      console.error(err)
      callback && callback(err)
      // window.location.assign(routes.logout)
    })
}
