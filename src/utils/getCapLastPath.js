export function getCapitalizedLastPath (pathname) {
  const listPath = (pathname || window.location.pathname).split('/')

  const lasPathname = listPath.reduceRight((acc, el) => acc.trim() || el.trim())

  const firstLetterToUpperCase = lasPathname.charAt(0).toUpperCase()
  const restOfLetters = lasPathname.slice(1)

  const finalPath = `${firstLetterToUpperCase}${restOfLetters}`

  return finalPath.replace(/-/g, ' ')
}
