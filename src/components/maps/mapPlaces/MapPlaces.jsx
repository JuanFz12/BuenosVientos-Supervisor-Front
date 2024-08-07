import { useRef, useState } from 'react'
import { MapaBase } from '../MapaBase'
import { Autocomplete } from '@react-google-maps/api'
import './MapStyle.css'

export function MapPlaces ({ mapsStyle, mapsOptions, defaultCenter, zoom = 10, inputStyle = {}, inputClassName = '', value, onChange = (event) => {}, onPlaceChanged = ({ self, place, lat, lng }) => {}, onDeselectPlace = ({ lat, lng }) => {}, children }) {
  const [selectedPlace, setSelectedPlace] = useState(defaultCenter)

  const autocompleteRef = useRef(null)

  function onLoadAutocomplete (autocomplete) {
    autocompleteRef.current = autocomplete
  }

  function onPlaceChangedLocal () {
    const autocomplete = autocompleteRef.current
    if (autocomplete === null) return

    const place = autocomplete.getPlace()

    const lat = place.geometry.location.lat()
    const lng = place.geometry.location.lng()

    setSelectedPlace({
      lat,
      lng
    })

    onPlaceChanged({ self: autocomplete, place, lat, lng })
  }

  return (
    <MapaBase
      center={selectedPlace}
      mapsStyle={mapsStyle}
      mapsOptions={mapsOptions}
      zoom={zoom}
      markerPosition={selectedPlace}
    >
      <Autocomplete
        onLoad={onLoadAutocomplete}
        onPlaceChanged={onPlaceChangedLocal}
      >
        <input
          type='text'
          value={value}
          placeholder='Busca un lugar'
          className={`w-[min(320px,90%)] border border-gray-400 text-sm leading-4 text-textoPrincipal outline-none py-3 px-5 rounded-full shadow-lg absolute top-5 left-1/2 -translate-x-1/2 ${inputClassName}`}
          style={{ ...inputStyle }}
          onChange={e => {
            if (e.target.value === '') {
              setSelectedPlace(null)
              onDeselectPlace({ lat: selectedPlace?.lat, lng: selectedPlace?.lng })
            }

            onChange(e)
          }}
        />
      </Autocomplete>

      {children}
    </MapaBase>
  )
}
