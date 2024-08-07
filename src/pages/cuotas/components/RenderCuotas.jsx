import './RenderCuotas.css'

import { TablaBase } from '../../../components/tablas/TablaBase'
import { usePagosStore } from '../../../store/pagos/usePagosStore'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ListStyleRow } from '../../../components/listStyle/ListStyleRow'

export function RenderCuotas() {
  const { search } = useLocation()

  const date = search.split('=')[1]
  const { cuotas, getPagosPorFecha, loadingCuotas: loading } = usePagosStore()
  useEffect(() => {
    getPagosPorFecha({ date })
  }, [])

  const headers = [
    'Taxista',
    'Denominacion',
    'Dias que debe',
    'Deuda',
    'Metodo de Pago',
    'Pagado'
  ]

  const claseCssRender = 'render-cuotas'

  return (
    <TablaBase headers={headers} className={claseCssRender}>
      {!loading &&
        cuotas.map(
          ({
            id,
            fullName,
            denominacion,
            dayNotPaid,
            mountAverage,
            dayPaid,
            mountPaid
          }) => (
            <ListStyleRow key={id}>
              <li
                className="cursor-pointer"
                onClick={() => alert('En construccion')}
                title={fullName}
              >
                {fullName}
              </li>

              <li title={denominacion.denominationName}>
                {denominacion.denominationName}
              </li>

              <li title={dayNotPaid}>{dayNotPaid}</li>
              <li title={mountAverage}>S/. {mountAverage}</li>
              <li title={dayPaid}>{dayPaid}</li>
              <li title={mountPaid}>S/. {mountPaid}</li>
            </ListStyleRow>
          )
        )}
    </TablaBase>
  )
}
