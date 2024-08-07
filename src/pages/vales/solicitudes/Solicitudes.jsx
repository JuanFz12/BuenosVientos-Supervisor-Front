import { useEffect } from 'react'
import { useValesStore } from '../../../store/vales/useValesStore'
import { ListVales } from '../components/ListVales'
import { useLayout } from '../../../store/useLayout'
import { routes } from '../../../routes'

export function SolicitudesVales() {
  const { solicitudes, getSolicitudes, loadingSolicitudes } = useValesStore()

  const { setBackTo } = useLayout()

  useEffect(() => {
    getSolicitudes()

    setBackTo(routes.vales)

    return () => setBackTo(undefined)
  }, [getSolicitudes, setBackTo])

  return (
    <ListVales solicitudes data={solicitudes} loading={loadingSolicitudes} />
  )
}
