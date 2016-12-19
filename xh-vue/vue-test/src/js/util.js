export function isType (obj, type) {
  return Object.prototype.toString.call(obj) === '[object' + type + ']'
}

export function isArray (arr) {
  return isType(arr, 'Array')
}
