import { useRef, useState } from 'react'
import { NormalCheck } from '../../../../components/checkbox/Checkbox'
import { TextArea } from '../../../../components/inputs/TextArea'
import { LabelText } from '../../../../components/labels/LabelText'
import { MenuComun } from '../../../../components/menus/MenuComun'
import { ModalBase } from '../../../../components/modales/ModalBase'
import { formatearInputASoles } from '../../../../utils/formatearInputASoles'
import { formatearASoles } from '../../../../utils/formatearASoles'
import { parsearSoles } from '../../../../utils/parsearSoles'
import { useUsuarioSupervisor } from '../../../../store/useUsuarioSupervisor'
import { atenuarFormulario } from '../../../../utils/atenuarFormulario'
import { InputSelect } from '../../../../components/select/InputSelect'
import { getImage } from '../../../../consts/api'
import { useTaxistas } from '../../../../store/taxistas/useTaxistas'
import { Select } from '../../../../components/select/Select'
import { InputTime } from '../../../../components/inputs/InputTime'
import { useCorporativos } from '../../../../store/usuariosCorporativos/useCorporativos'
import { InputDoble } from '../../../../components/inputs/InputDoble'
import { useVehiculos } from '../../../../store/vehiculos/useVehiculos'
import { usePasajeros } from '../../../../store/pasajeros/usePasajeros'
import { PasajerosModal } from './PasajerosModal'
import { TextInput } from '../../../../components/inputs/TextInput'
import { InputSearchSelect } from '../../../../components/select/InputSearchSelect'
import { useVales } from '../../../../store/vales/useVales'
import { tipoServicio, tiposServicioApi } from '../../consts/tiposServicio'

const fields = {
  supervisor: 'supervisor_id',

  funcionario: 'user_corporation_id',
  area: 'area_corporative_id',
  vehiculo: 'vehicle_id',
  pasajeros: 'passengers',

  fecha: 'date',
  servicio: 'service',

  destino: 'destiny',
  horas: 'hours',

  observaciones: 'remarks',
  carga: 'request_to_load',
  extraCarga: 'request_to_extraload',

  horaSolicitada: 'request_time',
  horaSalida: 'departure_time',

  costoReal: 'cost_actual',
  descuento: 'discount',
  igv: 'igv',
  peaje: 'peaje',
  subTotal: 'sub_total',
  total: 'total_cost',

  firma: 'signature',
  taxista: 'taxista_id'
}

const TIPOS_SERVICIO = [
  {
    label: 'Tipo destino',
    value: 'Destiny'
  },
  {
    label: 'Por horas',
    value: 'Hours'
  }
]

export function NuevoVale ({ refModal: thisModal, onClose }) {
  const {
    usuarioSupervisor: {
      id: supervisorId
    }
  } = useUsuarioSupervisor()

  const pasajerosModal = useRef()

  const { vehiculos } = useVehiculos()

  const formRef = useRef()

  // FUNCIONARIO
  const initialUsuarioCorporativo = useRef({
    area: '',
    areaId: '',
    descuento: null,
    firma: ''
  }).current
  const [usuarioCorporativo, setUsuarioCorporativo] = useState(initialUsuarioCorporativo)

  const { buscarCorporativo, resetCorporativosSearch, corporativosSearch } = useCorporativos()

  function handleChangeFuncionario ({ label, value }) {
    const currentUsuarioCorporativo = corporativosSearch
      .find(({ user: { id } }) => parseInt(id) === parseInt(value))

    if (!currentUsuarioCorporativo) return

    const {
      area_corporative: {
        area_name: area,
        id: areaId,
        discount: descuento
      },
      user: {
        signature: firma
      }
    } = currentUsuarioCorporativo

    setUsuarioCorporativo({
      area,
      areaId,
      descuento,
      firma
    })
  }

  // VEHICULO
  const initialVehiculoId = useRef(null).current
  const [vehiculoId, setVehiculoId] = useState(initialVehiculoId)

  // PASAJEROS
  const { pasajerosSearch, buscarPasajero, resetPasajerosSearch } = usePasajeros()

  const initialPasajerosSelected = useRef([]).current
  const [pasajerosSelected, setPasajerosSelected] = useState(initialPasajerosSelected)

  function handleChangePasajero ({ value }) {
    // hago un structuredClone para evitar posibles problemas al usar el spread operator
    const nuevosPasajeros = structuredClone(pasajerosSelected)
    const nuevoPasajero = pasajerosSearch.find(({ id }) => parseInt(id) === parseInt(value))

    console.log({ nuevoPasajero })

    nuevosPasajeros.shift()
    nuevosPasajeros.unshift(nuevoPasajero)

    setPasajerosSelected(nuevosPasajeros)
  }

  // function handleDeselectPasajero () {
  //   const pasajerosArray = structuredClone(pasajerosSelected.pasajeros)
  //   const pasajerosIdArray = structuredClone(pasajerosSelected.pasajerosId)

  //   pasajerosArray.shift()
  //   pasajerosIdArray.shift()

  //   setPasajerosSelected({ pasajeros: pasajerosArray, pasajerosId: pasajerosIdArray })

  //   console.log('desdelected')
  // }

  // Destiny or Hours
  const [isDestiny, setIsDestiny] = useState(true)

  // SOLICITAR CARGA
  const initialCostoCarga = useRef('').current
  const [costoCarga, setCostoCarga] = useState(initialCostoCarga)

  const initialSolicitarCarga = useRef({
    carga: false,
    extraCarga: false
  }).current
  const [solicitarCarga, setSolicitarCarga] = useState(initialSolicitarCarga)

  // GESTION DEL COSTO
  const initialCosto = useRef({
    costoReal: '',
    descuento: 'S/ 00.00',
    subTotal: 'S/ 00.00',
    igv: 'S/ 00.00',
    total: 'S/ 00.00',
    peaje: ''
  }).current

  const [costo, setCosto] = useState(initialCosto)

  // TAXISTA
  const { taxistas } = useTaxistas()

  const { crearVale } = useVales()

  return (
    <>
      <ModalBase
        refModal={thisModal}
        onClose={e => {
          setUsuarioCorporativo(initialUsuarioCorporativo)

          setVehiculoId(initialVehiculoId)
          setPasajerosSelected(initialPasajerosSelected)

          setCostoCarga(initialCostoCarga)
          setSolicitarCarga(initialSolicitarCarga)

          setCosto(initialCosto)
          resetCorporativosSearch()
          resetPasajerosSearch()

          onClose && onClose(e)
        }}
      >
        <form
          ref={formRef}
          // en un ideal el alto deberia ser de 804px
          className='w-[640px] h-fit max-h-[85dvh] gap-5 flex flex-col p-5 rounded-[32px] overflow-x-clip overflow-y-auto scroll-neutral'
          onSubmit={e => {
            e.preventDefault()
            const formData = new FormData(e.target)

            for (const [key, value] of formData) {
              if (!value || (!value && e.target[key].required)) {
                alert(`El campo ${key} es obligatorio`)
                return
              }
            }

            const hoursToIsoString = (hour) => {
              const [hours, minutes] = hour.split(':')
              const fecha = new Date()

              fecha.setHours(hours)
              fecha.setMinutes(minutes)

              return fecha.toISOString()
            }

            formData.delete(fields.carga)
            formData.delete(fields.extraCarga)

            if (solicitarCarga.carga) {
              formData.append(fields.carga, true)
            } else if (solicitarCarga.extraCarga) {
              formData.append(fields.extraCarga, true)
            }

            const body = Object.fromEntries(formData)

            body[fields.area] = parseInt(body[fields.area])
            body[fields.funcionario] = parseInt(body[fields.funcionario])

            body[fields.supervisor] = supervisorId
            body[fields.taxista] = parseInt(body[fields.taxista])

            body[fields.vehiculo] = parseInt(body[fields.vehiculo])
            body[fields.pasajeros] = pasajerosSelected.map(({ id }) => parseInt(id))

            body[fields.fecha] = new Date(body[fields.fecha]).toISOString()
            body[fields.horaSolicitada] = hoursToIsoString(body[fields.horaSolicitada])
            body[fields.horaSalida] = hoursToIsoString(body[fields.horaSalida])

            body[fields.costoReal] = parsearSoles(body[fields.costoReal]).toString()
            body[fields.descuento] = parsearSoles(body[fields.descuento]).toString()
            body[fields.subTotal] = parsearSoles(body[fields.subTotal]).toString()
            body[fields.igv] = parsearSoles(body[fields.igv]).toString()
            body[fields.peaje] = parsearSoles(body[fields.peaje]).toString()
            body[fields.total] = parsearSoles(body[fields.total]).toString()

            console.log(body)

            atenuarFormulario({ form: e.target })

            crearVale({ body })
              .then(() => {
                alert('Vale creado correctamente')
                thisModal.current.close()
              })
              .catch(() => {
                atenuarFormulario({ form: e.target, restore: true })
              })
          }}
        >
          <header>
            <h4
              className='titulo-h4 text-azul-500'
            >
              Crear vale
            </h4>
          </header>

          <fieldset
            // en un ideal el alto deberia ser de 584px
            className='flex gap-5 h-fit justify-between'
          >
            <fieldset
              className='flex flex-col gap-5 h-full w-[358px]'
            >
              <LabelText
                label='Funcionario'
              >
                <InputSearchSelect
                  name={fields.funcionario}
                  placeholder='Ingrese el DNI del funcionario'
                  required
                  options={
                    corporativosSearch
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
                      const vehiculo = vehiculos.find(({ id }) => parseInt(id) === parseInt(value))

                      if (!vehiculo || vehiculo.load === 'undefined' || vehiculo.extra_load === 'undefined' || !vehiculo.capacity) {
                        setSolicitarCarga(initialSolicitarCarga)
                        setCostoCarga(initialCostoCarga)
                      }

                      if (!vehiculo) {
                        setVehiculoId(initialVehiculoId)
                        return
                      }

                      const { id } = vehiculo

                      setVehiculoId(id)
                      setPasajerosSelected(prev => {
                        const nuevosPasajeros = [...prev]

                        nuevosPasajeros.splice(vehiculo.number_people, 1)

                        return nuevosPasajeros
                      })

                      if (solicitarCarga.carga) {
                        setCostoCarga(formatearASoles({ numero: vehiculo.load }))
                      } else if (solicitarCarga.extraCarga) {
                        setCostoCarga(formatearASoles({ numero: vehiculo.extra_load }))
                      }
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
                    defaultLabel={pasajerosSelected[0]?.fullName}
                    required
                    options={
                      pasajerosSearch
                        .map(({ fullName, id: idPasajero }) => ({
                          label: fullName,
                          value: idPasajero
                        }))
                    }
                    onChange={e => {
                      buscarPasajero(e.target.value)
                    }}
                    onSelect={handleChangePasajero}
                    delay={350}
                    // onChange={e => buscarPasajeroDebounce(e.target.value)}
                    // onSelect={handleChangePasajero}
                    // onDeselect={handleDeselectPasajero}
                  />
                </LabelText>

                <button
                  className='boton-primario-marca h-9 self-end'
                  type='button'
                  onClick={() => {
                    if (vehiculoId === null) return alert('Primero debe seleccionar un vehículo')
                    pasajerosModal.current.showModal()
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
                    options={TIPOS_SERVICIO}
                    onChange={({ label }) => setIsDestiny(label === tipoServicio[tiposServicioApi.destino])}
                  />
                </LabelText>
              </fieldset>

              {
                isDestiny
                  ? (
                    <LabelText
                      label='Destino o destinos'
                    >
                      <TextArea
                        name={fields.destino}
                        placeholder='Ingrese información'
                        maxLength={255}
                        required
                      />
                    </LabelText>
                    )
                  : (
                    <LabelText
                      label='Horas'
                      name={fields.horas}
                      placeholder='Ingresar horas'
                      type='number'
                      required
                    />
                    )
              }

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
                      checked={solicitarCarga.carga}
                      disabled={!vehiculoId || vehiculos.find(({ id }) => parseInt(id) === parseInt(vehiculoId)).load === 'undefined' || !vehiculos.find(({ id }) => parseInt(id) === parseInt(vehiculoId)).capacity}
                      onChange={e => {
                        if (!vehiculoId) return

                        const vehiculo = vehiculos.find(({ id }) => parseInt(id) === parseInt(vehiculoId))
                        const { load } = vehiculo
                        if (load === 'undefined') return

                        if (e.target.checked) {
                          setSolicitarCarga({
                            carga: true,
                            extraCarga: false
                          })

                          setCostoCarga(formatearASoles({ numero: load }))
                        } else {
                          setSolicitarCarga(prev => ({
                            ...prev,
                            carga: false
                          }))

                          setCostoCarga('')
                        }
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
                      checked={solicitarCarga.extraCarga}
                      disabled={!vehiculoId || vehiculos.find(({ id }) => parseInt(id) === parseInt(vehiculoId)).extra_load === 'undefined' || !vehiculos.find(({ id }) => parseInt(id) === parseInt(vehiculoId)).capacity}
                      onChange={e => {
                        if (!vehiculoId) return

                        const vehiculo = vehiculos.find(({ id }) => parseInt(id) === parseInt(vehiculoId))
                        const { extra_load: extraLoad } = vehiculo

                        if (extraLoad === 'undefined') return

                        if (e.target.checked) {
                          setSolicitarCarga({
                            carga: false,
                            extraCarga: true
                          })

                          setCostoCarga(formatearASoles({ numero: extraLoad }))
                        } else {
                          setSolicitarCarga(prev => ({
                            ...prev,
                            extraCarga: false
                          }))

                          setCostoCarga('')
                        }
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
                        const form = formRef.current
                        const inputHoraSalida = form.querySelector(`input[name="${fields.horaSalida}"]`)

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

            <hr
              className='w-px h-full border-l border-bordesSeparador'
            />

            {/* Segunda parte */}
            <fieldset
              className={`flex flex-col ${isDestiny ? 'gap-[19px]' : 'gap-3'} h-full`}
            >
              <LabelText
                label='Costo Real'
                name={fields.costoReal}
                value={costo.costoReal}
                required
                onChange={e => handleCosto({ event: e, costo, setCosto, discountParam: '30' })}
                placeholder='S/ 00.00'
              />

              <LabelText
                label='Descuento'
                name={fields.descuento}
                value={costo.descuento}
                required
                readOnly
              />

              <LabelText
                label='Sub Total'
                name={fields.subTotal}
                value={costo.subTotal}
                required
                readOnly
              />

              <LabelText
                label='+ I.G.V.'
                name={fields.igv}
                value={costo.igv}
                required
                readOnly
              />

              <LabelText
                label='Peaje / Est.'
                name={fields.peaje}
                value={costo.peaje}
                required
                onChange={e => {
                  const value = formatearInputASoles({ event: e, controlled: true })

                  if (isNaN(Number(value))) return
                  if (isNaN(Number(e.target.value.slice(-1)))) return

                  const subTotal = parsearSoles(costo.subTotal)
                  const igv = parsearSoles(costo.igv)

                  const total =
                  value
                    ? value + subTotal + igv
                    : subTotal + igv

                  setCosto(prev => ({
                    ...prev,
                    peaje: formatearASoles({ numero: value }),
                    total: formatearASoles({ numero: total }) || 'S/ 00.00'
                  }))
                }}
                placeholder='S/ 00.00'
              />

              <LabelText
                label='Total a pagar'
                name={fields.total}
                value={costo.total}
                required
                inputClass='bg-white cursor-default'
                readOnly
              />

              <LabelText
                label='Costo adicional de carga'
              >
                <TextInput
                  placeholder='S/ 00.00'
                  value={costoCarga}
                  readOnly
                />
              </LabelText>

              <fieldset className='relative cursor-default border-2 w-[202px] h-[108px] border-bordesIdle rounded-lg flex items-center justify-center'>
                {/* la firma se saca del usuario corporativo designado --> el funcionario */}
                {
                  usuarioCorporativo.firma && (
                    <img
                      className='w-[198px] h-[104px] object-cover rounded-md'
                      src={getImage(usuarioCorporativo.firma)}
                      alt='Imagen'
                    />
                  )
                }

                <input
                  className='absolute -z-50 inset-0 opacity-0 size-0 pointer-events-none'
                  type='text'
                  value={usuarioCorporativo.firma}
                  readOnly
                />
              </fieldset>
            </fieldset>
          </fieldset>

          {/* realizar un buscador en tiempo real para buscar taxistas y seleccionarlos. UPDATE --> ya se hizo pero verificar si todo funciona bien */}
          <LabelText
            label='Taxista'
          >
            <InputSelect
              name={fields.taxista}
              placeholder={vehiculoId === null ? 'Primero debe seleccionar el vehículo' : 'Ingrese el nombre del taxista'}
              readOnly={vehiculoId === null}
              required
              options={
                taxistas.filter(({ vehicle: { id } }) => parseInt(id) === parseInt(vehiculoId))
                  .map(taxista => {
                    const {
                      driver: {
                        id
                      },
                      details_driver: {
                        user_name: nombre,
                        surnames: apellidos
                      }
                    } = taxista

                    return {
                      label: `${nombre} ${apellidos}`,
                      value: id
                    }
                  })
              }
            />
          </LabelText>

          <MenuComun
            cancelProps={{ type: 'button', className: 'w-[100px]' }}
            handleCancel={() => thisModal.current.close()}
            cancelName='Cancelar'
            confirmName='Aceptar'
            confirmProps={{ type: 'submit', className: 'w-[160px]' }}
          />
        </form>
      </ModalBase>

      <PasajerosModal
        refModal={pasajerosModal}
        pasajerosSelected={pasajerosSelected}
        actualizarPasajerosSelected={setPasajerosSelected}
        vehiculoId={vehiculoId}
      />
    </>
  )
}

function handleCosto ({ event, costo, setCosto, discountParam }) {
  const value = formatearInputASoles({ event, controlled: true })

  const discount = parseFloat(discountParam.replace(/[^\d.]/g, '')) / 100

  const descuento = value * discount
  const subTotal = parseFloat((value * (1 - discount)).toFixed(2))

  const igv = parseFloat((subTotal * 0.18).toFixed(2))

  const total = parsearSoles(costo.peaje) + subTotal + igv

  if (value === 0) {
    setCosto(prev => ({
      ...prev,
      total: prev.peaje || 'S/ 00.00',
      costoReal: '',
      descuento: 'S/ 00.00',
      subTotal: 'S/ 00.00',
      igv: 'S/ 00.00'
    }))
  } else {
    setCosto(prev => ({
      ...prev,
      total: formatearASoles({ numero: total }),
      costoReal: formatearASoles({ numero: value }),
      descuento: formatearASoles({ numero: descuento }),
      subTotal: formatearASoles({ numero: subTotal }),
      igv: formatearASoles({ numero: igv, cero: true })
    }))
  }
}
