import { useRef, useState } from 'react'
import { LabelText } from '../../../../components/labels/LabelText'
import { ModalBase } from '../../../../components/modales/ModalBase'
import { InputSearchSelect } from '../../../../components/select/InputSearchSelect'
import { usePasajeros } from '../../../../store/pasajeros/usePasajeros'
import { BotonEliminar } from '../../../../components/botones/BotonEliminar'
import { isEqual } from '../../../../utils/isEqual'
import { useVehiculos } from '../../../../store/vehiculos/useVehiculos'
import { MenuComun } from '../../../../components/menus/MenuComun'

export function PasajerosModal ({ refModal: thisModal, onClose, pasajerosSelected, actualizarPasajerosSelected, vehiculoId }) {
  const { vehiculos } = useVehiculos()

  const [editMode, setEditMode] = useState(true)

  const { pasajerosSearch, buscarPasajero, resetPasajerosSearch } = usePasajeros()
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

  const vehiculo = vehiculos.find(({ id }) => parseInt(id) === parseInt(vehiculoId))

  const capacidadMaxima = vehiculo?.number_people || 0

  function handleEditCancel () {
    if (isEqual(pasajerosInternos, pasajerosSelected)) return setEditMode(false)

    const isCancel = window.confirm('¿Está seguro de que desea descartar los cambios?')

    if (isCancel) {
      setEditMode(false)
      setPasajerosInternos(pasajerosSelected)
    }
  }

  function handleEditConfirm () {
    if (isEqual(pasajerosInternos, pasajerosSelected)) return setEditMode(false)

    const isConfirm = window.confirm('¿Está seguro de que desea guardar los cambios?')

    if (isConfirm) {
      setEditMode(false)
      actualizarPasajerosSelected(pasajerosInternos)
    }
  }

  return (
    <ModalBase
      refModal={thisModal}
      onClose={() => {
        resetPasajerosSearch()
        setQuery(initialQuery)
        onClose && onClose()
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
                className='flex gap-m'
              >
                <InputSearchSelect
                  placeholder='Buscar nombre del pasajero'
                  readOnly={pasajerosInternos.length >= capacidadMaxima || !editMode}
                  options={
                    pasajerosSearch
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
