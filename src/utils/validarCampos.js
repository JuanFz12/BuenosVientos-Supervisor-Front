// Solo sirve para inputs que no sean checkbox

export function validarCampos (form) {
  const data = new FormData(form)

  for (const [key, value] of data) {
    if (value === '' || (value instanceof File && !value.size)) {
      alert(`Falta rellenar el campo: ${key}`)
      return false
    }
  }

  return true
}
