import { noNumbersRegex } from '../consts/regex'

export function parsearSoles (stringFormat) {
  return parseFloat(stringFormat.replace(noNumbersRegex, '')) || 0
}
