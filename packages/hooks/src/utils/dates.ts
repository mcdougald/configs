/**
 *
 * @param date
 * @param opts
 */
export function formatDate(date: Date | number | string | undefined, opts: Intl.DateTimeFormatOptions = {}) {
  if (!date) return ''

  try {
    return new Intl.DateTimeFormat('en-US', {
      month: opts.month ?? 'long',
      day: opts.day ?? 'numeric',
      year: opts.year ?? 'numeric',
      ...opts
    }).format(new Date(date))
  } catch {
    return ''
  }
}
