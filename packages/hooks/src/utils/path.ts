/**
 * Split path into segments, trailing/leading slashes are removed
 * @param {string} path - The path to split.
 * @returns {string[]} The non-empty path segments.
 */
export function splitPath(path: string): string[] {
  return path.split('/').filter((p) => p.length > 0)
}

/**
 * Resolve paths, slashes within the path will be ignored
 * @param {string} from - Path to resolve from.
 * @param {string} join - Path to resolve.
 * @returns {string} The resolved path.
 * @example
 * ```
 * ['a','b'] // 'a/b'
 * ['/a'] // 'a'
 * ['a', '/b'] // 'a/b'
 * ['a', '../b/c'] // 'b/c'
 * ```
 */
export function resolvePath(from: string, join: string): string {
  const v1 = splitPath(from),
    v2 = splitPath(join)

  while (v2.length > 0) {
    const segment = v2[0]
    switch (segment) {
      case '.': {
        break
      }
      case '..': {
        v1.pop()
        break
      }
      default: {
        if (segment !== undefined) {
          v1.push(segment)
        }
      }
    }

    v2.shift()
  }

  return v1.join('/')
}

/**
 * Converts Windows-style backslashes to forward slashes, leaving extended-length paths untouched.
 * @param {string} path - The path to normalize.
 * @returns {string} The path with backslashes replaced by forward slashes.
 */
export function slash(path: string): string {
  const isExtendedLengthPath = path.startsWith('\\\\?\\')

  if (isExtendedLengthPath) {
    return path
  }

  return path.replaceAll('\\', '/')
}
