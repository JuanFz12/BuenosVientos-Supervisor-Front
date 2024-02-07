export function Check ({ color = 'black', ...props }) {
  return (
    <svg
      {...props} xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'
    >
      <path d='M11.6668 3.5L5.25016 9.91667L2.3335 7' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}
