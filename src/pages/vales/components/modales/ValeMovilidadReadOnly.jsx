import { useRef } from 'react'
import { ModalBase } from '../../../../components/modales/ModalBase'
import { PasajerosModalReadOnly } from './PasajerosModalReadOnly'
import { SelectTaxista } from '../vale/SelectTaxista'
import { PrimeraParteRO } from '../valeReadOnly/PrimeraParteRO'
import { SegundaParteRO } from '../valeReadOnly/SegundaParteRO'

export function ValeMovilidadReadOnly ({
  refModal: thisModal,
  data,
  onClose
}) {
  const selectData = data || {}

  const pasajeros = selectData.requestVale?.passengers
  const taxista = selectData.driver?.fullName
  const pagoTaxista = selectData.submitVale?.payment_to_driver

  // Pasajeros
  const pasajerosModalRef = useRef()

  return (
    <>
      <ModalBase
        refModal={thisModal}
        onClose={onClose}
      >
        <section
          // en un ideal el alto deberia ser de 804px
          className='w-[640px] h-fit max-h-[85dvh] gap-5 flex flex-col p-5 rounded-[32px] overflow-x-clip overflow-y-auto scroll-neutral'
        >
          <header>
            <h4 className='titulo-h4 text-azul-500'>Vale de movilidad</h4>
          </header>

          {/* En un ideal el alto deberia ser de 584px */}
          <fieldset className='flex gap-5 h-fit justify-between'>
            {/* Primera parte */}
            <PrimeraParteRO
              pasajerosModalRef={pasajerosModalRef}
              data={data}
            />

            <hr className='w-px h-full border-l border-bordesSeparador' />

            {/* Segunda parte */}
            <SegundaParteRO
              data={data}
            />
          </fieldset>

          <SelectTaxista
            readOnly
            defaultValue={taxista}
            pagoTaxista={pagoTaxista}
          />

          <button
            className='boton-terciario-marca w-[100px] self-end'
            type='button'
            onClick={() => thisModal.current.close()}
          >
            Cerrar
          </button>

        </section>
      </ModalBase>

      <PasajerosModalReadOnly
        refModal={pasajerosModalRef}
        pasajeros={pasajeros}
      />
    </>
  )
}
