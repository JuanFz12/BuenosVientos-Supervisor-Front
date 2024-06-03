import { LabelText } from '../../../../components/labels/LabelText'
import { useVales } from './hooks/useVales'
import { InputSearchSelect } from '../../../../components/select/InputSearchSelect'
import { costoRutasFijas, fields, rutasFijasEspeciales } from '../../consts/vales'
import { InputDoble } from '../../../../components/inputs/InputDoble'
import { Select } from '../../../../components/select/Select'
import { useRef } from 'react'
import { InputTime } from '../../../../components/inputs/InputTime'
import { TIPOS_SERVICIO_LIST } from '../modales/nuevoVale/consts/nuevo-vale'
import { serviciosLabel, tiposServicioApi } from '../../consts/tiposServicio'
import { TextArea } from '../../../../components/inputs/TextArea'
import { NormalCheck } from '../../../../components/checkbox/Checkbox'

export function PrimeraParteVale ({ vehiculos = [], pasajerosModalRef }) {
  const {
    // FUNCIONARIO
    usuarioCorporativo,
    setUsuarioCorporativo,
    resetUsuarioCorporativo,

    buscarCorporativo,
    corporativosSearchList,

    // VEHICULO
    vehiculo,
    setVehiculo,

    // PASAJEROS
    pasajerosSelected,
    setPasajerosSelected,

    buscarPasajero,
    pasajerosSearchList,

    // SERVICIO
    tipoServicioActual,
    setTipoServicioActual,
    resetTipoServicioActual,
    isDestiny,
    isRutaFija,

    // SOLICITAR CARGA
    isCarga,
    isExtraCarga,
    setIsCarga,
    setIsExtraCarga,
    resetSolicitarCarga,

    costoCarga,
    costoExtraCarga,

    // COSTO
    setCostoFijo,
    resetCosto
  } = useVales()

  const vehiculoId = vehiculo.id
  const primerPasajero = pasajerosSelected[0]?.fullName

  const containerRef = useRef()

  function handleChangeFuncionario ({ label, value }) {
    const currentUsuarioCorporativo = corporativosSearchList
      .find(({ user: { id } }) => parseInt(id) === parseInt(value))

    if (!currentUsuarioCorporativo) return

    const {
      area_corporative: {
        area_name: area,
        id: areaId,
        discount: descuento
      },
      user: {
        id,
        signature: firma,
        fullName: nombreCompleto
      }
    } = currentUsuarioCorporativo

    setUsuarioCorporativo({
      id,
      nombreCompleto,
      area,
      areaId,
      descuento,
      firma
    })
  }

  function handleChangePasajero ({ value }) {
    // hago un structuredClone para evitar posibles problemas al usar el spread operator
    const nuevosPasajeros = structuredClone(pasajerosSelected)
    const nuevoPasajero = pasajerosSearchList.find(({ id }) => parseInt(id) === parseInt(value))

    nuevosPasajeros.shift() // Se elimina el primer pasajero para remplazarlo
    nuevosPasajeros.unshift(nuevoPasajero)

    setPasajerosSelected(nuevosPasajeros)
  }

  function handleDeselectPasajero () {
    const nuevosPasajeros = structuredClone(pasajerosSelected)

    nuevosPasajeros.shift()

    setPasajerosSelected(nuevosPasajeros)
  }

  return (
    <fieldset
      className='flex flex-col gap-5 h-full w-[358px]'
      ref={containerRef}
    >
      <LabelText
        label='Funcionario'
      >
        <InputSearchSelect
          name={fields.funcionario}
          placeholder='Ingrese el nombre del funcionario'
          required
          options={
            corporativosSearchList
              .map(({
                user: {
                  fullName,
                  id: idCorporativo
                }
              }) => ({
                label: fullName,
                value: idCorporativo
              }))
          }
          onChange={e => {
            buscarCorporativo(e.target.value)
          }}
          delay={350}
          onDeselect={() => {
            resetUsuarioCorporativo()
            resetCosto()
            resetTipoServicioActual()
          }}
          onSelect={handleChangeFuncionario}
        />
      </LabelText>

      <fieldset
        className='flex gap-5'
      >
        <LabelText
          label='Área'
          labelClass='flex-1'
        >
          <InputDoble
            name={fields.area}
            label={usuarioCorporativo.area}
            value={usuarioCorporativo.areaId}
            placeholder='Área corporativa'
          />
        </LabelText>

        <LabelText
          label='Vehículo'
          labelClass='flex-1'
        >
          <Select
            name={fields.vehiculo}
            placeholder='Seleccionar'
            options={
              vehiculos
                .map(({ id: idVehiculo, vehicle_name: vehiculo }) => ({
                  label: vehiculo,
                  value: idVehiculo
                }))
            }
            onChange={({ value }) => {
              resetSolicitarCarga()

              const vehiculoInfo = vehiculos.find(({ id }) => parseInt(id) === parseInt(value))

              if (!vehiculoInfo) throw new Error('Vehículo no encontrado')

              const vehiculoToSet = {
                id: vehiculoInfo.id,
                disponible: vehiculoInfo.availability,
                llevarCarga: vehiculoInfo.capacity,
                carga: vehiculoInfo.load,
                extraCarga: vehiculoInfo.extra_load,
                personas: vehiculoInfo.number_people,
                nombre: vehiculoInfo.vehicle_name
              }

              setVehiculo(vehiculoToSet)

              const newPasajerosSelected = [...pasajerosSelected].slice(0, vehiculoToSet.personas)
              setPasajerosSelected(newPasajerosSelected)
            }}
          />
        </LabelText>
      </fieldset>

      <fieldset
        className='flex gap-m justify-between'
      >
        {/* aqui agregar un array de pasajeros, y colocar el name en un input controlado o fuera del input en el submit */}
        <LabelText
          label='Pasajeros'
          labelClass='flex-1'
        >
          <InputSearchSelect
            placeholder='Ingrese el nombre del pasajero'
            defaultLabel={primerPasajero}
            required
            options={
              pasajerosSearchList
                .map(({ fullName, id: idPasajero }) => ({
                  label: fullName,
                  value: idPasajero
                }))
            }
            onChange={e => {
              buscarPasajero(e.target.value)

              if (!e.target.value) handleDeselectPasajero()
            }}
            onSelect={handleChangePasajero}
            delay={250}
          />
        </LabelText>

        <button
          className='boton-primario-marca h-9 self-end'
          type='button'
          onClick={() => {
            if (vehiculoId === null) return alert('Primero debe seleccionar un vehículo')
            if (!pasajerosModalRef.current) return alert('No existe un modal de pasajeros')
            pasajerosModalRef.current.showModal()
          }}
        >
          Ver más
        </button>
      </fieldset>

      <fieldset
        className='flex gap-5 justify-between'
      >
        <LabelText
          label='Fecha'
          labelClass='flex-1'
        >
          <InputTime
            name={fields.fecha}
            type='date'
            required
          />
        </LabelText>

        <LabelText
          label='Servicio'
          labelClass='flex-1'
        >
          <Select
            name={fields.servicio}
            placeholder='Seleccionar'
            options={TIPOS_SERVICIO_LIST}
            disabled={!usuarioCorporativo.nombreCompleto}
            onDisabled={() => alert('Por favor, primero seleccione un funcionario')}
            onChange={({ value }) => {
              setTipoServicioActual(value)

              const isRuta = value === tiposServicioApi.rutasFijas

              if (isRuta === isRutaFija) return

              if (isRuta) return resetCosto()
              if (!isRuta || isRutaFija) resetCosto()
            }}
          />
        </LabelText>
      </fieldset>

      <LabelText
        label={serviciosLabel[tipoServicioActual]}
        name={fields.horas}
        placeholder='Ingresar horas'
        type='number'
        required
      >
        {
          // Renderizar condicionalmente dependiendo del tipo de servicio
          (() => {
            if (!isDestiny && !isRutaFija) return null

            if (isDestiny) {
              return (
                <TextArea
                  name={fields.destino}
                  placeholder='Ingrese información'
                  maxLength={255}
                  required
                />
              )
            }

            if (isRutaFija) {
              return (
                <Select
                  name={fields.rutasFijas}
                  options={rutasFijasEspeciales}
                  placeholder='Seleccione una ruta'
                  onChange={({ value }) => {
                    const { costoReal, costoTotal } = costoRutasFijas[value]

                    setCostoFijo({ costoReal, costoTotal })
                  }}
                />
              )
            }

            return null
          })()
        }
      </LabelText>

      <fieldset
        className='flex flex-col gap-2'
      >
        <LabelText
          label='Observaciones'
        >
          <TextArea
            name={fields.observaciones}
            className='w-full h-[84px]'
            placeholder='Ingrese las observaciones necesarias'
            maxLength={255}
            required
          />
        </LabelText>

        <fieldset
          className='flex items-center gap-2 justify-between'
        >
          <label
            className='flex items-center gap-2 h-4 texto-regular-m text-textoPrincipal cursor-pointer has-[:disabled]:cursor-not-allowed has-[:disabled]:texto-regular-s'
          >
            <NormalCheck
              labelClass='scale-[80%] has-[:disabled]:cursor-not-allowed'
              name={fields.carga}
              checked={isCarga}
              disabled={!costoCarga}
              onChange={e => {
                if (!costoCarga) return
                setIsCarga(e.target.checked)
              }}
            />

            {
              vehiculoId
                ? 'Solicitar carga'
                : 'Seleccione un vehículo'
            }
          </label>

          <label
            className='flex items-center gap-2 h-4 texto-regular-m text-textoPrincipal cursor-pointer has-[:disabled]:cursor-not-allowed has-[:disabled]:texto-regular-s'
          >
            <NormalCheck
              labelClass='scale-[80%] has-[:disabled]:cursor-not-allowed'
              name={fields.extraCarga}
              checked={isExtraCarga}
              disabled={!costoExtraCarga}
              onChange={e => {
                if (!costoExtraCarga) return

                setIsExtraCarga(e.target.checked)
              }}
            />

            {
              vehiculoId
                ? 'Solicitar extra carga'
                : 'Seleccione un vehículo'
            }
          </label>
        </fieldset>
      </fieldset>

      <fieldset
        className='flex gap-5 justify-between w-full max-w-full'
      >
        <LabelText
          label='Hora Solicitada'
          labelClass='flex-1'
        >
          <InputTime
            name={fields.horaSolicitada}
            required
          />
        </LabelText>

        <LabelText
          label='Hora de Salida'
          labelClass='relative flex-1'
        >
          <label
            className='absolute right-0 top-0 flex items-center gap-1 h-4 text-textoPrincipal texto-regular-s cursor-pointer'
          >
            <NormalCheck
              labelClass='scale-[70%]'
              onChange={e => {
                const container = containerRef.current
                const inputHoraSalida = container.querySelector(`input[name="${fields.horaSalida}"]`)

                if (e.target.checked) {
                  inputHoraSalida.value = new Date().toLocaleTimeString('es-PE').split(':', 2).join(':')
                  inputHoraSalida.readOnly = true
                } else {
                  inputHoraSalida.readOnly = false
                  inputHoraSalida.value = ''
                }
              }}
            />

            Actual
          </label>

          <InputTime
            name={fields.horaSalida}
            required
          />
        </LabelText>
      </fieldset>

    </fieldset>
  )
}
