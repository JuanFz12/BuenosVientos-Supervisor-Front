export function formatearFechaCorta (date) {
  const fecha = new Date(date)

  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }

  return fecha.toLocaleDateString('es-PE', options)
}

export function formatearFechaLarga (date) {
  const fecha = new Date(date)

  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }

  return fecha.toLocaleDateString('es-PE', options)
}
