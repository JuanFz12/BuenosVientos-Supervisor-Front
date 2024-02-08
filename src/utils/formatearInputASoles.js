import { formatearASoles } from './formatearASoles'
import { parsearSoles } from './parsearSoles'

export function formatearInputASoles ({ event, controlled = false }) {
  const { target } = event

  let value
  const valorParseado = parsearSoles(target.value)

  if (!valorParseado) return 0

  if (isNaN(Number(target.value.slice(-1)))) {
    return parsearSoles(target.ariaLabel)
  }

  // tal vez se pueda refactorizar esto
  if (target.value.length === 1) {
    // sirve para formatear el primer valor
    value = parseFloat(target.value) / 100
  } else if (target.value.length < target.ariaLabel.length) {
    // sirve para eliminar caracteres
    value = valorParseado / 10
  } else if (target.value.length > 1) {
    // sirve para seguir agregando numeros al input
    value = valorParseado * 10
  }

  if (value === 0) {
    target.ariaLabel = ''
  } else {
    target.ariaLabel = formatearASoles({ numero: value })
  }

  if (!controlled) {
    target.value = formatearASoles({ numero: value })
  }

  return value
}
