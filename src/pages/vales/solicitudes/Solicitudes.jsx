import { useOutletContext } from 'react-router-dom'
import { routes } from '../../../routes'
import { useEffect } from 'react'
import { useVales } from '../../../store/vales/useVales'

export function SolicitudesVales () {
  const { solicitudes, getSolicitudes, loadingSolicitudes } = useVales()

  const { setBackTo, setData } = useOutletContext()

  useEffect(() => {
    setBackTo(routes.vales)
    getSolicitudes()

    return () => setBackTo(null)
  }, [setBackTo, getSolicitudes])

  useEffect(() => {
    setData(({ loading: loadingSolicitudes, render: solicitudes }))
  }, [setData, loadingSolicitudes, solicitudes])

  return <></>
}
