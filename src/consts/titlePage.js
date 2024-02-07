const title = 'Buenos Vientos'

const getTitle = (add) => {
  if (!add) return title
  return `${add} | ${title}`
}

export const titlePages = {
  home: getTitle(''),
  dashboard: getTitle('Dashboard'),
  taxistas: getTitle('Taxistas'),
  carreras: getTitle('Carreras'),
  vales: getTitle('Vales'),
  asistencias: getTitle('Asistencias'),
  exoneraciones: getTitle('Exoneraciones'),
  pagos: getTitle('Pagos')
}
