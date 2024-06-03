import './RenderExoneraciones.css'

import { Etiqueta } from '../../../components/etiquetas/Etiquetas'
import { ListStyleRow } from '../../../components/listStyle/ListStyleRow'
import { TablaBase } from '../../../components/tablas/TablaBase'
import { formatearFechaCorta } from '../../../utils/formatear'
import { BotonDetalles } from '../../../components/botones/BotonDetalles'
import { useRef } from 'react'
import { COLORES_ETIQUETAS } from '../../../components/etiquetas/consts/etiquetas'

const estados = {
  completo: 'completo',
  pendiente: 'pending',
  enRevision: 'submitted'
}

const tagStatus = {
  [estados.completo]: {
    text: 'Completo',
    color: COLORES_ETIQUETAS.verde
  },
  [estados.pendiente]: {
    text: 'Pendiente',
    color: COLORES_ETIQUETAS.celeste
  },
  [estados.enRevision]: {
    text: 'En revisión',
    color: COLORES_ETIQUETAS.amarillo
  }
}

export function RenderExoneraciones () {
  const headers = ['No.', 'Supervisor', 'Fecha', 'Taxista', 'Estado', '']

  const exoneraciones = useRef(Array(10).fill(null).map((_, index) => ({
    id: index + 1,
    supervisor: `Supervisor ${index + 1}`,
    fecha: new Date(),
    taxista: `Taxista No. ${index + 1}`,
    estado: Math.floor(Math.random() * 10) < 5 ? estados.enRevision : Math.floor(Math.random() * 10) === 5 ? estados.pendiente : estados.completo
  }))).current

  const loading = false

  const claseCssRender = 'render-exoneraciones'
  // const detallesExoneracionModal = useRef()

  // const [currentDetallesModal, setCurrentDetallesModal] = useState(null)

  return (
    <TablaBase
      headers={headers}
      className={`${claseCssRender}`}
    >
      {
        !loading &&
        exoneraciones.map(({ id, supervisor, fecha, taxista, estado }, idx) => (
          <ListStyleRow
            key={id}
          >
            <li
              title={id}
            >
              {id}
            </li>
            <li
              title={supervisor}
            >
              {supervisor}
            </li>
            <li
              title={formatearFechaCorta(fecha)}
            >
              {formatearFechaCorta(fecha)}
            </li>
            <li
              title={taxista}
            >
              {taxista}
            </li>
            <li
              title='Estado'
            >
              <Etiqueta
                text={tagStatus[estado].text}
                color={tagStatus[estado].color}
                className='w-fit'
              />
            </li>

            <li>
              <BotonDetalles
                onClick={() => {
                  // setCurrentDetallesModal(exoneraciones[idx])
                  // detallesExoneracionModal.current.showModal()

                  alert('en construccion')
                }}
              >
                Detalles
              </BotonDetalles>
            </li>
          </ListStyleRow>
        ))
      }

      {/* <DetallesExoneracion
        refModal={detallesExoneracionModal}
        detalles={currentDetallesModal}
        onClose={() => setCurrentDetallesModal(null)}
      /> */}
    </TablaBase>
  )
}
