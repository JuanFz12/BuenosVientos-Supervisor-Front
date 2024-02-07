import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useVales } from '../../../store/vales/useVales'

export function RenderVales () {
  const { vales, loading } = useVales()

  const { setData } = useOutletContext()

  // useEffect(() => {
  //   getVales()
  // }, [getVales])

  useEffect(() => {
    setData(({ loading, render: vales }))
  }, [setData, loading, vales])

  return <></>
}
