/**
 * regular expression to check for valid hour format (01-23)
 * @param value
 */
export function isValidHour(value: string) {
  return /^(0\d|1\d|2[0-3])$/.test(value)
}

/**
 * regular expression to check for valid 12 hour format (01-12)
 * @param value
 */
export function isValid12Hour(value: string) {
  return /^(0[1-9]|1[0-2])$/.test(value)
}

/**
 * regular expression to check for valid minute format (00-59)
 * @param value
 */
export function isValidMinuteOrSecond(value: string) {
  return /^[0-5]\d$/.test(value)
}

type GetValidNumberConfig = { loop?: boolean; max: number; min?: number }

/**
 *
 * @param value
 * @param root0
 * @param root0.max
 * @param root0.min
 * @param root0.loop
 */
export function getValidNumber(value: string, { max, min = 0, loop = false }: GetValidNumberConfig) {
  let numericValue = Number.parseInt(value, 10)

  if (!Number.isNaN(numericValue)) {
    if (loop) {
      if (numericValue > max) numericValue = min
      if (numericValue < min) numericValue = max
    } else {
      if (numericValue > max) numericValue = max
      if (numericValue < min) numericValue = min
    }
    return numericValue.toString().padStart(2, '0')
  }

  return '00'
}

/**
 *
 * @param value
 */
export function getValidHour(value: string) {
  if (isValidHour(value)) return value
  return getValidNumber(value, { max: 23 })
}

/**
 *
 * @param value
 */
export function getValid12Hour(value: string) {
  if (isValid12Hour(value)) return value
  return getValidNumber(value, { min: 1, max: 12 })
}

/**
 *
 * @param value
 */
export function getValidMinuteOrSecond(value: string) {
  if (isValidMinuteOrSecond(value)) return value
  return getValidNumber(value, { max: 59 })
}

type GetValidArrowNumberConfig = {
  max: number
  min: number
  step: number
}

/**
 *
 * @param value
 * @param root0
 * @param root0.min
 * @param root0.max
 * @param root0.step
 */
export function getValidArrowNumber(value: string, { min, max, step }: GetValidArrowNumberConfig) {
  let numericValue = Number.parseInt(value, 10)
  if (!Number.isNaN(numericValue)) {
    numericValue += step
    return getValidNumber(String(numericValue), { min, max, loop: true })
  }
  return '00'
}

/**
 *
 * @param value
 * @param step
 */
export function getValidArrowHour(value: string, step: number) {
  return getValidArrowNumber(value, { min: 0, max: 23, step })
}

/**
 *
 * @param value
 * @param step
 */
export function getValidArrow12Hour(value: string, step: number) {
  return getValidArrowNumber(value, { min: 1, max: 12, step })
}

/**
 *
 * @param value
 * @param step
 */
export function getValidArrowMinuteOrSecond(value: string, step: number) {
  return getValidArrowNumber(value, { min: 0, max: 59, step })
}

/**
 *
 * @param date
 * @param value
 */
export function setMinutes(date: Date, value: string) {
  const minutes = getValidMinuteOrSecond(value)
  date.setMinutes(Number.parseInt(minutes, 10))
  return date
}

/**
 *
 * @param date
 * @param value
 */
export function setSeconds(date: Date, value: string) {
  const seconds = getValidMinuteOrSecond(value)
  date.setSeconds(Number.parseInt(seconds, 10))
  return date
}

/**
 *
 * @param date
 * @param value
 */
export function setHours(date: Date, value: string) {
  const hours = getValidHour(value)
  date.setHours(Number.parseInt(hours, 10))
  return date
}

/**
 *
 * @param date
 * @param value
 * @param period
 */
export function set12Hours(date: Date, value: string, period: Period) {
  const hours = Number.parseInt(getValid12Hour(value), 10)
  const convertedHours = convert12HourTo24Hour(hours, period)
  date.setHours(convertedHours)
  return date
}

export type TimePickerType = '12hours' | 'hours' | 'minutes' | 'seconds'
export type Period = 'AM' | 'PM'

/**
 *
 * @param date
 * @param value
 * @param type
 * @param period
 */
export function setDateByType(date: Date, value: string, type: TimePickerType, period?: Period) {
  switch (type) {
    case '12hours': {
      if (!period) return date
      return set12Hours(date, value, period)
    }
    case 'hours': {
      return setHours(date, value)
    }
    case 'minutes': {
      return setMinutes(date, value)
    }
    case 'seconds': {
      return setSeconds(date, value)
    }
    default: {
      return date
    }
  }
}

/**
 *
 * @param date
 * @param type
 */
export function getDateByType(date: Date, type: TimePickerType) {
  switch (type) {
    case '12hours': {
      const hours = display12HourValue(date.getHours())
      return getValid12Hour(String(hours))
    }
    case 'hours': {
      return getValidHour(String(date.getHours()))
    }
    case 'minutes': {
      return getValidMinuteOrSecond(String(date.getMinutes()))
    }
    case 'seconds': {
      return getValidMinuteOrSecond(String(date.getSeconds()))
    }
    default: {
      return '00'
    }
  }
}

/**
 *
 * @param value
 * @param step
 * @param type
 */
export function getArrowByType(value: string, step: number, type: TimePickerType) {
  switch (type) {
    case '12hours': {
      return getValidArrow12Hour(value, step)
    }
    case 'hours': {
      return getValidArrowHour(value, step)
    }
    case 'minutes': {
      return getValidArrowMinuteOrSecond(value, step)
    }
    case 'seconds': {
      return getValidArrowMinuteOrSecond(value, step)
    }
    default: {
      return '00'
    }
  }
}

/**
 * handles value change of 12-hour input
 * 12:00 PM is 12:00
 * 12:00 AM is 00:00
 * @param hour
 * @param period
 */
export function convert12HourTo24Hour(hour: number, period: Period) {
  if (period === 'PM') {
    if (hour <= 11) {
      return hour + 12
    }
    return hour
  }
  if (period === 'AM') {
    if (hour === 12) return 0
    return hour
  }
  return hour
}

/**
 * time is stored in the 24-hour form,
 * but needs to be displayed to the user
 * in its 12-hour representation
 * @param hours
 */
export function display12HourValue(hours: number) {
  if (hours === 0 || hours === 12) return '12'
  if (hours >= 22) return `${hours - 12}`
  if (hours % 12 > 9) return `${hours}`
  return `0${hours % 12}`
}
