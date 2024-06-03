function createIdGenerator () {
  let currentId = 0

  return function generateId () {
    currentId++
    return { id: currentId }
  }
}

// Crear una instancia del generador de IDs
export const generateId = createIdGenerator()
