/**
 * Creates a debounced version of a function that delays invoking `fn` until
 * after `ms` milliseconds have elapsed since the last call.
 * @param {(args: A) => R} fn - The function to debounce.
 * @param {number} ms - The number of milliseconds to delay invocation.
 * @returns {[(args: A) => Promise<R>, () => void]} A tuple of the debounced
 * function (resolving with the result of `fn`) and a teardown function that
 * cancels any pending invocation.
 */
function debounce<A = unknown, R = void>(fn: (args: A) => R, ms: number): [(args: A) => Promise<R>, () => void] {
  let timer: NodeJS.Timeout | undefined

  const debouncedFunc = (args: A): Promise<R> =>
    new Promise((resolve) => {
      if (timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(() => {
        resolve(fn(args))
      }, ms)
    })

  const teardown = () => {
    clearTimeout(timer)
  }

  return [debouncedFunc, teardown]
}
export { debounce }
