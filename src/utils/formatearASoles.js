export function formatearASoles ({ numero, cero = false }) {
  if (!numero && !cero) return ''

  return parseFloat(numero).toLocaleString('es-PE', {
    style: 'currency',
    currency: 'PEN',
    maximumFractionDigits: 2
  })
}
