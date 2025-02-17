import * as React from 'react'
import { DataTableInfinite } from './infinite'
import { columns } from './columns'
import { filterFields as defaultFilterFields, sheetFields } from './constants'
// import { useQueryStates } from 'nuqs'
// import { searchParamsParser } from '~/app/lib/search.server'
import { useHotKey } from '~/hooks/use-hot-key'
import { getLevelRowClassName } from '~/lib/request/level'
import type { FacetMetadataSchema } from '~/app/schema'
import type { Table as TTable } from '@tanstack/react-table'
import { useMatches, useRouteLoaderData, useSearchParams } from 'react-router'
import { useQueryStates, parseAsString } from 'nuqs'

export function Client() {
  const [searchParams] = useSearchParams()
  // Replace with qs decoder

  const loaderData = useRouteLoaderData('app/layout')
  const data = loaderData?.data

  const isFetching = false
  const isLoading = false
  const fetchNextPage = () => {}

  useResetFocus()

  // REMINDER: meta data is always the same for all pages as filters do not change(!)
  const lastPage = data?.pages?.[data?.pages.length - 1]
  const totalDBRowCount = lastPage?.meta?.totalRowCount
  const filterDBRowCount = lastPage?.meta?.filterRowCount
  const metadata = lastPage?.meta?.metadata
  const chartData = lastPage?.meta?.chartData
  const facets = lastPage?.meta?.facets
  const totalFetched = data?.length

  const uuid = searchParams.get('uuid')
  const start = searchParams.get('start')
  const size = searchParams.get('size')
  const sort = searchParams.get('sort')

  // Get all remaining parameters
  const filter: Record<string, string> = {}
  searchParams.forEach((value, key) => {
    if (!['uuid', 'start', 'size', 'sort'].includes(key)) {
      filter[key] = value
    }
  })

  const [_, setSearch] = useQueryStates({
    uuid: parseAsString,
  })

  // REMINDER: this is currently needed for the cmdk search
  // TODO: auto search via API when the user changes the filter instead of hardcoded
  const filterFields = defaultFilterFields.map((field) => {
    const facetsField = facets?.[field.value]
    if (!facetsField) return field
    if (field.options && field.options.length > 0) return field

    // REMINDER: if no options are set, we need to set them via the API
    const options = facetsField.rows.map(({ value }) => {
      return {
        label: `${value}`,
        value,
      }
    })

    if (field.type === 'slider') {
      return {
        ...field,
        min: facetsField.min ?? field.min,
        max: facetsField.max ?? field.max,
        options,
      }
    }

    return { ...field, options }
  })

  return (
    <DataTableInfinite
      columns={columns}
      data={data}
      totalRows={totalDBRowCount}
      filterRows={filterDBRowCount}
      totalRowsFetched={totalFetched}
      defaultColumnFilters={Object.entries(filter)
        .map(([key, value]) => ({
          id: key,
          value,
        }))
        .filter(({ value }) => value ?? undefined)}
      defaultColumnSorting={sort ? [sort] : undefined}
      defaultRowSelection={uuid ? { [uuid]: true } : undefined}
      // FIXME: make it configurable - TODO: use `columnHidden: boolean` in `filterFields`
      defaultColumnVisibility={{
        uuid: false,
        'timing.dns': false,
        'timing.connection': false,
        'timing.tls': false,
        'timing.ttfb': false,
        'timing.transfer': false,
      }}
      meta={metadata}
      filterFields={filterFields}
      sheetFields={sheetFields}
      isFetching={isFetching}
      isLoading={isLoading}
      fetchNextPage={fetchNextPage}
      chartData={chartData}
      getRowClassName={(row) => getLevelRowClassName(row.original.level)}
      getRowId={(row) => row.uuid}
      getFacetedUniqueValues={getFacetedUniqueValues(facets)}
      getFacetedMinMaxValues={getFacetedMinMaxValues(facets)}
    />
  )
}

function useResetFocus() {
  useHotKey(() => {
    // FIXME: some dedicated div[tabindex="0"] do not auto-unblur (e.g. the DataTableFilterResetButton)
    // REMINDER: we cannot just document.activeElement?.blur(); as the next tab will focus the next element in line,
    // which is not what we want. We want to reset entirely.
    document.body.setAttribute('tabindex', '0')
    document.body.focus()
    document.body.removeAttribute('tabindex')
  }, '.')
}

function getFacetedUniqueValues<TData>(
  facets?: Record<string, FacetMetadataSchema>
) {
  return (_: TTable<TData>, columnId: string): Map<string, number> => {
    return new Map(
      facets?.[columnId]?.rows?.map(({ value, total }) => [value, total]) || []
    )
  }
}

function getFacetedMinMaxValues<TData>(
  facets?: Record<string, FacetMetadataSchema>
) {
  return (_: TTable<TData>, columnId: string): [number, number] | undefined => {
    const min = facets?.[columnId]?.min
    const max = facets?.[columnId]?.max
    if (min && max) return [min, max]
    if (min) return [min, min]
    if (max) return [max, max]
    return undefined
  }
}
