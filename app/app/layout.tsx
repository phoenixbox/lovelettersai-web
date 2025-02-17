import type { Route } from './+types/root'
import { type LoaderFunctionArgs } from 'react-router'
import { logLoader } from '~/lib/loader.server'
import { mock } from './mock.server'
import {
  filterData,
  groupChartData,
  sortData,
  getFacetsFromData,
  percentileData,
} from './helpers.server'
import { sliderFilterValues } from './helpers.server'
import { addDays } from 'date-fns'
import {
  calculateSpecificPercentile,
  type Percentile,
} from '~/lib/request/percentile'
import qs from 'qs'

import type { ColumnSchema, FacetMetadataSchema } from '~/app/schema'
import { Client } from '~/components/InfiniteDataTable/client'

// Describe your search params, and reuse this in useQueryStates / createSerializer:
// export const coordinatesSearchParams = {
//   uuid: parseAsString,
// }

// const loadSearchParams = createLoader(coordinatesSearchParams)

interface SearchParams {
  date?: string[] | string
  start?: number
  size?: number
  sort?: string
  // Add other expected query parameters here
}

interface ParsedSearchParams extends Omit<SearchParams, 'date'> {
  date?: [Date, Date] | null
}

export type LogsMeta = {
  currentPercentiles: Record<Percentile, number>
}

export type InfiniteQueryMeta<TMeta = Record<string, unknown>> = {
  totalRowCount: number
  filterRowCount: number
  chartData: { timestamp: number; [key: string]: number }[]
  facets: Record<string, FacetMetadataSchema>
  metadata?: TMeta
}

export async function loader(props: LoaderFunctionArgs) {
  logLoader('app.layout')

  const totalData = mock

  interface SearchParams {
    date?: string[] | string
    start?: number
    size?: number
    sort?: string
    // Add other expected query parameters here
  }

  interface ParsedSearchParams extends Omit<SearchParams, 'date'> {
    date?: [Date, Date] | null
  }

  // const searchParams = loadSearchParams(props.request)
  // console.log('-------  searchParams:', searchParams)

  /**
   * Maybe pull to common location
   */
  // Parse search params with qs, providing type information
  const url = new URL(props.request.url)
  // Parse search params with qs, providing type information
  const search = qs.parse(url.search.substring(1), {
    arrayLimit: 10,
    decoder(str) {
      // Handle special cases for known numeric fields
      if (['start', 'size'].includes(str)) {
        return parseInt(str, 10)
      }
      // Try to parse dates
      const date = new Date(str)
      if (!isNaN(date.getTime())) {
        return date
      }
      return str
    },
  }) as SearchParams

  // Process date range
  const dateRange = search.date
    ? Array.isArray(search.date)
      ? [new Date(search.date[0]), new Date(search.date[1])]
      : [new Date(search.date), addDays(new Date(search.date), 1)]
    : null

  const parsedParams: ParsedSearchParams = {
    ...search,
    date: dateRange,
    start: search.start || 0,
    size: search.size || 20,
  }

  // Filter out slider values
  const filteredParams = Object.fromEntries(
    Object.entries(parsedParams).filter(
      ([key]) => !sliderFilterValues.includes(key as any)
    )
  )

  const rangedData = filterData(totalData, { date: dateRange })
  const withoutSliderData = filterData(rangedData, {
    ...filteredParams,
    date: null,
  })
  const filteredData = filterData(withoutSliderData, {
    ...parsedParams,
    date: null,
  })

  // Rest of your existing logic...
  const chartData = groupChartData(filteredData, dateRange)
  const sortedData = sortData(filteredData, parsedParams.sort)
  const withoutSliderFacets = getFacetsFromData(withoutSliderData)
  const facets = getFacetsFromData(filteredData)
  const withPercentileData = percentileData(sortedData)

  const latencies = withPercentileData.map(({ latency }) => latency)
  const currentPercentiles = {
    50: calculateSpecificPercentile(latencies, 50),
    75: calculateSpecificPercentile(latencies, 75),
    90: calculateSpecificPercentile(latencies, 90),
    95: calculateSpecificPercentile(latencies, 95),
    99: calculateSpecificPercentile(latencies, 99),
  }

  return {
    data: withPercentileData.slice(
      parsedParams.start,
      parsedParams.start + parsedParams.size
    ),
    meta: {
      totalRowCount: totalData.length,
      filterRowCount: filteredData.length,
      chartData,
      facets: {
        ...withoutSliderFacets,
        ...Object.fromEntries(
          Object.entries(facets).filter(
            ([key]) => !sliderFilterValues.includes(key as any)
          )
        ),
      },
      metadata: { currentPercentiles },
    },
  } satisfies {
    data: ColumnSchema[]
    meta: InfiniteQueryMeta<LogsMeta>
  }
}

export default function AppLayout() {
  return <Client />
}
