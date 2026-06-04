/**
 *
 * @param url
 * @param pathname
 * @param nested
 */
export function isActive(url: string, pathname: string, nested = true): boolean {
  return url === pathname || (nested && pathname.startsWith(`${url}/`))
}
