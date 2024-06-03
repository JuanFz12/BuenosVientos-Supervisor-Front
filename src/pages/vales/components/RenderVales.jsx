import { useEffect } from 'react'
import { useValesStore } from '../../../store/vales/useValesStore'
import { ListVales } from './ListVales'

export function RenderVales () {
  const { vales, getVales, loading } = useValesStore()

  useEffect(() => {
    getVales()
  }, [getVales])

  return <ListVales data={vales} loading={loading} />
}
