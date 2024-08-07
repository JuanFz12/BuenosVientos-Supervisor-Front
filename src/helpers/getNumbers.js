import { noNumbersRegex } from '../consts/regex'

/**
 * @description: Función para obtener todos los números de una cadena y devolver un solo numero
 */
export function getNumbers ({ string, asString = false, returnNull = false, fixed }) {
  const returnIfVoid = returnNull ? null : asString ? '0' : 0

  // si es un numero y no tiene fixed, retornarlo directamente
  if (typeof string === 'number' && isNaN(fixed)) return string

  if (!string) return returnIfVoid

  const stringToParse = string.toString()
  const numbers = stringToParse.replace(noNumbersRegex, '') // remplaza todo lo que no sea un numero por un ''

  if (numbers === '') return returnIfVoid

  // Luego debería refactorizar
  if (asString) {
    if (isNaN(fixed)) return numbers

    return parseFloat(numbers).toFixed(fixed)
  } else {
    if (isNaN(fixed)) return parseFloat(numbers)

    return parseFloat(parseFloat(numbers).toFixed(fixed))
  }
}
