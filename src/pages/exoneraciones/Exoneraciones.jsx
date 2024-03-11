import { useEffect } from 'react'
import { Buscador } from '../../components/buscador/Buscador'
import { changeDocTitle, titlePages } from '../../consts/titlePage'

export function Exoneraciones () {
  useEffect(() => changeDocTitle(titlePages.exoneraciones), [])

  return (
    <main>
      <Header />
      exoneraciones
    </main>
  )
}

function Header () {
  return (
    <header
      className='w-full flex min-h-9 items-center justify-end mb-8'
    >
      <section
        className='flex flex-wrap items-center gap-5'
      >
        <button
          onClick={() => alert('en construccion')}
          className='w-10 h-9 rounded-lg bg-rojoMarca-100 p-[10px] flex justify-center'
        >
          {/* <Filtros fill='#E43530' /> */}
        </button>

        <Buscador />
      </section>
    </header>
  )
}
