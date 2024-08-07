import { useState } from 'react'
import { LabelText } from '../../../../components/labels/LabelText'
import { InputSelect } from '../../../../components/select/InputSelect'
import { formatearASoles } from '../../../../utils/formatearASoles'
import { fields } from '../../consts/vales'
import { getNumbers } from '../../../../helpers/getNumbers'
import { ceroSoles } from '../../../../consts/consts'

export function SelectTaxista ({ defaultValue, readOnly, pagoTaxista: pagoTaxistaProp, vehiculoId = null, taxistas = [], costoTotal }) {
  const totalCost = getNumbers({ string: costoTotal, fixed: 2 })

  const [taxistaId, setTaxistaId] = useState(null)

  const taxista = taxistaId && taxistas.find(({ driver: { id } }) => parseInt(id) === parseInt(taxistaId))
  const porcentajePagoTaxista = taxista && (getNumbers({ string: (taxista.driver.voucher_payment / 100), fixed: 2 }))

  const pagoTaxista = (totalCost && porcentajePagoTaxista && (totalCost * porcentajePagoTaxista))
  const pagoTaxistaFinal = parseFloat(pagoTaxistaProp) || (pagoTaxista && parseFloat(pagoTaxista.toFixed(2))) || 0 // Esto al final es un number | boolean

  return (
    <fieldset
      className='flex gap-5 justify-between'
    >
      <LabelText
        label='Taxista'
        labelClass='flex-grow max-w-[358px]'
        readOnly={readOnly}
        defaultValue={defaultValue}
      >
        {
          !readOnly && ( // Si es readOnly significa que debe mostrar solo el defaultValue y no renderizar esto
            <InputSelect
              name={fields.taxista}
              placeholder={vehiculoId === null ? 'Primero debe seleccionar el vehículo' : 'Ingrese el nombre del taxista'}
              readOnly={vehiculoId === null}
              required
              errMessage='No se encontraron coincidencias de taxistas para este tipo de vehiculo y/o terminal con supervisor'
              classError='-bottom-[30px]'
              onSelect={({ label, value }) => setTaxistaId(value)}
              onDeselect={() => setTaxistaId(null)}
              options={
                taxistas
                  .filter(({ details_vehicle: { id } }) => parseInt(id) === parseInt(vehiculoId))
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
          )
        }

      </LabelText>

      <LabelText
        label='Pago al taxista'
        labelClass='w-[190px]'
        name={fields.pagoTaxista}
        readOnly
        required
        value={parseFloat(pagoTaxistaFinal) ? formatearASoles({ numero: pagoTaxistaFinal, cero: true }) : ceroSoles}
        placeholder='Elija un corporativo'
      />
    </fieldset>
  )
}
