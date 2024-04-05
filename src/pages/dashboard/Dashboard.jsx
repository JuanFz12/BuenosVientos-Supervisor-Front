import { useEffect } from 'react'
import fotoPerfil from '/src/assets/img/personaPerfil.jpeg'

import { useLayout } from '../../store/useLayout'
import { changeDocTitle, titlePages } from '../../consts/titlePage'
import { Resumen } from './components/resumen/Resumen'
import { TaxistasTop } from './components/taxistasTop/TaxistasTop'
import { IngresosDenominacion } from './components/ingresosDenominacion/IngresosDenominacion'
import { CarrerasAreasDashboard } from './components/carrerasAreas/CarrerasAreasDashboard'

export function Dashboard () {
  const { setDisplayHeader } = useLayout()

  useEffect(() => changeDocTitle(titlePages.dashboard), [])

  useEffect(() => {
    setDisplayHeader(false)

    return () => setDisplayHeader(true)
  }, [setDisplayHeader])

  const taxistasInfo = Array(5).fill(null).map((_, index) => ({
    id: index + 1,
    foto: fotoPerfil,
    nombreCompleto: 'Nombre Nombre Apellido',
    carreras: 10,
    ganancia: 1000
  }))

  return (
    <main
      className='flex flex-col gap-8'
    >
      <section
        className='w-full flex flex-wrap justify-center gap-8'
      >
        {/* resumen */}
        <Resumen
          className='flex-1 '
        />

        {/* taxistas top */}
        <TaxistasTop
          className='flex-1'
          taxistas={taxistasInfo}
        />
      </section>

      <section
        className='w-full flex flex-wrap justify-center gap-8'
      >

        {/* Ingresos por denominacion */}
        <IngresosDenominacion
          className='flex-[1.5]'
        />

        {/* Carreras por zonas */}
        <CarrerasAreasDashboard
          className='flex-1'
        />

      </section>

    </main>
  )
}
