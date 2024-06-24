import { useMemo, useRef, useState } from 'react'
import { LabelText } from '../../../../components/labels/LabelText'
import { ModalBase } from '../../../../components/modales/ModalBase'
import { InputSearchSelect } from '../../../../components/select/InputSearchSelect'
import { usePasajeros } from '../../../../store/pasajeros/usePasajeros'
import { BotonEliminar } from '../../../../components/botones/BotonEliminar'
import { isEqual } from '../../../../utils/isEqual'
import { useVehiculos } from '../../../../store/vehiculos/useVehiculos'
import { MenuComun } from '../../../../components/menus/MenuComun'
import { NuevoPasajero } from '../../../pasajeros/components/modales/NuevoPasajero'
import { BotonAgregar } from '../../../../components/botones/BotonAgregar'

export function PasajerosModal ({ refModal: thisModal, onClose, pasajerosSelected, actualizarPasajerosSelected, vehiculoId }) {
  const { vehiculos } = useVehiculos()
  const nuevoPasajeroModalRef = useRef()

  const [editMode, setEditMode] = useState(true)

  const { pasajerosSearchList, buscarPasajero, resetPasajerosSearchList } = usePasajeros()
  const initialPasajerosSelected = useRef(pasajerosSelected)

  const initialPasajeroTarget = useRef(null).current
  const [pasajeroTarget, setPasajeroTarget] = useState(initialPasajeroTarget)

  const [pasajerosInternos, setPasajerosInternos] = useState(pasajerosSelected)

  const initialQuery = useRef('').current
  const [query, setQuery] = useState('')

  if (!isEqual(initialPasajerosSelected.current, pasajerosSelected)) {
    initialPasajerosSelected.current = pasajerosSelected
    setPasajerosInternos(pasajerosSelected)
  }

  // hacer un slice(0, capacidadMaxima) de pasajeros internos al setear el estado actualizarPasajerosSelected

  const vehiculo = useMemo(() => vehiculos.find(({ id }) => parseInt(id) === parseInt(vehiculoId)), [vehiculoId, vehiculos])

  const capacidadMaxima = vehiculo?.number_people || 0

  const placeholderInputSearch = 'Buscar nombre del pasajero'

  const inputHasValue = (() => {
    const inputSearch = document.querySelector(`input[placeholder="${placeholderInputSearch}"]`) // Este es el input donde se esta ejecutando la busqueda

    return Boolean(inputSearch && inputSearch.value)
  })()

  function handleEditCancel () {
    if (isEqual(pasajerosInternos, pasajerosSelected)) return setEditMode(false)

    const isCancel = window.confirm('¿Desea descartar los cambios?')

    if (isCancel) {
      setEditMode(false)
      setPasajerosInternos(pasajerosSelected)
    }
  }

  function handleEditConfirm () {
    if (isEqual(pasajerosInternos, pasajerosSelected) && !inputHasValue) return setEditMode(false)

    const isConfirm = window.confirm('¿Desea guardar los cambios?')

    if (isConfirm) {
      setEditMode(false)
      actualizarPasajerosSelected(pasajerosInternos)
    }
  }

  function agregarPasajeroInterno (pasajero) {
    return new Promise((resolve, reject) => {
      if (!pasajero) {
        return alert('Debe seleccionar un pasajero')
      }

      if (pasajerosInternos.length >= capacidadMaxima) {
        return alert('No puede agregar mas pasajeros, verifique la capacidad máxima de este vehículo')
      }

      const isPassengerAlreadyInList = pasajerosInternos.some(({ id }) => parseInt(id) === parseInt(pasajero.id))

      if (isPassengerAlreadyInList) reject(pasajero)

      setPasajerosInternos(prev => [...prev, pasajero])
      resolve(pasajero)
    })
  }

  return (
    <>
      <ModalBase
        refModal={thisModal}
        onClose={e => {
          resetPasajerosSearchList()
          setQuery(initialQuery)
          setPasajeroTarget(initialPasajeroTarget) // quitar si ocurre algun error

          setPasajerosInternos(pasajerosSelected) // se hace esto para asegurarse de que siempre mantenga el estado verdadero de los pasajeros seleccionados

          onClose && onClose(e)
        }}
      >
        <section
          className='w-[400px] h-[320px] max-h-[85dvh] gap-5 flex flex-col p-5 rounded-[32px] overflow-x-clip overflow-y-auto scroll-neutral'
        >
          <header
            className='flex justify-between gap-3 items-center'
          >
            <h4
              className='titulo-h4 text-azul-500'
            >
              Pasajeros
            </h4>

            <strong
              title={`Capacidad máxima: ${capacidadMaxima}`}
              className='texto-regular-l text-textoPrincipal truncate'
            >
              Capacidad máxima: {capacidadMaxima}
            </strong>
          </header>

          {
          editMode && (
            <LabelText
              label='Buscar pasajeros'
            >
              <fieldset
                className='flex gap-xs'
              >
                <InputSearchSelect
                  placeholder={placeholderInputSearch}
                  readOnly={pasajerosInternos.length >= capacidadMaxima || !editMode}
                  options={
                    pasajerosSearchList
                      .map(({ fullName, id: idPasajero }) => ({
                        label: fullName,
                        value: idPasajero
                      }))
                  }
                  defaultLabel={query}
                  onChange={e => {
                    buscarPasajero(e.target.value)
                  }}
                  onSelect={({ label, value }) => {
                    const pasajeroSeleccionado = {
                      fullName: label,
                      id: value
                    }

                    setPasajeroTarget(pasajeroSeleccionado)
                    setQuery(label)
                  }}
                  delay={350}
                />

                <BotonAgregarPasajero
                  disabled={pasajerosInternos.length >= capacidadMaxima}
                  onClick={() => {
                    if (pasajerosInternos.length >= capacidadMaxima) return alert('No puede agregar mas pasajeros, verifique la capacidad máxima de este vehículo')

                    if (pasajeroTarget) {
                      const isPassengerAlreadyInList = pasajerosInternos.some(({ id }) => parseInt(id) === parseInt(pasajeroTarget.id))

                      if (!isPassengerAlreadyInList) {
                        setPasajerosInternos(prev => [...prev, pasajeroTarget])
                      }

                      setPasajeroTarget(initialPasajeroTarget)
                      setQuery(initialQuery)
                    } else {
                      alert('Debe seleccionar un pasajero')
                    }
                  }}
                />

                <BotonCrearPasajero
                  onClick={() => nuevoPasajeroModalRef.current.showModal()}
                />

              </fieldset>
            </LabelText>
          )
        }

          <ul
            className='flex flex-grow flex-col gap-5 min-h-[100px] overflow-x-clip overflow-y-auto scroll-neutral'
          >
            {
              pasajerosSelected &&
              pasajerosInternos
                .map(({ id, fullName: nombreCompleto }, idx) => (
                  <li
                    key={id}
                    className='flex items-center justify-between gap-5'
                  >
                    <strong
                      title={nombreCompleto}
                      className='texto-regular-l text-textoPrincipal truncate'
                    >
                      {nombreCompleto}
                    </strong>

                    {
                      editMode && (
                        <BotonEliminar
                          onClick={() => {
                            const nuevosPasajerosInternos = [...pasajerosInternos]

                            nuevosPasajerosInternos.splice(idx, 1)

                            setPasajerosInternos(nuevosPasajerosInternos)
                          }}
                        />
                      )
                    }
                  </li>
                ))
          }
          </ul>

          <MenuComun
            cancelProps={{ type: 'button', className: 'w-[100px]' }}
            handleCancel={() => {
              if (editMode) {
                return handleEditCancel()
              }

              thisModal.current.close()
            }}
            cancelName={editMode ? 'Cancelar' : 'Cerrar'}
            confirmName={editMode ? 'Guardar' : 'Editar'}
            confirmProps={{ type: 'button', className: 'w-[160px]' }}
            handleConfirm={() => {
              if (editMode) {
                return handleEditConfirm()
              }

              setEditMode(true)
            }}
          />
        </section>
      </ModalBase>

      <NuevoPasajero
        refModal={nuevoPasajeroModalRef}
        onSuccess={({ passenger: { firstName, lastName, id } }) => {
          agregarPasajeroInterno({ fullName: `${firstName} ${lastName}`, id })
        }}
      />
    </>
  )
}

function BotonAgregarPasajero ({ onClick, ...props }) {
  return (
    <button
      {...props}
      type='button'
      className='boton-primario-marca h-9'
      onClick={onClick}
    >
      Añadir
    </button>
  )
}

function BotonCrearPasajero ({ onClick, ...props }) {
  return (
    <BotonAgregar
      {...props}
      onClick={onClick}
    />
  )
}
