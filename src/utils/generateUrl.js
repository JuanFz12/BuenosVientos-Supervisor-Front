export function generateUrl (pattern, params) {
  let generatedUrl = pattern

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key]
      generatedUrl = generatedUrl.replace(`:${key}`, value)
    }
  }

  return generatedUrl
}
