import { useQuery } from '@tanstack/react-query'
import { endOfDay, format, parse } from 'date-fns'

import { TestType } from '../types'
import { timezoneFormat } from '../utils/date-utils'

import { CalendarBrandData } from '../CalendarBrandData'


interface GetAvailableTimesRequestParams {
  date: string
  testType: TestType['value']
  siteCode: string
}

interface GetAvailableTimesResponse {
  data: Array<{
    adminId: string
    isPrivateAdmin: boolean
    siteCode: string
    startTime: string
    vendorCode: string
  }>
}

const timeFormat = (startTime: string) => {
  let time = '';
  const hour = Number(startTime.substring(11, 13));
  const minute = startTime.substring(13, 16);
  if(hour >= 12 ) {
    if((hour - 12) == 0 ) {
      time = '12'+minute+' PM'
    } else {
      time = hour - 12 +''+minute+' PM'
    }
  } else {
    time = startTime.substring(11, 16) +' AM'
  }
  return time;
}


const formatAvailableTimes = ({ data }: GetAvailableTimesResponse) => {
  // data.map(({ startTime }) => parse(startTime, timezoneFormat, new Date()))
  return data.map(({ startTime }) => timeFormat(startTime) );
}

const formatTimeRangeWithTimezone = (dateStr: string) => {
  const date = parse(dateStr, 'yyyy-MM-dd', new Date())
  return { start: format(date, timezoneFormat), end: format(endOfDay(date), timezoneFormat) }
}


const fetchAvailableTimes = async ({
  date,
  testType: { code, deliveryMode },
  siteCode,
}: GetAvailableTimesRequestParams): Promise<GetAvailableTimesResponse> => {
  const googleTimeZone = sessionStorage.getItem("timezone")
  const { start, end } = formatTimeRangeWithTimezone(date)

  const params = new URLSearchParams({
    StartDate: start,
    EndDate: end,
    ExamId: code,
    DeliveryMode: deliveryMode,
    SiteCode: siteCode,
    programCode: CalendarBrandData.programCode,
    TimeZoneId: googleTimeZone as string,
  })

  // console.log(`/all-seats-availability.json?${params}`);
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/all-seats-availability.json?${params}`)
  // const response = await fetch(`./src/network/sampleData/all-seats-availability.json`)
  return response.json()
}

export const useAvailableTimes = (params: Partial<GetAvailableTimesRequestParams>, { enabled }: { enabled: boolean }) =>
  useQuery({
    queryKey: ['availableTimes', params],
    queryFn: () => fetchAvailableTimes(params as GetAvailableTimesRequestParams),
    enabled: Boolean(params.date && params.testType && params.siteCode && enabled),
    select: formatAvailableTimes,
  })
