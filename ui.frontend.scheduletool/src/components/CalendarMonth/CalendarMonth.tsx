import { addMonths, format, parse, startOfMonth } from 'date-fns'
import { CalendarDay } from '../CalendarDay/CalendarDay'
import { DateOption } from '../../types'
import { parseDateOptionToDate } from '../../utils/date-utils'
import { parseDateToDateOption } from '../../utils/date-utils'

export function CalendarMonth({
  availableDates,
  selectedDate,
  setSelectedDate,
  selectedStartDate,
  setSelectedStartDate,
  isFirstMonth,
  month,
  isLoading,
}: {
  availableDates: number[]
  selectedDate: string | null
  setSelectedDate: (date: string) => void
  selectedStartDate: DateOption
  setSelectedStartDate: (date: DateOption) => void
  isFirstMonth: boolean
  // month is formatted as 'yyyy-MM'
  month: string
  isLoading: boolean
}) {
  const firstDayOfMonth = parse(month, 'yyyy-MM', new Date())
  const firstWeekdayOfMonth = firstDayOfMonth.getDay()
  const numberOfDaysInMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0).getDate()

  // making sure the month starts on the correct day of the week
  const calendarBeginningPadding = Array.from({ length: firstWeekdayOfMonth }, () => null)

  const calendarMonth = [...calendarBeginningPadding, ...Array.from({ length: numberOfDaysInMonth }, (_, i) => i + 1)]
  const weeks = chunkArray(calendarMonth, 7)

  const focusCellByCoordinates = (row: number, col: number) => {
    const cell = document.getElementById(`calendarday${format(firstDayOfMonth, 'yyyyMM')}-${row}-${col}`)
    if (cell) cell.focus()
  }

  const handleArrowKeys = (event: React.KeyboardEvent<HTMLTableElement>) => {
    const activeCell = document.activeElement as HTMLTableCellElement
    if (activeCell.tagName !== 'TD') return

    const { key } = event
    const [_, row, col] = activeCell.id.split('-').map(Number)
    const numRows = weeks.length
    const numCols = 7

    if (key === 'ArrowUp') {
      event.preventDefault()
      if (row > 0) focusCellByCoordinates(row - 1, col)
    } else if (key === 'ArrowDown') {
      event.preventDefault()
      if (row < numRows - 1) focusCellByCoordinates(row + 1, col)
    } else if (key === 'ArrowLeft') {
      event.preventDefault()
      if (col > 0) focusCellByCoordinates(row, col - 1)
    } else if (key === 'ArrowRight') {
      event.preventDefault()
      if (col < numCols - 1) focusCellByCoordinates(row, col + 1)
    }
  }

  const handleNextStartDate = () => {
    setSelectedStartDate(parseDateToDateOption(addMonths(firstDayOfMonth, 1)))
  }

  const handlePreviousStartDate = () => {
    setSelectedStartDate(parseDateToDateOption(addMonths(firstDayOfMonth, -1)))
  }

  const selectedStartDateAsDate = parseDateOptionToDate(selectedStartDate)
  const isBackButtonDisabled = startOfMonth(selectedStartDateAsDate) <= startOfMonth(new Date())
  const isNextButtonDisabled = startOfMonth(selectedStartDateAsDate) >= startOfMonth(addMonths(new Date(), 5))

  const getStartDateButtonDescription = (newStartDate: Date) =>
    `See available locations for ${format(newStartDate, 'MMMM yyyy')} - ${format(
      addMonths(newStartDate, 1),
      'MMMM yyyy',
    )}`

  const captionId = `calendar-month-caption-${month}` as const
  return (
    <div className={`calendar ${isLoading ? 'loading' : ''}`}>
      <div className="calendar-month">
        <table
          onKeyDown={handleArrowKeys}
          tabIndex={0}
          role="grid"
          aria-label="Select an available date to see the test centers that are open."
          aria-busy={isLoading}
        >
          <caption id={captionId}>
            <div className="calendar-caption-content">
              {isFirstMonth && (
                <button
                  onClick={handlePreviousStartDate}
                  disabled={isBackButtonDisabled}
                  className="start-date-direction-button"
                  {...(isBackButtonDisabled ? {} : { 'aria-label': 'Previous month click to '+getStartDateButtonDescription(addMonths(selectedStartDateAsDate, -1)) })}
                >
                  <span className="material-icons" aria-hidden="true">chevron_left</span>
                </button>
              )}
              <time dateTime={month}>{format(firstDayOfMonth, 'MMMM yyyy')}</time>
              {isFirstMonth && (
                <button
                  onClick={handleNextStartDate}
                  disabled={isNextButtonDisabled}
                  className="start-date-direction-button"
                  {...(isNextButtonDisabled ? {} : { 'aria-label': 'Next month click to '+getStartDateButtonDescription(addMonths(selectedStartDateAsDate, 1)) })}
                >
                  <span className="material-icons" aria-hidden="true">chevron_right</span>
                </button>
              )}
            </div>
          </caption>

          <thead>
            <tr>
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                <th key={day}>
                  <abbr title={day}>{day.slice(0, 3)}</abbr>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {weeks.map((week, rowIndex) => (
              <tr key={rowIndex}>
                {week.map((day, colIndex) => {
                  if (!day) return <td key={`empty-cell-${colIndex}`} />

                  const dayOfMonth = new Date(firstDayOfMonth)
                  dayOfMonth.setDate(day)

                  const datetime = format(dayOfMonth, 'yyyy-MM-dd')
                  const isSelected = selectedDate === datetime
                  const isAvailable = !isSelected && availableDates.includes(day)
                  const cellId = `calendarday${format(dayOfMonth, 'yyyyMM')}-${rowIndex}-${colIndex}`
                  return (
                    <CalendarDay
                      key={cellId}
                      cellId={cellId}
                      dateStr={datetime}
                      selected={isSelected}
                      available={isAvailable}
                      setSelectedDate={setSelectedDate}
                    />
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
const chunkArray = <T,>(array: T[], size: number) =>
  Array.from({ length: Math.ceil(array.length / size) }, (_, i) => array.slice(i * size, i * size + size))
