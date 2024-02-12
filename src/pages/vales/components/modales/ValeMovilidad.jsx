import { useEffect, useRef, useState } from 'react'
import { NormalCheck } from '../../../../components/checkbox/Checkbox'
import { TextArea } from '../../../../components/inputs/TextArea'
import { LabelText } from '../../../../components/labels/LabelText'
import { MenuComun } from '../../../../components/menus/MenuComun'
import { ModalBase } from '../../../../components/modales/ModalBase'
import { formatearInputASoles } from '../../../../utils/formatearInputASoles'
import { formatearASoles } from '../../../../utils/formatearASoles'
import { parsearSoles } from '../../../../utils/parsearSoles'
import { useUsuarioSupervisor } from '../../../../store/useUsuarioSupervisor'
import { useVales } from '../../../../store/vales/useVales'
import { atenuarFormulario } from '../../../../utils/atenuarFormulario'
import { InputSelect } from '../../../../components/select/InputSelect'
import { useTaxistas } from '../../../../store/taxistas/useTaxistas'

const fields = {
  taxista: 'taxista_id',
  supervisor: 'supervisor_id',
  costoReal: 'cost_actual',
  descuento: 'discount',
  igv: 'igv',
  peaje: 'peaje',
  subTotal: 'sub_total',
  total: 'total_cost',
  firma: 'signature'
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

export function ValeMovilidad ({ refModal: thisModal, data, readOnly, onClose }) {
  const {
    usuarioSupervisor: {
      id: supervisorId
    }
  } = useUsuarioSupervisor()
  const { aceptarVale } = useVales()

  const { taxistas, getTaxistas } = useTaxistas()

  useEffect(() => {
    getTaxistas()
  }, [getTaxistas])

  const [costo, setCosto] = useState({
    costoReal: '',
    descuento: 'S/ 00.00',
    subTotal: 'S/ 00.00',
    igv: 'S/ 00.00',
    total: 'S/ 00.00',
    peaje: ''
  })

  const formRef = useRef()

  useEffect(() => {
    data && readOnly && setCosto({
      costoReal: formatearASoles({ numero: data.cost_actual, cero: true }),
      descuento: formatearASoles({ numero: data.discount, cero: true }),
      subTotal: formatearASoles({ numero: data.sub_total, cero: true }),
      igv: formatearASoles({ numero: data.igv, cero: true }),
      total: formatearASoles({ numero: data.total_cost, cero: true }),
      peaje: formatearASoles({ numero: data.peaje, cero: true })
    })
  }, [data, readOnly])

  if (!data) return null

  const {
    id,
    area: {
      area_name: area,
      discount: descuento
    },
    capacity: solicitarCarga,
    date: fecha,
    destiny: destino,
    district: distrito,
    passenger: pasajero,
    remarks: observaciones,
    request_time: horaSolicitada,
    arrival_time: horaLlegada,
    departure_time: horaSalida,
    user_corporation: {
      user: {
        user_name: nombre,
        surnames: apellidos
      }
    }
  } = readOnly ? data.vale : data

  function formatearHora (date) {
    const options = {
      hour: '2-digit',
      minute: '2-digit'
    }

    const hora = new Date(date).toLocaleTimeString('es-PE', options)
    return hora
  }

  return (
    <ModalBase
      refModal={thisModal}
      onClose={e => {
        setCosto({
          costoReal: '',
          descuento: 'S/ 00.00',
          subTotal: 'S/ 00.00',
          igv: 'S/ 00.00',
          total: 'S/ 00.00',
          peaje: ''
        })

        onClose && onClose(e)
      }}
    >
      <form
        ref={formRef}
        className='w-[640px] h-[804px] max-h-[85dvh] gap-5 flex flex-col p-5 rounded-[32px] overflow-x-clip overflow-y-auto scroll-neutral'
        onSubmit={e => {
          e.preventDefault()
          const formData = new FormData()

          for (const [key, value] of new FormData(e.target)) {
            if (!value) {
              alert(`El campo ${key} es obligatorio`)
              return
            }

            formData.append(key, parsearSoles(value))
          }

          const body = Object.fromEntries(formData)
          body[fields.supervisor] = supervisorId
          body[fields.firma] = 'algunafoto.pdf'
          body[fields.taxista] = Number(body[fields.taxista])

          atenuarFormulario({ form: e.target })

          aceptarVale({ id, body })
            .then(() => {
              alert('vale aceptado')
              thisModal.current.close()
            })
            .catch(err => {
              alert(`Error: ${err.error ?? err.message ?? 'Error desconocido'}`)
              atenuarFormulario({ form: e.target, restore: true })
            })
        }}
      >
        <header>
          <h4
            className='titulo-h4 text-azul-500'
          >
            Vale de movilidad
          </h4>
        </header>

        <fieldset
          className='flex gap-5 h-[584px] justify-between'
        >

          <fieldset
            className='flex flex-col gap-5 h-full w-[358px] [&_input[type=text]]:bg-white [&_input[type=text]]:cursor-default'
          >
            <LabelText
              label='Funcionario'
              value={`${nombre} ${apellidos}`}
              readOnly
            />

            <LabelText
              label='Área'
              value={area}
              readOnly
            />

            <LabelText
              label='Pasajero'
              value={pasajero}
              readOnly
            />

            <fieldset
              className='flex gap-5 justify-between [&>label]:w-[170px]'
            >
              <LabelText
                label='Fecha'
                value={new Date(fecha).toLocaleDateString('es-PE')}
                readOnly
              />

              <LabelText
                label='Distrito'
                value={distrito}
                readOnly
              />
            </fieldset>

            <LabelText
              label='Destino'
              value={destino}
              readOnly
            />

            <fieldset
              className='flex flex-col gap-2'
            >
              <LabelText
                label='Observaciones'
              >
                <TextArea
                  className='w-full h-[84px] cursor-default bg-white'
                  value={observaciones}
                  readOnly
                />
              </LabelText>

              <label
                className='flex items-center gap-2 h-4 texto-regular-m text-textoPrincipal'
              >
                <NormalCheck
                  labelClass='scale-[80%] cursor-default'
                  checked={solicitarCarga}
                  disabled
                />

                Solicitar para llevar carga
              </label>
            </fieldset>

            <fieldset
              className='flex gap-5 justify-between w-full max-w-full [&>label]:flex-1 [&>label]:max-w-[106px]'
            >
              <LabelText
                label='Hora Solicitada'
                value={formatearHora(horaSolicitada)}
                readOnly
              />

              <LabelText
                label='Hora de Salida'
                value={formatearHora(horaSalida)}
                readOnly
              />

              <LabelText
                label='Hora de Llegada'
                value={formatearHora(horaLlegada)}
                readOnly
              />
            </fieldset>

          </fieldset>

          <hr
            className='w-px h-full border-l border-bordesSeparador'
          />

          <fieldset
            className='flex flex-col gap-5 h-full'
          >
            <LabelText
              label='Costo Real'
              name={fields.costoReal}
              value={costo.costoReal}
              readOnly={readOnly}
              inputClass={readOnly ? 'bg-white cursor-default' : ''}
              required
              onChange={e => handleCosto({ event: e, costo, setCosto, discountParam: descuento })}
              placeholder='S/ 00.00'
            />

            <LabelText
              label='Descuento'
              name={fields.descuento}
              value={costo.descuento}
              required
              inputClass='bg-white cursor-default'
              readOnly
            />

            <LabelText
              label='Sub Total'
              name={fields.subTotal}
              value={costo.subTotal}
              required
              inputClass='bg-white cursor-default'
              readOnly
            />

            <LabelText
              label='+ I.G.V.'
              name={fields.igv}
              value={costo.igv}
              required
              inputClass='bg-white cursor-default'
              readOnly
            />

            <LabelText
              label='Peaje / Est.'
              name={fields.peaje}
              value={costo.peaje}
              readOnly={readOnly}
              inputClass={readOnly ? 'bg-white cursor-default' : ''}
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

            <div
              className='bg-white cursor-default text-center border-2 w-[202px] h-[128px] border-bordesIdle rounded-lg uppercase flex items-center justify-center'
            >
              Firma del usuario corporativo
            </div>
          </fieldset>
        </fieldset>

        {/* realizar un buscador en tiempo real para buscar taxistas y seleccionarlos */}
        <LabelText
          label='Taxista'
        >
          <InputSelect
            name={fields.taxista}
            placeholder='Ingrese el nombre del taxista'
            options={
              taxistas.map(({ id, user }) => {
                return {
                  label: `${user.user_name} ${user.surnames}`,
                  value: id
                }
              })
            }
          />
        </LabelText>

        {
          readOnly
            ? (
              <button
                className='boton-terciario-marca w-[100px] self-end'
                type='button'
                onClick={() => thisModal.current.close()}
              >
                Cerrar
              </button>
              )
            : (
              <MenuComun
                cancelProps={{ type: 'button', className: 'w-[100px]' }}
                handleCancel={() => thisModal.current.close()}
                cancelName='Cancelar'
                confirmName='Aceptar'
                confirmProps={{ type: 'submit', className: 'w-[160px]' }}
              />
              )
        }
      </form>
    </ModalBase>
  )
}
