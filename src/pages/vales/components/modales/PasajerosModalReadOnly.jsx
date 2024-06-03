import { useRef, useState } from 'react'
import { BotonCerrar } from '../../../../components/botones/BotonCerrar'
import { ModalBase } from '../../../../components/modales/ModalBase'
import { LabelText } from '../../../../components/labels/LabelText'

export function PasajerosModalReadOnly ({ refModal: thisModal, onClose, pasajeros }) {
  const detallesPasajeroModal = useRef()
  const [currentPasajeroInfo, setCurrentPasajeroInfo] = useState(null)

  return (
    <>
      <ModalBase
        refModal={thisModal}
        onClose={e => {
          onClose && onClose(e)
        }}
      >
        <section
          className='w-[400px] h-[245px] max-h-[85dvh] gap-5 flex flex-col p-5 rounded-[32px] overflow-x-clip overflow-y-auto scroll-neutral'
        >
          <header>
            <h4
              className='titulo-h4 text-azul-500'
            >
              Pasajeros
            </h4>
          </header>

          <menu
            className='w-full flex flex-grow flex-col gap-5 min-h-[100px] overflow-x-clip overflow-y-auto scroll-neutral'
          >
            {
              pasajeros &&
              pasajeros
                .map(({ id, firstName: nombre, lastName: apellido }, idx) => {
                  const nombreCompleto = `${nombre} ${apellido}`.trim()

                  return (
                    <li
                      key={id}
                      className='w-full flex items-center justify-between gap-5'
                    >
                      <button
                        className='w-full'
                        type='button'
                        onClick={() => {
                          setCurrentPasajeroInfo(pasajeros[idx])
                          detallesPasajeroModal.current.showModal()
                        }}
                      >
                        <strong
                          title={nombreCompleto}
                          className='w-full block text-start texto-regular-l text-textoPrincipal truncate'
                        >
                          {nombreCompleto}
                        </strong>
                      </button>
                    </li>
                  )
                })
            }
          </menu>

          <BotonCerrar
            className='self-end'
            onClick={() => thisModal.current.close()}
          />
        </section>
      </ModalBase>

      <DetallesPasajero
        refModal={detallesPasajeroModal}
        pasajero={currentPasajeroInfo}
        onClose={() => setCurrentPasajeroInfo(null)}
      />
    </>
  )
}

function DetallesPasajero ({ refModal: thisModal, onClose, pasajero }) {
  const {
    firstName: nombre,
    lastName: apellido,
    travels: viajes,
    contact_number: numeroContacto
  } = pasajero || {}

  const nombreCompleto = `${nombre} ${apellido}`

  return (
    <ModalBase
      refModal={thisModal}
      onClose={onClose}
    >
      <section
        className='w-[400px] h-fit max-h-[85dvh] gap-5 flex flex-col p-5 rounded-[32px] overflow-x-clip overflow-y-auto scroll-neutral'
      >
        <header>
          <h4
            className='titulo-h4 text-azul-500'
          >
            Detalles del pasajero
          </h4>
        </header>

        {/*
          aqui no le coloco defaultValue porque el nombreCompleto ha sido declarado y siempre
          sera un string y tan solo cambiara el valor que contiene por ser un template string
          por lo que el defaultaValue no actualiza de inmediato al valor actual, o sea,
          no esta cambiando de definido a undefined, por ese se le coloca como value
          en lugar de defaultValue
        */}
        <LabelText
          label='Nombre Completo'
          value={nombreCompleto}
          readOnly
        />

        <LabelText
          label='Número de contacto'
          defaultValue={numeroContacto}
          readOnly
        />

        <LabelText
          label='Viajes'
          defaultValue={viajes}
          readOnly
        />

        <BotonCerrar
          className='self-end'
          onClick={() => thisModal.current.close()}
        />
      </section>
    </ModalBase>
  )
}
