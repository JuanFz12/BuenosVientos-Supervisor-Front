import { create } from 'zustand'

export const useLayout = create(set => {
  function setDisplayHeader(boolean) {
    set({ displayHeader: boolean })
  }

  function setTitulo(titulo) {
    set({ titulo })
  }

  function setBackTo(backTo) {
    set({ backTo })
  }

  return {
    displayHeader: true,
    titulo: undefined,
    backTo: undefined,

    setDisplayHeader,
    setTitulo,
    setBackTo
  }
})
