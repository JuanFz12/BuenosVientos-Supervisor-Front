import './RenderPagos.css'

import { useRef } from 'react'
import { TablaBase } from '../../../components/tablas/TablaBase'
import { COLORES_ETIQUETAS } from '../../../components/etiquetas/consts/etiquetas'
import { ListStyleRow } from '../../../components/listStyle/ListStyleRow'
import { formatearFechaCorta } from '../../../utils/formatear'
import { formatearASoles } from '../../../utils/formatearASoles'
import { Etiqueta } from '../../../components/etiquetas/Etiquetas'
import { BotonDetalles } from '../../../components/botones/BotonDetalles'

const estados = {
  pendiente: 'Pending'
}

const tagStatus = {
  [estados.pendiente]: {
    text: 'Pendiente',
    color: COLORES_ETIQUETAS.amarillo
  }
}

export function RenderPagos () {
  const headers = ['Operacion', 'Terminal', 'Fecha de pago', 'Banco', 'Deuda', 'Pagado', '']

  const claseCssRender = 'render-pagos-cuotas'

  const pagos = useRef(Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    operacion: 'Operacion ' + Math.floor(Math.random() * 10000000) + index,
    terminal: 'Terminal ' + index + 1,
    fecha: Math.random() * 10 > 5 ? new Date() : estados.pendiente,
    banco: Math.random() * 10 > 5 ? 'Interbank' : 'BBVA',
    deuda: Math.floor(Math.random() * 9000) + index,
    pagado: Math.floor(Math.random() * 9000) + index
  }))).current

  const loading = false

  return (
    <TablaBase
      headers={headers}
      className={claseCssRender}
    >
      {
        !loading &&
        pagos.map(({ id, operacion, terminal, fecha, banco, deuda, pagado }) => (
          <ListStyleRow
            key={id}
          >
            <li
              title={operacion}
            >
              {operacion}
            </li>

            <li
              title={terminal}
            >
              {terminal}
            </li>

            <li
              title={
                fecha === estados.pendiente
                  ? tagStatus[fecha].text
                  : formatearFechaCorta(fecha)
              }
            >
              {
                fecha === estados.pendiente
                  ? (
                    <Etiqueta
                      text={tagStatus[fecha].text}
                      color={tagStatus[fecha].color}
                      className='w-fit'
                    />
                    )
                  : formatearFechaCorta(fecha)
              }
            </li>
            <li
              title={banco}
            >
              {banco}
            </li>
            <li
              title={formatearASoles({ numero: deuda, cero: true })}
            >
              {formatearASoles({ numero: deuda, cero: true })}
            </li>
            <li
              title={formatearASoles({ numero: pagado, cero: true })}
            >
              {formatearASoles({ numero: pagado, cero: true })}
            </li>

            <li>
              <BotonDetalles
                onClick={() => alert('En desarrollo...')}
              />
            </li>
          </ListStyleRow>
        ))
      }
    </TablaBase>
  )
}
