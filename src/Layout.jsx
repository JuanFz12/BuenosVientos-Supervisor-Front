import { Outlet } from 'react-router-dom'
import { MenuSupervisor } from './components/MenuSupervisor'
import { HeaderSupervisor } from './components/header/HeaderSupervisor'
import { useLayout } from './store/useLayout'

export function Layout ({ children }) {
  const { displayHeader, titulo, backTo } = useLayout()

  return (
    <section
      tabIndex={0}
      className='flex max-w-full overflow-clip outline-none'
    >
      <MenuSupervisor />
      <section
        className='flex-1 min-w-px bg-neutrales-200 min-h-svh p-8'
      >
        {displayHeader && <HeaderSupervisor title={titulo} backTo={backTo} />}
        <section
          className={`w-full ${displayHeader ? 'pt-8' : ''}`}
        >
          {children || <Outlet />}
        </section>
      </section>
    </section>
  )
}
