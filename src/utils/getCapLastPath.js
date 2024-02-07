export function getCapitalizedLastPath (pathname) {
  const path = (pathname || window.location.pathname)
    .split('/')

  const lasPathname = path.pop()

  const firstLetterUpper = lasPathname.charAt(0).toUpperCase()
  const restLetters = lasPathname.slice(1)

  const result = `${firstLetterUpper}${restLetters}`.replace(/-/g, ' ')

  return result
}
