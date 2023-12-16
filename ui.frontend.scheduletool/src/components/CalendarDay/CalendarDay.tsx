import { parse } from 'date-fns'

export const CalendarDay = ({
  dateStr,
  available,
  selected,
  setSelectedDate,
  cellId,
}: {
  dateStr: string
  available: boolean
  selected: boolean
  setSelectedDate: (date: string) => void
  cellId: string
}) => {
  const handleSelectDay = () => {
    if (available) setSelectedDate(dateStr)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTableCellElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      event.stopPropagation()
      handleSelectDay()
    }
  }

  const date = parse(dateStr, 'yyyy-MM-dd', new Date())

  return (
    <td
      id={cellId}
      data-day={date.getDay()}
      tabIndex={available ? 0 : -1}
      role={'cell'}
      data-selected={selected}
      data-available={available}
      onClick={handleSelectDay}
      onKeyDown={handleKeyDown}
      {...(available ? { 'aria-label': date.getDay() + ' Select this date to pick from the test centers that are open.' } : {} )}
      /*aria-description={
        available
          ? 'Select this date to pick from the test centers that are open.'
          : selected
          ? 'This is the currently selected date.'
          : 'There are no test centers available on this date.'
      }*/
    >
      <button type="button" disabled={!available} tabIndex={-1}>
        <time dateTime={dateStr}>{date.getDate()}</time>
      </button>
    </td>
  )
}
