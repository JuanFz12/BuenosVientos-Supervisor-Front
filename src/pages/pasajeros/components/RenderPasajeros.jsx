import { ListStyleRow } from '../../../components/listStyle/ListStyleRow'
import { TablaBase } from '../../../components/tablas/TablaBase'
import { usePasajeros } from '../../../store/pasajeros/usePasajeros'
import './RenderPasajeros.css'

import { useEffect } from 'react'

export function RenderPasajeros () {
  const headers = ['No.', 'Nombre', 'Corporación', 'Número', 'Viajes']

  const { pasajeros, isLoading, getPasajeros } = usePasajeros()

  useEffect(() => {
    getPasajeros()
  }, [getPasajeros])

  const claseCssRender = 'render-pasajeros'

  return (
    <TablaBase
      headers={headers}
      className={`${claseCssRender}`}
      loading={isLoading}
    >
      {
        !isLoading &&
        pasajeros.map(({
          passenger: {
            id,
            firstName: nombre,
            lastName: apellidos,
            contact_number: numero,
            travels: viajes
          },
          corporation: {
            corporation_name: corporacion
          }
        }) => (
          <ListStyleRow
            key={id}
          >
            <li
              title={id}
            >
              {id}
            </li>

            <li
              title={`${nombre} ${apellidos}`}
            >
              {`${nombre} ${apellidos}`}
            </li>

            <li
              title={corporacion}
            >
              {corporacion}
            </li>

            <li
              title={numero}
            >
              {numero}
            </li>

            <li
              title={viajes}
            >
              {viajes}
            </li>
          </ListStyleRow>
        ))
      }
    </TablaBase>
  )
}
