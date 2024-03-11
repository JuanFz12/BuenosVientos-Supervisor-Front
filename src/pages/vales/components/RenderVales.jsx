import { useEffect } from 'react'
import { useVales } from '../../../store/vales/useVales'
import { ListVales } from './ListVales'

export function RenderVales () {
  const { vales, getVales, loading } = useVales()

  useEffect(() => {
    getVales()
  }, [getVales])

  return <ListVales data={vales} loading={loading} />
}
