export function DetalleAreaDashboard ({ terminal }) {
  const zonasMock = Array(6).fill(null).map((_, index) => ({
    id: index + 1,
    zona: `Área ${index + 1}`,
    carreras: 10 * index
  }))

  return (
    <ul
      className='flex flex-col w-full gap-l h-[200px] pr-1 overflow-x-hidden overflow-y-auto scroll-neutral'
    >
      {
        // dependiendo del terminal se listaran las zonas, para eso aqui se debe hacer un llamado al endpoint de las zonas
        zonasMock.map(({ id, zona, carreras }) => (
          <li
            key={id}
            className='flex items-center gap-2 h-[26px] max-w-full'
          >
            <strong
              className='block w-[103px] truncate text-nowrap texto-regular-l text-base'
            >
              {zona}
            </strong>

            {/* arreglar luego con los porcentajes reales y verificar el ancho respetcto al ancho del numero de carreras, ejem: 1000 ocupa mas width que 100 */}
            <div
              className='flex-1 flex gap-2 items-center h-full'
            >
              <span
                style={{ width: '100%' }}
                className='block h-full bg-dashboardGraficoColor1 rounded-componentes'
              />

              <strong
                className='texto-semi-bold-l'
              >
                {carreras}
              </strong>
            </div>
          </li>
        ))
      }
    </ul>
  )
}
