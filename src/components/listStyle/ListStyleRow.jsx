import { ListStyle } from './ListStyle'

export function ListStyleRow ({ children, className = '', ...props }) {
  return (
    <ListStyle
      {...props}
      className={`py-3 px-6 text-sm font-normal [&>li]:truncate [&>li]:text-nowrap leading-4 flex-wrap flex-1 lg:flex-grow-0 w-full min-h-[72px] ${className}`}
    >
      {children}
    </ListStyle>
  )
}
