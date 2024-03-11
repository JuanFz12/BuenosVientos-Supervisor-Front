import { useEffect } from 'react'
import { routes } from '../routes'
import { localStorageNames } from '../consts/localStorageNames'

export function Logout () {
  useEffect(() => {
    localStorage.removeItem(localStorageNames.TOKEN_NAME)
    localStorage.removeItem(localStorageNames.USER_INFO_GENERAL)
  }, [])

  return window.location.replace(routes.home)
}
