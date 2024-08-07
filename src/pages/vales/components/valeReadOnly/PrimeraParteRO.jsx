import { NormalCheck } from '../../../../components/checkbox/Checkbox'
import { TextArea } from '../../../../components/inputs/TextArea'
import { LabelText } from '../../../../components/labels/LabelText'
import { formatearFechaCorta, formatearHoraLarga } from '../../../../utils/formatear'
import { serviciosLabel, tiposServicioApi } from '../../consts/tiposServicio'

export function PrimeraParteRO ({ data, pasajerosModalRef }) {
  const {
    detail_user_corporate: {
      user_name: nombres,
      surnames: apellidos
    } = {},
    area: {
      area_name: area
    } = {},
    requestVale: {
      date: fecha,
      remarks: observaciones,
      request_time: horaSolicitada,
      departure_time: horaSalida,
      passengers: pasajeros,
      request_to_load: carga,
      request_to_extraload: extraCarga,
      destinyOrigin: originName,
      destinyDestination: destinationName
    } = {},
    vehicle: vehiculo
  } = data || {}

  // Vehículo
  const vehiculoNombre = vehiculo?.vehicle_name

  // Pasajeros
  const primerPasajeroNombre = pasajeros && `${pasajeros[0].firstName} ${pasajeros[0].lastName}`

  // Localización
  const nombreOrigen = originName
  const nombreDestino = destinationName

  // Label
  const servicioLabel = serviciosLabel[tiposServicioApi.destino]

  return (
    <fieldset className='flex flex-col gap-5 h-full w-[358px]'>
      <LabelText
        label='Funcionario'
        defaultValue={nombres && `${nombres} ${apellidos}`}
        readOnly
      />

      <fieldset
        className='flex gap-5 justify-between max-w-full'
      >
        <LabelText
          label='Área'
          defaultValue={area}
          readOnly
        />

        <LabelText
          label='Vehículo'
          defaultValue={vehiculoNombre}
          readOnly
        />
      </fieldset>

      <fieldset
        className='flex gap-m justify-between'
      >
        <LabelText
          label='Pasajeros'
          labelClass='flex-1'
          defaultValue={primerPasajeroNombre}
          readOnly
        />

        <button
          className='boton-primario-marca h-9 self-end'
          type='button'
          onClick={() => pasajerosModalRef.current.showModal()}
        >
          Ver más
        </button>
      </fieldset>

      <LabelText
        label='Fecha'
        defaultValue={fecha && formatearFechaCorta(fecha)}
        readOnly
      />

      <fieldset
        className='flex gap-5 justify-between'
      >
        <LabelText
          label={servicioLabel.start}
          defaultValue={nombreOrigen}
          readOnly
        />

        <LabelText
          label={servicioLabel.end}
          defaultValue={nombreDestino}
          readOnly
        />
      </fieldset>

      <fieldset className='flex flex-col gap-2'>
        <LabelText label='Observaciones'>
          <TextArea
            className='w-full h-[84px]'
            defaultValue={observaciones}
            readOnly
          />
        </LabelText>

        <fieldset
          className='flex justify-between gap-2 max-w-full'
        >
          <label
            className='flex items-center gap-2 h-4 texto-regular-m text-textoPrincipal'
          >
            <NormalCheck
              labelClass='scale-[80%] cursor-default'
              defaultChecked={carga}
              disabled
            />

            Solicitar carga
          </label>

          <label
            className='flex items-center gap-2 h-4 texto-regular-m text-textoPrincipal'
          >
            <NormalCheck
              labelClass='scale-[80%] cursor-default'
              defaultChecked={extraCarga}
              disabled
            />

            Solicitar extra carga
          </label>
        </fieldset>
      </fieldset>

      <fieldset className='flex gap-5 justify-between w-full max-w-full'>
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
      </fieldset>
    </fieldset>
  )
}
