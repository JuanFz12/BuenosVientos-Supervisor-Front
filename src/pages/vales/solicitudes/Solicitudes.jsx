import { useEffect } from 'react'
import { useVales } from '../../../store/vales/useVales'
import { ListVales } from '../components/ListVales'
import { useLayout } from '../../../store/useLayout'
import { routes } from '../../../routes'

export function SolicitudesVales () {
  const { solicitudes, getSolicitudes, loadingSolicitudes } = useVales()

  const { setBackTo } = useLayout()

  useEffect(() => {
    getSolicitudes()

    setBackTo(routes.vales)

    return () => setBackTo(undefined)
  }, [getSolicitudes, setBackTo])

  return (
    <ListVales
      solicitudes
      data={solicitudes}
      loading={loadingSolicitudes}
    />
  )
}
