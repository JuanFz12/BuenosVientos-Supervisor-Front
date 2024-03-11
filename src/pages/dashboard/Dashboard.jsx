import { useEffect } from 'react'
import { changeDocTitle, titlePages } from '../../consts/titlePage'

export function Dashboard () {
  useEffect(() => changeDocTitle(titlePages.dashboard), [])

  return (
    <main>
      Dashboard
    </main>
  )
}
