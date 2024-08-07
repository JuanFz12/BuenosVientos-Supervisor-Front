import { useEffect, useRef } from 'react'
import { MapPlaces } from '../maps/mapPlaces/MapPlaces'
import { ModalBase } from './ModalBase'

export function ModalMapsPlaces ({ refModal: thisModal, onClose, value, onChange, onPlaceChanged, onDeselectPlace, title, mapsChildren, ...props }) {
  const containerRef = useRef(null)

  useEffect(() => {
    // let cleanFn = () => {}

    setTimeout(() => {
      const autocompleteResults = document.querySelector('#root ~ .pac-container')

      if (!autocompleteResults) {
        // alert('No se pudo cargar los resultados a tiempo: Google Maps') // Solo para producción, en desarrollo se pierde tiempo
        // Si en 2s no encuentra la caja de resultados del autocomplete, se recarga la página para reintentarlo
        // window.location.reload() // Solo para producción, en desarrollo se pierde tiempo
        return
      }

      const container = containerRef.current

      if (!autocompleteResults || !container) return

      const className = '!top-20 !left-1/2 !-translate-x-1/2'.split(' ')

      autocompleteResults.classList.add(...className)
      container.appendChild(autocompleteResults)

      // cleanFn = () => {
      //   resultsBox.classList.remove(...className)
      //   container.removeChild(resultsBox)

      //   document.body.appendChild(resultsBox)
      // }
    }, 2000) // Darle tiempo para que se monte primero el componente MapPlaces y el contenedor
    // Creo que no es necesario una función de limpieza porque parece que funciona bien sin ella de momento

    // return cleanFn
  }, [])

  return (
    <ModalBase
      {...props}
      preventRemount
      refModal={thisModal}
      onClose={onClose}
    >
      {
        title && (
          <header
            className='p-5 pb-0'
          >
            <h4
              className='titulo-h4 text-azul-500'
            >
              {title}
            </h4>
          </header>
        )
      }
      <section
        ref={containerRef}
        className='relative size-[640px] max-h-[85dvh] gap-5 flex flex-col p-5 rounded-modal overflow-x-clip overflow-y-auto scroll-neutral'
      >
        <MapPlaces
          value={value}
          onChange={onChange}
          onPlaceChanged={onPlaceChanged}
          onDeselectPlace={onDeselectPlace}
          mapsStyle={{
            height: 'min(500px, 85%)',
            borderRadius: '30px'
          }}
        >
          {mapsChildren}
        </MapPlaces>

        <button
          className='boton-terciario-marca mt-auto w-[160px] self-center'
          type='button'
          onClick={() => thisModal.current.close()}
        >
          Cerrar
        </button>
      </section>
    </ModalBase>
  )
}
