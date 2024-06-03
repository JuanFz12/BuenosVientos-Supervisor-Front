import { useRef } from 'react'
import { MenuComun } from '../../../../../components/menus/MenuComun'
import { ModalBase } from '../../../../../components/modales/ModalBase'
import { parsearSoles } from '../../../../../utils/parsearSoles'
import { useUsuarioSupervisor } from '../../../../../store/useUsuarioSupervisor'
import { atenuarFormulario } from '../../../../../utils/atenuarFormulario'
import { useTaxistas } from '../../../../../store/taxistas/useTaxistas'
import { useVehiculos } from '../../../../../store/vehiculos/useVehiculos'
import { PasajerosModal } from '../PasajerosModal'
import { useValesStore } from '../../../../../store/vales/useValesStore'
import { fields } from '../../../consts/vales'
import { PrimeraParteVale } from '../../vale/PrimeraParte'
import { SegundaParteVale } from '../../vale/SegundaParte'
import { useVales } from '../../vale/hooks/useVales'
import { ValeProvider } from '../../vale/context/ValeContext'
import { SelectTaxista } from '../../vale/SelectTaxista'

export function NuevoVale ({ refModal, onClose }) {
  return (
    <ValeProvider>
      <NuevoValeManager
        refModal={refModal}
        onClose={onClose}
      />
    </ValeProvider>
  )
}

function NuevoValeManager ({ refModal: thisModal, onClose }) {
  const {
    usuarioSupervisor: {
      id: supervisorId
    }
  } = useUsuarioSupervisor()

  const pasajerosModalRef = useRef()

  const { vehiculos } = useVehiculos()

  // TAXISTA
  const { taxistas } = useTaxistas()

  const { crearVale } = useValesStore()

  const {
    resetValeState,
    vehiculoId,
    isCarga,
    isExtraCarga,
    pasajerosSelected,
    setPasajerosSelected
  } = useVales()

  return (
    <>
      <ModalBase
        refModal={thisModal}
        onClose={e => {
          resetValeState()

          onClose && onClose(e)
        }}
      >
        <form
          // en un ideal el alto deberia ser de 804px
          className='w-[640px] h-fit max-h-[85dvh] gap-5 flex flex-col p-5 rounded-[32px] overflow-x-clip overflow-y-auto scroll-neutral'
          onSubmit={e => {
            e.preventDefault()
            const formData = new FormData(e.target)

            if (!pasajerosSelected.length) return alert('Debe agregar al menos un pasajero')

            for (const [key, value] of formData) {
              if (key === fields.peaje) continue
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

            if (isCarga) {
              formData.append(fields.carga, true)
            } else if (isExtraCarga) {
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
            body[fields.peaje] = !body[fields.peaje] ? '0' : parsearSoles(body[fields.peaje]).toString()
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
            {/* Primera parte */}
            <PrimeraParteVale
              vehiculos={vehiculos}
              pasajerosModalRef={pasajerosModalRef}
            />

            <hr
              className='w-px h-full border-l border-bordesSeparador'
            />

            {/* Segunda parte */}
            <SegundaParteVale />
          </fieldset>

          {/* realizar un buscador en tiempo real para buscar taxistas y seleccionarlos. UPDATE --> ya se hizo pero verificar si todo funciona bien */}
          <SelectTaxista
            vehiculoId={vehiculoId}
            taxistas={taxistas}
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

      <PasajerosModal
        key={vehiculoId}
        refModal={pasajerosModalRef}
        pasajerosSelected={pasajerosSelected}
        actualizarPasajerosSelected={setPasajerosSelected}
        vehiculoId={vehiculoId}
      />
    </>
  )
}
