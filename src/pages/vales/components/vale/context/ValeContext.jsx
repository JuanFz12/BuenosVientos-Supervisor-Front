import { createContext, useState } from 'react'
import { initialValeState } from './storeValeContext'

export const ValeContext = createContext()

export function ValeProvider ({ children }) {
  const [valeState, setValeState] = useState(initialValeState)

  return (
    <ValeContext.Provider value={{ valeState, setValeState }}>
      {children}
    </ValeContext.Provider>
  )
}
