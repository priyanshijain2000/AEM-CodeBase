import { format, parse } from 'date-fns'
import { useEffect, useReducer, useRef } from 'react'
import { animated, useSpring } from 'react-spring'


import './accordion.scss'
import './calendar.scss'
import { Accordion } from './components/Accordion/Accordion'
import { AccordionSection } from './components/AccordionSection/AccordionSection'
import { Calendar } from './components/Calendar/Calendar'
import { CalendarIcon, calendarIconId } from './components/CalendarIcon/CalendarIcon'
import { CalendarLegend } from './components/CalendarLegend/CalendarLegend'
import { DateInput } from './components/DateInput/DateInput'
import { DesktopIcon, desktopIconId } from './components/DesktopIcon/DesktopIcon'
import { LocationIcon, locationIconId } from './components/LocationIcon/LocationIcon'
import { LocationInput } from './components/LocationInput/LocationInput'
import { NoTestCentersMessage } from './components/NoTestCentersMessage/NoTestCentersMessage'
import { TestCenterOptions } from './components/TestCenterOptions/TestCenterOptions'
import { TestCenterOptionsPlaceholder } from './components/TestCenterOptionsPlaceholder/TestCenterOptionsPlaceholder'
import { TestSelector } from './components/TestSelector/TestSelector'
import { TestCenter, useTestLocations } from './network/useTestLocations'
import { DateOption, GoogleMapsLocation, TestType } from './types'
import { CalendarBrandData } from './CalendarBrandData'


enum WizardStep {
  TestSelection = 1,
  LocationSelection = 2,
  TestCenterSelection = 3,
  Summary = 4,
}

interface SchedulingWizardState {
  activeStep: WizardStep
  selectedTestType: TestType | null
  selectedLocation: GoogleMapsLocation | null
  selectedStartDate: DateOption | null
  selectedDate: string | null
  selectedTestCenter: TestCenter | null
  isFinalStepDoneClosing: boolean
}

type SchedulingWizardAction =
  | { type: 'selectTestType'; payload: TestType }
  | { type: 'selectLocation'; payload: GoogleMapsLocation | null }
  | { type: 'selectStartDate'; payload: DateOption | null }
  | { type: 'searchLocations'; payload: null }
  | { type: 'selectDate'; payload: string }
  | { type: 'selectTestCenter'; payload: TestCenter }
  | { type: 'confirmTestCenter'; payload: null }
  | { type: 'setIsFinalStepDoneClosing'; payload: boolean }
  | { type: 'returnToStep'; payload: Exclude<WizardStep, WizardStep.Summary> }

type ActionPayload<T extends SchedulingWizardAction['type']> = Extract<SchedulingWizardAction, { type: T }>['payload']

const schedulingWizardReducer = (
  state: SchedulingWizardState,
  action: SchedulingWizardAction,
): SchedulingWizardState => {
  switch (action.type) {
    case 'selectTestType': {
      if (state.selectedTestType && state.selectedTestType.gtmName !== action.payload?.gtmName)
        window.dataLayer?.push({
          event: 'test_type_update',
          test_type_previous_selection: state.selectedTestType.gtmName,
          brand:  CalendarBrandData.dataLayerBrand,
        })
      // if the test type changed, null out later form values that won't necessarily be valid for the new test type
      const nulledValues =
        action.payload.description !== state.selectedTestType?.description
          ? { selectedTestCenter: null, selectedDate: null }
          : {}
      return { ...state, selectedTestType: action.payload, activeStep: WizardStep.LocationSelection, ...nulledValues }
    }
    case 'selectLocation':
      return { ...state, selectedLocation: action.payload, selectedDate: null, selectedTestCenter: null }
    case 'selectStartDate':
      return { ...state, selectedStartDate: action.payload, selectedDate: null, selectedTestCenter: null }
    case 'searchLocations':
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
          event: "calendar_search_location",
          brand: CalendarBrandData.dataLayerBrand,
          test_name: state.selectedTestType?.gtmName,
          city: state.selectedLocation?.value.description,
          date_range: state.selectedStartDate?.label
      });
      return { ...state, activeStep: WizardStep.TestCenterSelection }
    case 'selectDate':
      return { ...state, selectedDate: action.payload, selectedTestCenter: null }
    case 'selectTestCenter':
      return { ...state, selectedTestCenter: action.payload }
    case 'confirmTestCenter': {
      return { ...state, activeStep: WizardStep.Summary }
    }
    case 'setIsFinalStepDoneClosing':
      return { ...state, isFinalStepDoneClosing: action.payload }
    case 'returnToStep':
      return { ...state, activeStep: action.payload, isFinalStepDoneClosing: false }
  }
}

const initialState: SchedulingWizardState = {
  activeStep: WizardStep.TestSelection,
  selectedTestType: null,
  selectedLocation: null,
  selectedStartDate: null,
  selectedDate: null,
  selectedTestCenter: null,
  isFinalStepDoneClosing: false,
}

export function SchedulingWizard() {
  const [
    {
      activeStep,
      selectedTestType,
      selectedLocation,
      selectedStartDate,
      selectedDate,
      selectedTestCenter,
      isFinalStepDoneClosing,
    },
    dispatch,
  ] = useReducer(schedulingWizardReducer, initialState)

  const summaryContainerRef = useRef<HTMLDivElement>(null)
  const locationFormCcontainerRef = useRef<HTMLDivElement>(null)

  const testCentersQuery = useTestLocations(
    {
      placeId: selectedLocation?.value.place_id,
      placeLabel: selectedLocation?.label,
      testType: selectedTestType?.value.code,
      startDate: selectedStartDate?.value,
    },
    selectedTestType?.value.isHomeEdition ?? false,
  )

  const handleTestTypeSelect = (testType: ActionPayload<'selectTestType'>) => () => {
    dispatch({ type: 'selectTestType', payload: testType })
  }

  const handleSelectLocation = (location: ActionPayload<'selectLocation'>) => {
    dispatch({ type: 'selectLocation', payload: location })
  }

  const handleSelectStartDate = (startDate: ActionPayload<'selectStartDate'>) => {
    dispatch({ type: 'selectStartDate', payload: startDate })
  }

  const handleSearchLocations = () => {
    dispatch({ type: 'searchLocations', payload: null })
  }

  const handleSelectDate = (date: ActionPayload<'selectDate'>) => {
    dispatch({ type: 'selectDate', payload: date })
  }

  const handleSelectTestCenter = (testCenter: ActionPayload<'selectTestCenter'>) => {
    dispatch({ type: 'selectTestCenter', payload: testCenter })
  }

  const handleConfirmTestLocation = () => {
    dispatch({ type: 'confirmTestCenter', payload: null })
  }

  const handleReturnToStep = (step: ActionPayload<'returnToStep'>) => () => {
    dispatch({ type: 'returnToStep', payload: step })
  }

  const setIsFinalStepDoneClosing = (isDoneClosing: ActionPayload<'setIsFinalStepDoneClosing'>) => {
    dispatch({ type: 'setIsFinalStepDoneClosing', payload: isDoneClosing })
  }

  useEffect(() => {
    if (testCentersQuery.data && selectedTestType?.value.isHomeEdition && selectedDate) {
      const date = parse(selectedDate, 'yyyy-MM-dd', new Date())
      const testCentersOnDate = testCentersQuery.data?.[format(date, 'yyyy-MM')]?.[date.getDate()] ?? []
      if (testCentersOnDate[0]) handleSelectTestCenter(testCentersOnDate[0])
    }
  }, [testCentersQuery.data, selectedTestType?.value.isHomeEdition, selectedDate])

  const summaryModalFadeInAnimation = useSpring({
    config: { duration: 500 },
    opacity: isFinalStepDoneClosing ? 1 : 0,
    from: { opacity: isFinalStepDoneClosing ? 0 : 1 },
    onRest: () => {
      if (activeStep === WizardStep.Summary) {
        const containerRectangle = summaryContainerRef.current?.getBoundingClientRect()
        const containerTop = containerRectangle?.top ?? 0
        const containerHeight = containerRectangle?.height ?? 0
        const viewportHeight = window.innerHeight
        const desiredScrollPosition = containerTop + window.scrollY - viewportHeight / 2 + containerHeight / 2
        
        window.scrollTo({
          top: desiredScrollPosition,
          behavior: 'smooth',
        })
      }
      if(activeStep === WizardStep.LocationSelection) {
        const containerRectangle = locationFormCcontainerRef.current?.getBoundingClientRect()
        const containerTop = containerRectangle?.top ?? 0
        const containerHeight = containerRectangle?.height ?? 0
        const viewportHeight = window.innerHeight
        const desiredScrollPosition = containerTop + window.scrollY - viewportHeight / 2 + containerHeight / 2
        
        window.scrollTo({
          top: desiredScrollPosition,
          behavior: 'smooth',
        })
      }
    },
  })

  const availableDates = Object.fromEntries(
    Object.entries(testCentersQuery.data ?? {}).map(([month, days]) => [
      month,
      Object.keys(days).map((day) => parseInt(day)),
    ]),
  )

  const areAnyDatesAvailable = Object.values(availableDates).some((days) => days.length > 0)

  const date = selectedDate && parse(selectedDate, 'yyyy-MM-dd', new Date())
  const testCentersOnDate = date ? testCentersQuery.data?.[format(date, 'yyyy-MM')]?.[date.getDate()] ?? [] : []

  const formatRedirectUrl = () => {
    const timeZone = sessionStorage.getItem("timezone")
    const params = new URLSearchParams({
      _p: CalendarBrandData.programCode,
      testCode: selectedTestType!.value.code,
      deliveryMode: selectedTestType!.value.deliveryMode,
      testCenterId: selectedTestCenter!.siteCode,
      testDate: format(parse(selectedDate!, 'yyyy-MM-dd', new Date()), 'MM/dd/yyyy'),
      timeZoneId: timeZone as string,
    })
    return `${CalendarBrandData.baseURL}?${params}`
  }

  const logScheduleSelection = () => {
    if (selectedTestType && selectedTestCenter)
      window.dataLayer?.push({
        event: 'calendar_schedule_selection',
        brand: CalendarBrandData.dataLayerBrand,
        test_name: selectedTestType.gtmName,
        test_center_code: selectedTestCenter.siteCode,
      })
  }


  return (
    <Accordion>
      <AccordionSection
        heading="Let’s get started! Select the test you want to take."
        selected={selectedTestType?.description ?? null}
        isCompleted={activeStep > WizardStep.TestSelection}
        isActiveStep={activeStep === WizardStep.TestSelection}
        stepNumber={WizardStep.TestSelection}
        returnToStep={handleReturnToStep(WizardStep.TestSelection)}
      >
        <div className="TestSelector-container">
        {CalendarBrandData.TestSelector.map((value: any, index) => (
            <TestSelector
              key={index}
              name={value.name}
              selector={value.selector}
              handleTestTypeSelection={handleTestTypeSelect({
                description: value.description,
                gtmName: value.gtmName,
                value: { code: value.code, deliveryMode: value.deliveryMode, isHomeEdition: value.isHomeEdition },
              })}
            />
          ))}
        </div>
      </AccordionSection>
      <AccordionSection
        heading="Great, now choose an area and date range convenient for you."
        selected={`${selectedLocation?.label} ${selectedStartDate?.description}`}
        isActiveStep={activeStep === WizardStep.LocationSelection}
        isCompleted={activeStep > WizardStep.LocationSelection}
        stepNumber={WizardStep.LocationSelection}
        returnToStep={handleReturnToStep(WizardStep.LocationSelection)}
      >
        <div className="LocationForm-container" ref={locationFormCcontainerRef}>
          <LocationInput
            id="location"
            label="City or Postal Code"
            placeholder="Search by city or postal code"
            required
            selectedLocation={selectedLocation}
            setSelectedLocation={handleSelectLocation}
          />
          <DateInput
            id="dates"
            label="Choose a date range"
            required
            selectedStartDate={selectedStartDate}
            setSelectedStartDate={handleSelectStartDate}
          />

          <button
            className="new-calendar-btn-tertiary SearchLocationsButton new-calendar-button-overrides button-states"
            type="button"
            onClick={handleSearchLocations}
            disabled={!(selectedLocation && selectedStartDate)}
          >
            Search Locations
          </button>
        </div>
      </AccordionSection>
      <AccordionSection
        heading="And finally, choose your preferred date and test location."
        selected={
          selectedDate &&
          `${format(parse(selectedDate, 'yyyy-MM-dd', new Date()), 'MMM dd, yyyy')} ${selectedTestCenter?.siteName}`
        }
        isActiveStep={activeStep === WizardStep.TestCenterSelection}
        isCompleted={activeStep > WizardStep.TestCenterSelection}
        stepNumber={WizardStep.TestCenterSelection}
        returnToStep={handleReturnToStep(WizardStep.TestCenterSelection)}
        setIsFinalStepDoneClosing={() => {
          setIsFinalStepDoneClosing(true)
        }}
      >
        <div className="CalendarSectionContent">
          <div className="CalendarSectionContent--left">
            <CalendarLegend />
            {selectedStartDate && (
              <Calendar
                from={selectedStartDate.value}
                availableDates={availableDates}
                selectedDate={selectedDate}
                setSelectedDate={handleSelectDate}
                selectedStartDate={selectedStartDate}
                setSelectedStartDate={handleSelectStartDate}
                isLoading={testCentersQuery.isLoading}
              />
            )}
          </div>
          {selectedDate && selectedTestType ? (
            <div className="CalendarSectionContent--right">
              <TestCenterOptions
                selectedDate={selectedDate}
                selectedTestName={selectedTestType?.gtmName}
                selectedTestType={selectedTestType?.value}
                testCenters={testCentersOnDate}
                selectedTestCenter={selectedTestCenter}
                setSelectedTestCenter={handleSelectTestCenter}
                onConfirm={handleConfirmTestLocation}
              />
            </div>
          ) : areAnyDatesAvailable || testCentersQuery.isLoading ? (
            <TestCenterOptionsPlaceholder />
          ) : (
            <>
              <TestCenterOptionsPlaceholder />
              <NoTestCentersMessage returnToStep={handleReturnToStep(WizardStep.LocationSelection)} />
            </>
          )}
        </div>
      </AccordionSection>
      {activeStep === WizardStep.Summary && (
        <animated.div className="Summary-container-wrapper" style={summaryModalFadeInAnimation}>
          <section aria-labelledby="summary-heading" className="Summary-container" ref={summaryContainerRef}>
            <h3 id="summary-heading">Here's what you selected</h3>
            <div className="icon-labeled-info">
              <DesktopIcon aria-label="Test Type" />
              <p aria-labelledby={desktopIconId}>{selectedTestType?.description}</p>
            </div>
            {selectedTestType?.value.isHomeEdition ? null : (
              <div className="icon-labeled-info">
                <LocationIcon />
                <div className="TestLocation" aria-labelledby={locationIconId}>
                  <p>{selectedTestCenter?.siteName}</p>
                  <p className="Address">{selectedTestCenter?.address}</p>
                </div>
              </div>
            )}
            <div className="icon-labeled-info">
              <CalendarIcon />
              <p aria-labelledby={calendarIconId}>
                {format(parse(selectedDate!, 'yyyy-MM-dd', new Date()), 'EEEE, MMMM d, yyyy')}
              </p>
            </div>
            <a href={formatRedirectUrl()} onClick={logScheduleSelection} target="_blank" className="RegisterLink">
              <button
                type="button"
                className="new-calendar-btn-tertiary new-calendar-button-overrides button-states secondary"
                tabIndex={-1}
              >
                Register for your test
              </button>
            </a>
          </section>
        </animated.div>
      )}
    </Accordion>
  )
}
