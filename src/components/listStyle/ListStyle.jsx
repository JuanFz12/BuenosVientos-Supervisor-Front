export function ListStyle ({ children, ...props }) {
  return (
    <ul
      {...props}
      className={`bg-white text-textoPrincipal flex items-center gap-3 ${props.className || ''}`}
    >
      {children}
    </ul>
  )
}
