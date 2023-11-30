
export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParametersRegex, "(?<$1>[a-z0-9\-_]+)")
    // console.log(Array.from(path.matchAll(routeParametersRegex)))
    // console.log(pathWithParams)
    // const teste = /\/users\/([a-z0-9-_]+)/
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

    return pathRegex
}