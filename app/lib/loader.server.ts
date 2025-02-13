export const logLoader = (message: string) => {
  return import.meta.env.DEV && console.log(`Loader: ${message}\n`)
}
