import { z } from 'zod'

// Base coordinate schema
export const CoordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
})

// Address schema including coordinates
export const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string().optional(),
  country: z.string(),
  postalCode: z.string().optional(),
  coordinates: CoordinatesSchema,
})

// Currency schema with validation
export const CurrencySchema = z.enum([
  'USD',
  'EUR',
  'GBP',
  'JPY',
  'CAD',
  'AUD',
  // Add more currencies as needed
])

// Payment schema with full details
export const PaymentSchema = z.object({
  id: z.string().uuid(),
  amount: z.number().positive(),
  currency: CurrencySchema,
  date: z.date(),
  description: z.string().optional(),
  status: z.enum(['completed', 'pending', 'failed']),
  address: AddressSchema,
  metadata: z.record(z.string(), z.unknown()).optional(),
})

// Marker configuration for the globe
export const MarkerSchema = z.object({
  location: z.tuple([z.number(), z.number()]),
  size: z.number().min(0).max(1),
  color: z.tuple([z.number(), z.number(), z.number()]).optional(),
  pulse: z.boolean().optional(),
})

// Globe configuration
export const GlobeConfigSchema = z.object({
  devicePixelRatio: z.number().positive(),
  width: z.number().positive(),
  height: z.number().positive(),
  phi: z.number(),
  theta: z.number(),
  dark: z.number().min(0).max(1),
  diffuse: z.number().positive(),
  mapSamples: z.number().positive(),
  mapBrightness: z.number().positive(),
  baseColor: z.tuple([z.number(), z.number(), z.number()]),
  markerColor: z.tuple([z.number(), z.number(), z.number()]),
  glowColor: z.tuple([z.number(), z.number(), z.number()]),
  scale: z.number().positive(),
  offset: z.tuple([z.number(), z.number()]).optional(),
  markers: z.array(MarkerSchema),
})

// TypeScript types derived from Zod schemas
export type Coordinates = z.infer<typeof CoordinatesSchema>
export type Address = z.infer<typeof AddressSchema>
export type Currency = z.infer<typeof CurrencySchema>
export type Payment = z.infer<typeof PaymentSchema>
export type Marker = z.infer<typeof MarkerSchema>
export type GlobeConfig = z.infer<typeof GlobeConfigSchema>

// Globe store state interface
export interface GlobeState {
  // Visual state
  isRotating: boolean
  phi: number
  theta: number
  scale: number
  dark: number
  diffuse: number
  mapBrightness: number
  markersVisible: boolean

  // Data state
  payments: Payment[]
  selectedPayment: Payment | null
  highlightedRegion: string | null

  // Animation state
  rotationSpeed: number
  isZooming: boolean

  // Filter state
  dateRange: {
    start: Date | null
    end: Date | null
  }
  selectedCurrencies: Currency[]
  minAmount: number | null
  maxAmount: number | null

  // Actions
  setRotating: (isRotating: boolean) => void
  setPhi: (phi: number) => void
  setTheta: (theta: number) => void
  setScale: (scale: number) => void
  setDark: (dark: number) => void
  setDiffuse: (diffuse: number) => void
  setMapBrightness: (mapBrightness: number) => void
  setMarkersVisible: (markersVisible: boolean) => void
  setPayments: (payments: Payment[]) => void
  setSelectedPayment: (payment: Payment | null) => void
  setHighlightedRegion: (region: string | null) => void
  setRotationSpeed: (speed: number) => void
  setDateRange: (range: { start: Date | null; end: Date | null }) => void
  setSelectedCurrencies: (currencies: Currency[]) => void
  setAmountRange: (range: { min: number | null; max: number | null }) => void
  zoomToLocation: (coordinates: Coordinates) => void
  zoomToRegion: (region: string) => void
  resetView: () => void
}

// Helper function types
export type LocationFormatter = (coordinates: Coordinates) => string
export type AmountFormatter = (amount: number, currency: Currency) => string

// Utility types for filtering and analytics
export interface PaymentAnalytics {
  totalAmount: number
  paymentCount: number
  averageAmount: number
  currencyBreakdown: Record<Currency, number>
  regionBreakdown: Record<string, number>
  timeSeriesData: Array<{
    date: Date
    amount: number
    count: number
  }>
}

export interface RegionBounds {
  minLat: number
  maxLat: number
  minLong: number
  maxLong: number
  center: Coordinates
}

// Constants
export const DEFAULT_MARKER_SIZE = 0.05
export const DEFAULT_ROTATION_SPEED = 0.005
export const MIN_SCALE = 0.5
export const MAX_SCALE = 2.0
export const DEFAULT_GLOBE_CONFIG: GlobeConfig = {
  devicePixelRatio: 2,
  width: 600 * 2,
  height: 600 * 2,
  phi: 0,
  theta: 0,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [0.3, 0.3, 0.3],
  markerColor: [0.1, 0.8, 1],
  glowColor: [1, 1, 1],
  scale: 1,
  markers: [],
}
