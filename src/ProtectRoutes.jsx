import { Navigate, useLocation } from 'react-router-dom'
import { localStorageNames } from './consts/localStorageNames'
import { routes } from './routes'

export function ProtectRoutes ({ children }) {
  const token = localStorage.getItem(localStorageNames.TOKEN_NAME)

  // aqui tambien podria esperar por una validacion para verificar si el token
  // sigue siendo valido
  if (token) {
    return children
  }

  return <Navigate to={routes.login} />
}

export function RedirectIfLogged ({ children }) {
  const token = localStorage.getItem(localStorageNames.TOKEN_NAME)

  const pathsToRedirectToDashboard = [
    routes.login
  ]

  const { pathname } = useLocation()

  const redirect = pathsToRedirectToDashboard
    .some(path => path === pathname)

  if (token && redirect) {
    return <Navigate to={routes.dashboard} />
  } else if (!token && redirect) {
    return children
  } else if (!token && !redirect) {
    return <Navigate to={routes.login} />
  } else if (token && !redirect) {
    // esto no deberia ser necesario
    return children
  }
}
