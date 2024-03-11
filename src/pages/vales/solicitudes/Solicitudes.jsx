import { useEffect } from 'react'
import { useVales } from '../../../store/vales/useVales'
import { ListVales } from '../components/ListVales'
import { useTaxistas } from '../../../store/taxistas/useTaxistas'
import { useLayout } from '../../../store/useLayout'
import { routes } from '../../../routes'

export function SolicitudesVales () {
  const { solicitudes, getSolicitudes, loadingSolicitudes } = useVales()
  const { taxistas, getTaxistas } = useTaxistas()

  const { setBackTo } = useLayout()

  useEffect(() => {
    getSolicitudes()
    getTaxistas()

    setBackTo(routes.vales)

    return () => setBackTo(undefined)
  }, [getSolicitudes, getTaxistas, setBackTo])

  return <ListVales taxistas={taxistas} solicitudes data={solicitudes} loading={loadingSolicitudes} />
}
