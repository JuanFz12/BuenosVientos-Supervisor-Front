export function parsearSoles (stringFormat) {
  return parseFloat(stringFormat.replace(/[^\d.]/g, '')) || 0
}
