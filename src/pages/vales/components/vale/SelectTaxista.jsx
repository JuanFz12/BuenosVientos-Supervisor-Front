import { LabelText } from '../../../../components/labels/LabelText'
import { InputSelect } from '../../../../components/select/InputSelect'
import { fields } from '../../consts/vales'

export function SelectTaxista ({ vehiculoId, taxistas = [] }) {
  return (
    <LabelText
      label='Taxista'
    >
      <InputSelect
        name={fields.taxista}
        placeholder={vehiculoId === null ? 'Primero debe seleccionar el vehículo' : 'Ingrese el nombre del taxista'}
        readOnly={vehiculoId === null}
        required
        errMessage='No se encontraron coincidencias de taxistas para este tipo de vehiculo y/o terminal con supervisor'
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
    </LabelText>
  )
}
