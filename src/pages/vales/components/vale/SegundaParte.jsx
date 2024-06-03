import { TextInput } from '../../../../components/inputs/TextInput'
import { LabelText } from '../../../../components/labels/LabelText'
import { getImage } from '../../../../consts/api'
import { fields } from '../../consts/vales'
import { useVales } from './hooks/useVales'

export function SegundaParteVale () {
  const {
    // Usuario corporativo seleccionado
    usuarioCorporativo,

    // Tipo de servicio
    isDestiny,
    isRutaFija,

    // Carga
    costoAdicionalCarga,

    // Costo
    setCostoReal,
    setPeaje,
    costo
  } = useVales()

  return (
    <fieldset
      className={`flex flex-col ${isDestiny ? 'gap-[19px]' : 'gap-3'} h-full`}
    >
      <LabelText
        label='Costo Real'
        name={fields.costoReal}
        value={usuarioCorporativo.id ? costo.costoReal : 'Primero elija un funcionario'}
        readOnly={isRutaFija || !usuarioCorporativo.id}
        required
        onChange={setCostoReal}
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
        readOnly={isRutaFija}
        required={false}
        placeholder='S/ 00.00'
        onChange={setPeaje}
      />

      <LabelText
        label='Total a pagar'
        name={fields.total}
        value={costo.total}
        required
        labelClass='text-amarilloAdvertencia-700 font-medium'
        inputClass='!text-amarilloAdvertencia-700 font-medium !border-[#EE8C0B] !bg-amarilloAdvertencia-100'
        readOnly
      />

      <LabelText
        label='Costo adicional de carga'
      >
        <TextInput
          placeholder='S/ 00.00'
          value={costoAdicionalCarga}
          readOnly
        />
      </LabelText>

      <fieldset className='relative cursor-default border-2 w-[190px] h-[108px] border-bordesIdle rounded-lg flex items-center justify-center'>
        {/* la firma se saca del usuario corporativo designado --> el funcionario */}
        {
          usuarioCorporativo.firma && (
            <img
              className='max-w-[186px] h-[104px] object-contain rounded-md'
              src={getImage(usuarioCorporativo.firma)}
              alt='Firma del usuario corporativo'
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
  )
}
