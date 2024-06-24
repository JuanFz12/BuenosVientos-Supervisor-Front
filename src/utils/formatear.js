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

export function formatearHoraCorta (date) {
  const hora = new Date(date)

  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }

  return hora.toLocaleTimeString('es-PE', options)
}

export function formatearHoraLarga (date) {
  const hora = new Date(date)

  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }

  return hora.toLocaleTimeString('es-PE', options)
}
