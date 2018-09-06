export const timeout = ms => new Promise(res => setTimeout(res, ms))
export const isDev = () => process.env.NODE_ENV === 'development'
