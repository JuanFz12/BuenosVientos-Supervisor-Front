import { noNumbersRegex } from '../consts/regex'

export function getNumbers (string, asString = false, returnNull = false) {
  const returnIfVoid = returnNull ? null : asString ? '0' : 0

  if (typeof string === 'number') return string // si es un numero retornarlo directamente

  if (!string) return returnIfVoid

  const numbers = string.replace(noNumbersRegex, '') // remplaza todo lo que no sea un numero por un ''

  if (numbers === '') return returnIfVoid

  return asString ? numbers : parseInt(numbers)
}
