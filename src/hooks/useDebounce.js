import { useRef } from 'react'

export function useDebounce (fnToExecute, delay = 350) {
  const debounceTimer = useRef(null)

  return function (...args) {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      fnToExecute(...args)
    }, [delay])
  }
}
