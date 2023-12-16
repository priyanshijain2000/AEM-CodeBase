import { addMonths, format, parse } from 'date-fns'
import { animated, useSpring } from 'react-spring'
import Spinner from '../Spinner/Spinner'
import { DateOption } from '../../types'
import { CalendarMonth } from '../CalendarMonth/CalendarMonth'

export function Calendar({
  from,
  availableDates,
  selectedDate,
  setSelectedDate,
  selectedStartDate,
  setSelectedStartDate,
  isLoading,
}: {
  from: string
  availableDates: Record<string, number[]>
  selectedDate: string | null
  setSelectedDate: (isCalendarDaySelected: string) => void
  selectedStartDate: DateOption
  setSelectedStartDate: (date: DateOption) => void
  isLoading: boolean
}) {
  const spinnerFadeInAnimation = useSpring({
    config: { duration: 200 },
    opacity: isLoading ? 1 : 0,
    from: { opacity: isLoading ? 0 : 1 },
  })

  const handleSelectDate = (date: string) => {
    setSelectedDate(date)
  }

  const firstMonth = parse(from, 'yyyy-MM', new Date())
  return (
    <div className="calendar">
      <div className="calendar-months">
        {isLoading && (
          <animated.div className="dates-loading" style={spinnerFadeInAnimation}>
            <div className="spinner-container">
              <Spinner />
            </div>
          </animated.div>
        )}
        {[firstMonth, addMonths(firstMonth, 1)].map((month, index) => {
          const monthStr = format(month, 'yyyy-MM')
          return (
            <CalendarMonth
              key={month.valueOf()}
              month={monthStr}
              availableDates={availableDates[monthStr] ?? []}
              selectedDate={selectedDate}
              setSelectedDate={handleSelectDate}
              selectedStartDate={selectedStartDate}
              setSelectedStartDate={setSelectedStartDate}
              isFirstMonth={index === 0}
              isLoading={isLoading}
            />
          )
        })}
      </div>
    </div>
  )
}
