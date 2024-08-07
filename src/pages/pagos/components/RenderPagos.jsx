import './RenderPagos.css'

import { useEffect } from 'react'
import { TablaBase } from '../../../components/tablas/TablaBase'
import { ListStyleRow } from '../../../components/listStyle/ListStyleRow'
import { BotonDetalles } from '../../../components/botones/BotonDetalles'
import { usePagosStore } from '../../../store/pagos/usePagosStore'
import { useNavigate } from 'react-router-dom'

export function RenderPagos() {
  const navigate = useNavigate()
  const { pagos, getPagos, loadingPagos: loading } = usePagosStore()
  useEffect(() => {
    getPagos()
  }, [])

  const headers = [
    'Fecha',
    'Taxista que Pagaron',
    'Cuota Pagada',
    'Taxista en Deuda',
    'Cuota en Deuda',
    ''
  ]

  const claseCssRender = 'render-pagos-cuotas'

  const dateNavigate = date => {
    navigate(`/cuotas?selectedDate=${date}`)
  }

  return (
    <TablaBase headers={headers} className={claseCssRender}>
      {!loading &&
        pagos.map(
          ({ selectedDate, isPayment, notPayment, feePaid, notFeePaid }) => (
            <ListStyleRow key={selectedDate}>
              <li title={selectedDate}>{selectedDate}</li>

              <li title={isPayment}>{isPayment}</li>

              <li title={feePaid}>S/. {feePaid}</li>
              <li title={notPayment}>{notPayment}</li>
              <li title={notFeePaid}>S/. {notFeePaid}</li>

              <li className="flex justify-end items-center">
                <BotonDetalles onClick={() => dateNavigate(selectedDate)} />
              </li>
            </ListStyleRow>
          )
        )}
    </TablaBase>
  )
}
