export function isEqual (arg1, arg2) {
  if (arg1 instanceof Array && arg2 instanceof Array) {
    if (arg1.length !== arg2.length) return false

    if (!arg1 || !arg2) return false

    const compare1 = JSON.stringify(arg1)
    const compare2 = JSON.stringify(arg2)

    return compare1 === compare2
  }

  // esto esta mal ya que todos heredan el tipo object, pero bueno de mientras asi no mas
  if (typeof arg1 === 'object' && typeof arg2 === 'object') {
    const compare1 = JSON.stringify(arg1)
    const compare2 = JSON.stringify(arg2)

    return compare1 === compare2
  }

  return false
}
