import { format, parse } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import type { TestCenter } from '../../network/useTestLocations'
import { TestType } from '../../types'
import { TestCenterOption } from '../TestCenterOption/TestCenterOption'
import { CalendarBrandData } from '../../CalendarBrandData'

export const TestCenterOptions = ({
  selectedDate,
  selectedTestType,
  selectedTestName,
  testCenters,
  selectedTestCenter,
  setSelectedTestCenter,
  onConfirm,
}: {
  selectedDate: string
  selectedTestType: TestType['value'],
  selectedTestName: string
  testCenters: TestCenter[]
  selectedTestCenter: TestCenter | null
  setSelectedTestCenter: (testCenter: TestCenter) => void
  onConfirm: (e: React.FormEvent<HTMLFormElement>) => void
}) => {
  const [expandedTestCenters, setExpandedTestCenters] = useState<string[]>([]);
  const [testCentersCode, setTestCentersCode] = useState('At Home');

  const handleTestCenterClick = (testCenter: TestCenter) => () => {
    setSelectedTestCenter(testCenter)    
    setTestCentersCode(selectedTestType.isHomeEdition ? 'At Home' : testCenter.siteCode)
  }

  const handleExpandTestCenterClick = (testCenterId: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    if (expandedTestCenters.includes(testCenterId))
      setExpandedTestCenters((prevExpanded) => prevExpanded.filter((id) => id !== testCenterId))
    else setExpandedTestCenters((prevExpanded) => [...prevExpanded, testCenterId])
  }

  const siteCodes = useMemo(() => testCenters.map(({ siteCode }) => siteCode), [testCenters])
  useEffect(() => {
    if (selectedTestType.isHomeEdition) setExpandedTestCenters(siteCodes)
    else setExpandedTestCenters([])
  }, [selectedDate, selectedTestType.isHomeEdition, siteCodes])

  const legendId = 'test-centers-legend' as const
  return (
    <form
      id={'test-centers-form' as const}
      className="TestCenterOptions-form"
      aria-labelledby="test-list-announced"
      tabIndex={-1}
      onSubmit={(e) => {
        e.preventDefault()
        onConfirm(e)
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ 
          event: "calendar_test_location", 
          brand: CalendarBrandData.dataLayerBrand, 
          test_name: selectedTestName, 
          test_centers: testCentersCode
        });
        window.dataLayer.push({ 
          event: "calendar_test_date_selection", 
          brand: CalendarBrandData.dataLayerBrand, 
          test_name: selectedTestName, 
          date: format(parse(selectedDate, 'yyyy-MM-dd', new Date()), 'MMMM d, yyyy')
        });
      }}
    >
      <div className='visible-hide' id="test-list-announced">Select a test center from the list below.</div>
      <fieldset>
        <legend id={legendId}>
          {selectedTestType.isHomeEdition
            ? format(parse(selectedDate, 'yyyy-MM-dd', new Date()), 'EEEE, MMMM d, yyyy')
            : 'Test Centers'}
        </legend>
        {
          <div className="TestCenterOptions-container">
            {testCenters.map((testCenter, i) => (
              <TestCenterOption
                selectedDate={selectedDate}
                testType={selectedTestType}
                testCenter={testCenter}
                isExpanded={expandedTestCenters.includes(testCenter.siteCode)}
                onToggleExpanded={handleExpandTestCenterClick(testCenter.siteCode)}
                isSelected={selectedTestCenter?.siteCode === testCenter.siteCode}
                onSelectTestCenter={handleTestCenterClick(testCenter)}
                index={i}
                key={testCenter.siteCode}
              />
            ))}
          </div>
        }
      </fieldset>
      <button
        disabled={!(selectedDate && selectedTestCenter)}
        className="new-calendar-btn-tertiary ConfirmLocationButton new-calendar-button-overrides button-states"
      >
        {selectedTestType.isHomeEdition ? 'Confirm' : 'Confirm your location and date'}
      </button>
    </form>
  )
}
