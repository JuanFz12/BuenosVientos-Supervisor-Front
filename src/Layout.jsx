import { Outlet } from 'react-router-dom'
import { MenuSupervisor } from './components/MenuSupervisor'
import { HeaderSupervisor } from './components/header/HeaderSupervisor'

export function Layout ({ children, displayHeader = true, title, backTo }) {
  return (
    <section
      className='flex'
    >
      <MenuSupervisor />
      <section
        className='flex-1 bg-neutrales-200 min-h-svh p-8'
      >
        {/* arreglar y colocar el estado todo dentro del aside - MenuSupervisor */}
        {displayHeader && <HeaderSupervisor title={title} backTo={backTo} />}
        <div
          className='w-full pt-8'
        >
          {children || <Outlet />}
        </div>
      </section>
    </section>
  )
}
