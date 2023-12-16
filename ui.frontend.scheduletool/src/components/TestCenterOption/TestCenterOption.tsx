import { PlusIcon } from '../PlusIcon/PlusIcon'
import type { TestCenter } from '../../network/useTestLocations'
import { TestType } from '../../types'
import { useAvailableTimes } from '../../network/useAvailableTimes'

export const TestCenterOption = ({
  selectedDate,
  testType,
  testCenter,
  isExpanded,
  onToggleExpanded,
  isSelected,
  onSelectTestCenter,
  index: i,
}: {
  selectedDate: string
  testType: TestType['value']
  testCenter: TestCenter
  isExpanded: boolean
  onToggleExpanded: (e: React.MouseEvent) => void
  isSelected: boolean
  onSelectTestCenter: () => void
  index: number
}) => {
  const availableTimesQuery = useAvailableTimes(
    { date: selectedDate, testType, siteCode: testCenter.siteCode },
    { enabled: isExpanded },
  )

  const addressId = `test-center-address-${i}` as const
  const distanceId = `test-center-distance-${i}` as const
  const timesListId = `test-center-times-list-${i}` as const
  const timesListLabelId = `test-center-times-list-label-${i}` as const

  const renderAvailableTimes = () => {
    if (availableTimesQuery.isLoading) return 'Loading...'
    // this outcome shouldn't really be possible, but occasionally can be, due to timezone weirdness
    if (availableTimesQuery.data?.length === 0) return '(None found)'
    return availableTimesQuery.data?.map((time: string, index) => (
      <li className="TestCenterOptions-time" key={index}>
        {time}
        {/* <time dateTime={time.toISOString()}>{format(time, 'h:mm aaaa')}</time> */}
      </li>
    ))
  }

  return (
    <div
      className={`TestCenterOption ${isSelected ? 'selected' : ''}`}
      key={testCenter.siteCode}
      onClick={onSelectTestCenter}
    >
      <div className="TestCenterOption-summary">
        <div className="TestCenterOption-summary_left">
          <input
            type="radio"
            id={testCenter.siteCode}
            name="test-center"
            value={testCenter.siteCode}
            aria-describedby={`${addressId} ${distanceId}`}
            checked={isSelected}
            onChange={() => {}}
          />
          <div>
            <label className="TestCenterOption-name" htmlFor={testCenter.siteCode}>
              {testCenter.siteName}
            </label>
            {testType.isHomeEdition ? null : (
              <div className="TestCenterOption-address" id={addressId}>
                {testCenter.address}
              </div>
            )}
          </div>
        </div>
        <div className="TestCenterOption-summary_right" onClick={onToggleExpanded}>
          {testCenter.milesAway && (
            <div className="TestCenterOption-distance" id={distanceId}>
              {testCenter.milesAway} <abbr title="miles">Mi</abbr>
            </div>
          )}
          <button
            type="button"
            aria-label={
              isExpanded
                ? `Hide available times for ${testCenter.siteName}`
                : `Show available times for ${testCenter.siteName}`
            }
            aria-controls={timesListId}
            aria-expanded={isExpanded}
            className={`icon-button ${isExpanded ? 'active' : ''}`}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
      <div className={`TestCenterOption-times_container ${isExpanded ? '' : 'hidden'}`} id={timesListId}>
        <label id={timesListLabelId}>Available test times</label>
        <ul
          className="TestCenterOption-times"
          aria-labelledby={timesListLabelId}
          aria-busy={availableTimesQuery.isLoading}
          aria-live="polite"
        >
          {renderAvailableTimes()}
        </ul>
      </div>
    </div>
  )
}
