import { create } from 'zustand'

export const useLayout = create(set => {
  function setDisplayHeader (boolean) {
    set({ displayHeader: boolean })
  }

  function setTitle (title) {
    set({ title })
  }

  function setBackTo (backTo) {
    set({ backTo })
  }

  return {
    displayHeader: true,
    title: undefined,
    backTo: undefined,

    setDisplayHeader,
    setTitle,
    setBackTo
  }
})
