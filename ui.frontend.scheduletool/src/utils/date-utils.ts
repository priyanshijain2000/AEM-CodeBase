import { DateOption } from '../types'

import { addMonths, format, parse } from 'date-fns'

export const parseDateToDateOption = (date: Date): DateOption => {
  const subsequentMonth = addMonths(date, 1)
  return {
    value: format(date, 'yyyy-MM'),
    label: `${format(date, 'MMM yyyy')} - ${format(subsequentMonth, 'MMM yyyy')}`,
    description: `from ${format(date, 'MMMM')} to ${format(subsequentMonth, 'MMMM')}`,
  }
}
export const parseDateOptionToDate = (date: DateOption): Date => parse(date.value, 'yyyy-MM', new Date())

export const timezoneFormat = "yyyy-MM-dd'T'HH:mm:ssxxx"
