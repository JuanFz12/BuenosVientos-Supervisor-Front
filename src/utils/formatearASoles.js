export function formatearASoles ({ numero, cero = false }) {
  const nFormat = parseFloat(numero)
  if (!numero && !cero) return ''

  return nFormat.toLocaleString('es-PE', {
    style: 'currency',
    currency: 'PEN',
    maximumFractionDigits: 2
  })
}
