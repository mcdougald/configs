/**
 * Formats a date using `Intl.DateTimeFormat` with sensible defaults.
 * @param {Date | number | string | undefined} date - The date to format. Returns an empty string when falsy or invalid.
 * @param {Intl.DateTimeFormatOptions} opts - Formatting options that override the defaults.
 * @returns {string} The formatted date string, or an empty string on invalid input.
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
