import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api'
import { useRef } from 'react'
import { ENV } from '../../consts/env'
import { isEqual } from '../../utils/isEqual'

const libraries = ['places']

const mapContainerStyle = {
  minWidth: '200px',
  width: '100%',
  minHeight: '200px',
  maxWidth: '100%'
}

const defaultCenter = {
  lat: -12.005252715217381, // Plaza norte
  lng: -77.05459387221624 // Plaza norte
}

const options = {
  disableDefaultUI: true,
  zoomControl: true
}

export function MapaBase ({ mapsStyle = {}, mapsOptions = {}, center, zoom = 10, markerPosition, children }) {
  const GOOGLE_API_KEY = ENV.googleApiKey

  return (
    <LoadScript
      googleApiKey={GOOGLE_API_KEY}
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={{
          ...mapContainerStyle,
          ...mapsStyle
        }}
        zoom={zoom}
        center={center ?? defaultCenter}
        options={{ ...options, ...mapsOptions }}
      >
        {children}
        {
          markerPosition && (
            <Marker position={markerPosition} />
          )
        }
      </GoogleMap>
    </LoadScript>
  )
}

function LoadScript ({ googleApiKey, libraries, loader, children }) {
  const librariesRef = useRef(libraries)
  if (!isEqual(librariesRef.current, libraries)) {
    librariesRef.current = libraries
  }

  const { isLoaded } = useLoadScript({
    language: 'es-PE',
    googleMapsApiKey: googleApiKey,
    libraries: librariesRef.current
  })

  if (!isLoaded) {
    return loader || <div>Loading...</div>
  }

  return children
}
