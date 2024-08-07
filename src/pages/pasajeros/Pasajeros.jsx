import { useRef } from 'react'
import { Buscador } from '../../components/buscador/Buscador'
import { NuevoPasajero } from './components/modales/NuevoPasajero'
import { RenderPasajeros } from './components/RenderPasajeros'

export function Pasajeros() {
  return (
    <main>
      <Header />
      <RenderPasajeros />
    </main>
  )
}

function Header() {
  const nuevoPasajeroModalRef = useRef()

  return (
    <header className="flex justify-between mb-8 flex-wrap gap-8">
      <menu className="flex flex-wrap gap-5 items-center">
        <li>
          <NuevoPasajero refModal={nuevoPasajeroModalRef} />

          <button
            type="button"
            onClick={() => nuevoPasajeroModalRef.current.showModal()}
            className="boton-primario-verde w-[200px]"
          >
            Nuevo pasajero
          </button>
        </li>
      </menu>

      <Buscador labelClass="flex-1 max-w-[420px]" className="w-full" />
    </header>
  )
}
