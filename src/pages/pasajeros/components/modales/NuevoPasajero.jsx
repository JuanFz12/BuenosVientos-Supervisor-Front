import { useEffect, useRef } from 'react'
import { usePasajeros } from '../../../../store/pasajeros/usePasajeros'
import { ModalBase } from '../../../../components/modales/ModalBase'
import { useCorporacionesStore } from '../../../../store/corporaciones/useCorporacionesStore'
import { validarCampos } from '../../../../utils/validarCampos'
import { atenuarFormulario } from '../../../../utils/atenuarFormulario'
import { LabelText } from '../../../../components/labels/LabelText'
import { Select } from '../../../../components/select/Select'
import { MenuComun } from '../../../../components/menus/MenuComun'

export function NuevoPasajero ({ refModal: thisModal, onClose, onSuccess = () => {}, onFailure = () => {} }) {
  const fields = useRef({
    nombres: 'firstName',
    apellidos: 'lastName',
    numero: 'contact_number',
    corporacion: 'corporation_id'
  }).current

  const { crearPasajero } = usePasajeros()
  const { corporaciones, getCorporaciones } = useCorporacionesStore()

  useEffect(() => {
    getCorporaciones()
  }, [getCorporaciones])

  return (
    <ModalBase
      refModal={thisModal}
      onClose={onClose}
    >
      <form
        className='w-modalS h-[354px] max-h-[85dvh] gap-5 flex flex-col p-5 rounded-modal overflow-x-clip overflow-y-auto scroll-neutral'
        onSubmit={(e) => {
          e.preventDefault()

          if (!validarCampos(e.target)) return

          const data = new FormData(e.target)

          atenuarFormulario({ form: e.target })

          const body = Object.fromEntries(data)

          console.log({ body })

          crearPasajero({ body })
            .then(data => {
              alert('Pasajero creado con exito')
              onSuccess(data)
              thisModal.current.close()
            })
            .catch(err => {
              atenuarFormulario({ form: e.target, restore: true })
              onFailure(err)
              console.warn(err)
            })
        }}
        name='NuevoPasajero'
      >
        <fieldset>
          <span
            className='titulo-h4 text-azul-500'
          >
            Nuevo pasajero
          </span>
        </fieldset>

        <fieldset
          className='flex gap-m'
        >
          <LabelText
            label='Nombres'
            placeholder='Ingrese el nombre'
            name={fields.nombres}
            required
          />

          <LabelText
            label='Apellidos'
            placeholder='Ingrese los apellidos'
            name={fields.apellidos}
            required
          />
        </fieldset>

        <LabelText
          label='Número'
          placeholder='Ingrese el número'
          name={fields.numero}
          type='number'
          required
        />

        <LabelText
          label='Corporación'
        >
          <Select
            name={fields.corporacion}
            options={
              corporaciones
                .map(({ id, corporation_name: corporacion }) => ({ value: id, label: corporacion }))
            }
            maxVisibleOptions={1}
            visibleScroll
            placeholder='Seleccionar terminal'
          />
        </LabelText>

        <MenuComun
          handleCancel={() => thisModal.current.close()}
          cancelProps={{ type: 'button', className: 'w-[100px]' }}
          cancelName='Cancelar'
          confirmName='Guardar'
          confirmProps={{ type: 'submit', className: 'w-[160px]' }}
        />

      </form>
    </ModalBase>
  )
}
