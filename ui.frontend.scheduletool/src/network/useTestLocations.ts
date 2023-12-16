import { useQuery } from '@tanstack/react-query'
import { addMonths, endOfMonth, format, max, parse } from 'date-fns'
import { useCallback } from 'react'

import { CalendarBrandData } from '../CalendarBrandData'

import staticTimeZone from '../../static-timezone.json'

const staticPlaces = {
  ", Jammu and Kashmir": "IN",
}

interface GetTestLocationsParams {
  testType: string
  placeLabel: string
  placeId: string
  startDate: string
}

interface GetTestLocationsResponse {
  data: Array<{
    address: Array<{
      addressLine1: string
      addressLine2?: string
      city: string
      state?: string
      country: string
      latitude: string
      longitude: string
    }>
    deliveryMode: string
    isRemoteTestCenter: boolean
    schedulingSystemCode: string
    seatAvailability: { availability: Array<{ adminDate: string; isPrivateAdmin: boolean; distance?: string }> }
    siteCode: string
    siteName: string
    supportsAccomodation: boolean
  }>
  status: 'success' | 'failure'
  errorMessage: string
}

const checkTimezoneID = (key: keyof typeof staticTimeZone) => {
  const findKey = staticTimeZone.hasOwnProperty(key);
  // return staticTimeZone[key]
  if(findKey) {
    sessionStorage.setItem("timezone", staticTimeZone[key]);
  } else {
    sessionStorage.setItem("timezone", key);
  }
}

const fetchPlaceDetails = async (placeId: string, placeLabel: string) => {
  
  const placeService = new google.maps.places.PlacesService(
    document.getElementById('place-data-container') as HTMLDivElement,
  )
  const place = await new Promise<google.maps.places.PlaceResult | null>((resolve, reject) => {
    placeService.getDetails({ placeId, fields: ['geometry.location', 'address_components'] }, (place, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) reject(status)
      else resolve(place)
    })
  })

  
  let countryCode = place?.address_components?.find((component) => component.types.includes('country'))?.short_name
  if (!place?.geometry?.location) throw new Error(`Couldn't get coordinates for placeId: ${placeId}`)
  if (!countryCode) {
    let checkStaticCountyCode = Object.entries(staticPlaces).map(([key, value])=>{
      if(placeLabel.includes(key)) {
        return value
      }
    })
    if(checkStaticCountyCode[0]) {
      countryCode = checkStaticCountyCode[0];
    } else {
      throw new Error(`Couldn't get country code for placeId: ${placeId}`)
    }
  }
  
  await fetch(`${import.meta.env.VITE_API_BASE_URL}/timeZoneId.json?location=${place.geometry.location.lat()}%2C${place.geometry.location.lng()}&timestamp=1331161200`).then(response => response.json()).then(data => checkTimezoneID(data.timeZoneId)).catch(error => console.error(error));
    
  return { coordinates: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }, countryCode }
}

const fetchTestLocations = async ({
  testType,
  placeLabel,
  placeId,
  startDate,
}: GetTestLocationsParams): Promise<GetTestLocationsResponse> => {
  const { coordinates, countryCode } = await fetchPlaceDetails(placeId, placeLabel)
  const actualStartDate = max([parse(startDate, 'yyyy-MM', new Date()), new Date()])
  const endDate = endOfMonth(addMonths(actualStartDate, 1))
  const startDateParam = format(actualStartDate, 'yyyy-MM-dd HH:mm')
  const endDateParam = format(endDate, 'yyyy-MM-dd HH:mm')
  const finalTimeZone = sessionStorage.getItem("timezone");
  const params = new URLSearchParams({
    ExamId: testType,
    Latitude: `${coordinates.lat}`,
    Longitude: `${coordinates.lng}`,
    MaxCutOffDistance: CalendarBrandData.MaxCutOffDistance,
    CountryCode: countryCode,
    programCode: CalendarBrandData.programCode,
    // I don't think `days` does anything, but the API requires it
    days: CalendarBrandData.days,
    startDate: startDateParam,
    endDate: endDateParam,
    TimeZoneId: finalTimeZone as string
  })
  

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/test-location-availability.json?${params}`)
  // const response = await fetch(`./src/network/sampleData/test-location-availability.json`)
  return response.json()
}

const MAX_LOCATIONS = 10
const formatTestAvailabilities = (response: GetTestLocationsResponse, isHomeTest: boolean) => {
  const allAvailabilities = response.data
    .filter(({ isRemoteTestCenter }) => isRemoteTestCenter === isHomeTest)
    .slice(0, MAX_LOCATIONS)
    .flatMap(
      ({
        siteCode,
        siteName,
        schedulingSystemCode,
        deliveryMode,
        address: [address],
        seatAvailability: { availability: availabilities },
      }) =>
        availabilities.map(({ distance, adminDate }) => {
          const date = parse(adminDate, 'yyyy-MM-dd', new Date())
          return {
            siteCode,
            siteName,
            schedulingSystemCode,
            deliveryMode,
            address: `${address.addressLine1}${address.addressLine2 ? ` ${address.addressLine2}` : ''}, ${
              address.city
            }, ${address.state ? `${address.state} ` : ''}${address.country}`,
            milesAway: distance,
            month: format(date, 'yyyy-MM'),
            dayOfMonth: date.getDate(),
          }
        }),
    )

  type Month = string // formatted as yyyy-MM
  type DayOfMonth = number
  type Availability = (typeof allAvailabilities)[number]
  return allAvailabilities.reduce((acc, availability) => {
    const { month, dayOfMonth } = availability
    if (!(month in acc)) return { ...acc, [month]: { [dayOfMonth]: [availability] } }
    if (!(dayOfMonth in acc[month])) return { ...acc, [month]: { ...acc[month], [dayOfMonth]: [availability] } }
    return { ...acc, [month]: { ...acc[month], [dayOfMonth]: [...acc[month][dayOfMonth], availability] } }
  }, {} as Record<Month, Record<DayOfMonth, Array<Availability>>>)
}

export type TestCenter = ReturnType<typeof formatTestAvailabilities>[string][number][number]

export const useTestLocations = (params: Partial<GetTestLocationsParams>, isHomeTest: boolean) =>
  useQuery({
    queryKey: ['locations', params],
    queryFn: () => fetchTestLocations(params as GetTestLocationsParams),
    enabled: Boolean(params.testType && params.placeId && params.startDate),
    select: useCallback(
      (response: GetTestLocationsResponse) => formatTestAvailabilities(response, isHomeTest),
      [isHomeTest],
    ),
  })
