import { useRef, useState } from 'react'
import { NormalCheck } from '../../../../components/checkbox/Checkbox'
import { TextArea } from '../../../../components/inputs/TextArea'
import { LabelText } from '../../../../components/labels/LabelText'
import { MenuComun } from '../../../../components/menus/MenuComun'
import { ModalBase } from '../../../../components/modales/ModalBase'

const fields = {
  taxista: 'taxista_id',
  supervisor: 'supervisor_id',
  costoReal: 'cost_actual',
  descuento: 'discount',
  igv: 'igv',
  peaje: 'peaje',
  subTotal: 'sub_total',
  total: 'total_cost',
  file: 'file'
}

export function ValeMovilidad ({
  refModal: thisModal,
  data,
  readOnly
}) {
  const [costo, setCosto] = useState({
    costoReal: '',
    descuento: 'S/ 00.00',
    subTotal: 'S/ 00.00',
    igv: 'S/ 00.00',
    total: 'S/ 00.00'
  })

  const formRef = useRef()

  // separar esto en una funcion independiente o convertirla en un componente
  function handleCosto (e) {
    function parsearSoles (stringFormat) {
      return parseFloat(stringFormat.replace(/[^\d.]/g, ''))
    }

    let currentValue
    let value

    if (e.target.value.length === 1) {
      currentValue = e.target.value
      value = parseFloat(currentValue)
      console.log('entro en el primer if')
    } else if (e.target.value.length < costo.costoReal.length) {
      currentValue = parsearSoles(costo.costoReal)
      value = Math.floor(currentValue / 10)
      console.log({ currentValue, value })
      console.log('entro en el segundo if')
    } else if (e.target.value.length > 1) {
      const lastChar = e.target.value.slice(-1).replace(/[^\d.]/g, '')
      const prevValue = parseFloat(e.target.value.slice(0, -1).replace(/[^\d.]/g, ''))

      console.log({ lastChar, prevValue })

      currentValue = prevValue + lastChar
      value = parseFloat(currentValue)
      console.log({ value })
    }

    const discount = parseFloat(data.area.discount.replace(/[^\d.]/g, '')) / 100

    const descuento = value * discount
    const subTotal = value * (1 - discount)

    const igv = subTotal * 0.18

    const peaje = formRef.current[fields.peaje].value.match(/\d+/g)
    const total = !peaje ? 'S/ 00.00' : subTotal + igv + peaje

    function formatearASoles (number) {
      if (!number) return ''

      return number.toLocaleString('es-PE', {
        style: 'currency',
        currency: 'PEN'
      })
    }

    e.target.value = formatearASoles(value)

    if (value === 0) {
      setCosto({
        ...costo,
        descuento: 'S/ 00.00',
        subTotal: 'S/ 00.00',
        igv: 'S/ 00.00',
        total: 'S/ 00.00'
      })
    } else {
      setCosto({
        costoReal: formatearASoles(value),
        descuento: formatearASoles(descuento),
        subTotal: formatearASoles(subTotal),
        igv: formatearASoles(igv),
        total: formatearASoles(total)
      })
    }
  }

  if (!data) return null

  const {
    // id,
    area: {
      area_name: area
    },
    capacity: solicitarCarga,
    date: fecha,
    destiny: destino,
    district: distrito,
    passenger: pasajero,
    remarks: observaciones,
    request_time: horaSolicitada,
    arrival_time: horaLlegada,
    departure_time: horaSalida
  } = data

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
    >
      <form
        ref={formRef}
        className='w-[640px] h-[804px] max-h-[85dvh] gap-5 flex flex-col p-5 rounded-[32px] overflow-x-clip overflow-y-auto scroll-neutral'
        onSubmit={e => {
          e.preventDefault()
          const formData = new FormData(e.target)

          console.log(Object.fromEntries(formData))
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
              value='Nombre nombre apellido apellido'
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
              onChange={handleCosto}
              placeholder='S/ 00.00'
            />

            <LabelText
              label='Descuento'
              name={fields.descuento}
              value={costo.descuento}
              inputClass='bg-white cursor-default'
              readOnly
            />

            <LabelText
              label='Sub Total'
              name={fields.subTotal}
              value={costo.subTotal}
              inputClass='bg-white cursor-default'
              readOnly
            />

            <LabelText
              label='+ I.G.V.'
              name={fields.igv}
              value={costo.igv}
              inputClass='bg-white cursor-default'
              readOnly
            />

            <LabelText
              label='Peaje / Est.'
              name={fields.peaje}
              placeholder='S/ 00.00'
            />

            <LabelText
              label='Total a pagar'
              name={fields.total}
              value={costo.total}
              inputClass='bg-white cursor-default'
              readOnly
            />

            <div
              className='bg-white cursor-default border-2 w-[202px] h-[128px] border-bordesIdle rounded-lg uppercase flex items-center justify-center'
            >
              Firma aqui
            </div>
          </fieldset>
        </fieldset>

        {/* realizar un buscador en tiempo real para buscar taxistas y seleccionarlos */}
        <LabelText
          label='Taxista'
          placeholder='Ingrese el nombre del taxista'
        />

        <MenuComun
          cancelProps={{ type: 'button', className: 'w-[100px]' }}
          handleCancel={() => thisModal.current.close()}
          cancelName='Cancelar'
          confirmName='Aceptar'
          confirmProps={{ type: 'submit', className: 'w-[160px]' }}
        />
      </form>
    </ModalBase>
  )
}
