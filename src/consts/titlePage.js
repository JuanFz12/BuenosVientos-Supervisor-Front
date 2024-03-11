const title = 'Buenos Vientos'

const getTitle = (add) => {
  if (!add) return title
  return `${title} | ${add}`
}

export function changeDocTitle (newTitle) {
  const currentDocTitle = document.title

  document.title = newTitle

  return () => (document.title = currentDocTitle)
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
