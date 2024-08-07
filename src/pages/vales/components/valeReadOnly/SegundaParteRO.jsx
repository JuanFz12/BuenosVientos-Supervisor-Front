import { LabelText } from '../../../../components/labels/LabelText'
import { getImage } from '../../../../consts/api'
import { formatearASoles } from '../../../../utils/formatearASoles'

export function SegundaParteRO ({ data }) {
  const {
    requestVale: {
      request_to_load: carga,
      request_to_extraload: extraCarga
    } = {},
    submitVale: {
      cost_actual: costoReal,
      discount: descuento,
      sub_total: subTotal,
      igv,
      peaje,
      total_cost: total
    } = {},
    user_corporative: {
      signature: firma
    } = {},
    vehicle: vehiculo
  } = data || {}

  // Vehiculo
  const getPrice = (key) => vehiculo && Boolean(parseFloat(vehiculo?.[key])) && formatearASoles({ numero: vehiculo?.[key] })

  const costoCargaVehiculo = getPrice('load')
  const costoExtraCargaVehiculo = getPrice('extra_load')

  // Costo carga
  const costoCarga = carga ? costoCargaVehiculo : extraCarga ? costoExtraCargaVehiculo : 'S/ 00.00'

  return (
    <fieldset className='flex flex-col gap-3 h-full'>
      <LabelText
        label='Costo Real'
        defaultValue={formatearASoles({ numero: costoReal })}
        inputClass='bg-white cursor-default'
        readOnly
      />

      <LabelText
        label='Descuento'
        defaultValue={formatearASoles({ numero: descuento })}
        inputClass='bg-white cursor-default'
        readOnly
      />

      <LabelText
        label='Sub Total'
        defaultValue={formatearASoles({ numero: subTotal })}
        inputClass='bg-white cursor-default'
        readOnly
      />

      <LabelText
        label='+ I.G.V.'
        defaultValue={formatearASoles({ numero: igv })}
        inputClass='bg-white cursor-default'
        readOnly
      />

      <LabelText
        label='Peaje / Est.'
        defaultValue={formatearASoles({ numero: peaje })}
        readOnly
        inputClass='bg-white cursor-default'
      />

      <LabelText
        label='Total a pagar'
        defaultValue={formatearASoles({ numero: total })}
        labelClass='text-amarilloAdvertencia-700 font-medium'
        inputClass='!text-amarilloAdvertencia-700 font-medium !border-[#EE8C0B] !bg-amarilloAdvertencia-100'
        readOnly
      />

      <LabelText
        label='Costo adicional de carga'
        value={costoCarga}
        readOnly
      />

      <fieldset className='cursor-default border-2 w-[190px] h-[108px] border-bordesIdle rounded-lg flex items-center justify-center'>
        <img
          className='max-w-[186px] h-[104px] object-contain rounded-md'
          src={getImage(firma)}
          alt='Imagen'
        />
      </fieldset>
    </fieldset>
  )
}
