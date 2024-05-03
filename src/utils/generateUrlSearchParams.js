export function generateUrlSearchParams (url, params) {
  const searchParams = new URLSearchParams()

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      searchParams.append(key, params[key])
    }
  }

  const resultSearchParams = searchParams.toString()
  const resultUrl = `${url}?${resultSearchParams}`

  return resultUrl
}
