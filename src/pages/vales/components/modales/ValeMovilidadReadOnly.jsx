import { NormalCheck } from '../../../../components/checkbox/Checkbox'
import { TextArea } from '../../../../components/inputs/TextArea'
import { LabelText } from '../../../../components/labels/LabelText'
import { ModalBase } from '../../../../components/modales/ModalBase'
import { getImage } from '../../../../consts/api'
import { formatearFechaCorta, formatearHoraLarga } from '../../../../utils/formatear'
import { formatearASoles } from '../../../../utils/formatearASoles'

export function ValeMovilidadReadOnly ({
  refModal: thisModal,
  data,
  onClose
}) {
  const {
    detail_user_corporate: {
      user_name: nombres,
      surnames: apellidos
    } = {},
    area: {
      area_name: area
    } = {},
    requestVale: {
      passenger: pasajero,
      date: fecha,
      district: distrito,
      destiny: destino,
      remarks: observaciones,
      capacity: llevarCarga,
      request_time: horaSolicitada,
      departure_time: horaSalida,
      arrival_time: horaLlegada
    } = {},
    submitVale: {
      cost_actual: costoReal,
      discount: descuento,
      sub_total: subTotal,
      igv,
      peaje,
      total_cost: total
    } = {},
    driver: {
      fullName: taxista
    } = {},
    user_corporative: {
      signature: firma
    } = {}
  } = data || {}

  return (
    <ModalBase
      refModal={thisModal}
      onClose={onClose}
    >
      <form
        onSubmit={e => e.preventDefault()}
        className='w-[640px] h-[804px] max-h-[85dvh] gap-5 flex flex-col p-5 rounded-[32px] overflow-x-clip overflow-y-auto scroll-neutral'
      >
        <header>
          <h4 className='titulo-h4 text-azul-500'>Vale de movilidad</h4>
        </header>

        <fieldset className='flex gap-5 h-[584px] justify-between'>
          <fieldset className='flex flex-col gap-5 h-full w-[358px] [&_input[type=text]]:bg-white [&_input[type=text]]:cursor-default'>
            <LabelText
              label='Funcionario'
              defaultValue={nombres && `${nombres} ${apellidos}`}
              readOnly
            />

            <LabelText
              label='Área'
              defaultValue={area}
              readOnly
            />

            <LabelText
              label='Pasajero'
              defaultValue={pasajero}
              readOnly
            />

            <fieldset className='flex gap-5 justify-between [&>label]:w-[170px]'>
              <LabelText
                label='Fecha'
                defaultValue={fecha && formatearFechaCorta(fecha)}
                readOnly
              />

              <LabelText
                label='Distrito'
                defaultValue={distrito}
                readOnly
              />
            </fieldset>

            <LabelText
              label='Destino'
              defaultValue={destino}
              readOnly
            />

            <fieldset className='flex flex-col gap-2'>
              <LabelText label='Observaciones'>
                <TextArea
                  className='w-full h-[84px] cursor-default bg-white'
                  defaultValue={observaciones}
                  readOnly
                />
              </LabelText>

              <label className='flex items-center gap-2 h-4 texto-regular-m text-textoPrincipal'>
                <NormalCheck
                  labelClass='scale-[80%] cursor-default'
                  defaultChecked={llevarCarga}
                  disabled
                />
                Solicitar para llevar carga
              </label>
            </fieldset>

            <fieldset className='flex gap-5 justify-between w-full max-w-full [&>label]:flex-1 [&>label]:max-w-[106px]'>
              <LabelText
                label='Hora Solicitada'
                defaultValue={horaSolicitada && formatearHoraLarga(horaSolicitada)}
                readOnly
              />

              <LabelText
                label='Hora de Salida'
                defaultValue={horaSalida && formatearHoraLarga(horaSalida)}
                readOnly
              />

              <LabelText
                label='Hora de Llegada'
                defaultValue={horaLlegada && formatearHoraLarga(horaLlegada)}
                readOnly
              />
            </fieldset>
          </fieldset>

          <hr className='w-px h-full border-l border-bordesSeparador' />

          <fieldset className='flex flex-col gap-5 h-full'>
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
              inputClass='bg-white cursor-default'
              readOnly
            />

            <fieldset className='cursor-default border-2 w-[202px] h-[128px] border-bordesIdle rounded-lg flex items-center justify-center'>
              <img
                className='w-[198px] h-[124px] object-cover rounded-md'
                src={getImage(firma)}
                alt='Imagen'
              />
            </fieldset>
          </fieldset>
        </fieldset>

        <LabelText
          label='Taxista'
          defaultValue={taxista}
          readOnly
        />

        <button
          className='boton-terciario-marca w-[100px] self-end'
          type='button'
          onClick={() => thisModal.current.close()}
        >
          Cerrar
        </button>

      </form>
    </ModalBase>
  )
}
