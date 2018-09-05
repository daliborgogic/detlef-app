export const timeout = ms => new Promise(res => setTimeout(res, ms))
export const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
