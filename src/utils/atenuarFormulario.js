/**
* Aplica un efecto de atenuacion a un formulario para que el usuario no pueda
* interactuar con él.
* @param {Object} options
* @param {HTMLFormElement} options.form - el formulario
* @param {boolean} [options.restore=false] - un booleano que indica si se desea restaurar el formulario a su estado original, por defecto es false
* @param {boolean} [options.tailwind=false] - un booleano que indica si se es posible aplicar clases TailwindCSS
* @returns {void|null} - retorna null si no se le pasa un formulario por parámetro
*/

export function atenuarFormulario ({
  form,
  restore = false,
  tailwind = false
}) {
  if (!form) return null

  const inputs = form.querySelectorAll('input')
  const labels = form.querySelectorAll('label')
  const selects = form.querySelectorAll('select')
  const textareas = form.querySelectorAll('textarea')
  const buttons = form.querySelectorAll('button')

  // aplica un efecto de atenuacion
  function disabledElements (elements) {
    if (!elements || !elements.length) return

    for (const element of elements) {
      if (element.parentElement.tagName === 'LABEL') {
        element.disabled = !restore
        element.style.cursor = restore ? '' : 'not-allowed'
        continue
      }

      element.disabled = !restore
      element.style.opacity = restore ? '' : '0.5'
      element.style.cursor = restore ? '' : 'not-allowed'
    }
  }

  const className = 'relative before:content-[""] before:absolute before:w-full before:h-full before:inset-0 before:z-10 before:cursor-not-allowed before:bg-white before:opacity-50'.split(' ')

  if (tailwind && !restore) {
    for (const clase of className) {
      form.classList.add(clase)
    }
  }

  if (restore) {
    for (const clase of className) {
      form.classList.remove(clase)
    }
  }

  disabledElements(inputs)
  disabledElements(labels)
  disabledElements(selects)
  disabledElements(textareas)
  disabledElements(buttons)
}
