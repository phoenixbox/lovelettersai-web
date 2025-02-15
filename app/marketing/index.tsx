import { useEffect, useRef, useCallback } from 'react'
import { create } from 'zustand'
import createGlobe from 'cobe'
import { Button } from '~/components/ui/button'
import { Slider } from '~/components/ui/slider'
import { Switch } from '~/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Label } from '~/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { format } from 'date-fns'
import type { GlobeState } from './types'
import {
  samplePayments,
  calculateMarkerSize,
  getTotalsByCurrency,
  getRegionBounds,
} from './data'
import { DEFAULT_ROTATION_SPEED, DEFAULT_GLOBE_CONFIG } from './types'

// Enhanced Zustand store
const useGlobeStore = create<GlobeState>((set) => ({
  // Visual state
  isRotating: true,
  phi: 0,
  theta: 0,
  scale: 1,
  dark: 1,
  diffuse: 1.2,
  mapBrightness: 6,
  markersVisible: true,

  // Data state
  payments: samplePayments,
  selectedPayment: null,
  highlightedRegion: null,

  // Animation state
  rotationSpeed: DEFAULT_ROTATION_SPEED,
  isZooming: false,

  // Filter state
  dateRange: {
    start: null,
    end: null,
  },
  selectedCurrencies: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'],
  minAmount: null,
  maxAmount: null,

  // Actions
  setRotating: (isRotating) => set({ isRotating }),
  setPhi: (phi) => set({ phi }),
  setTheta: (theta) => set({ theta }),
  setScale: (scale) => set({ scale }),
  setDark: (dark) => set({ dark }),
  setDiffuse: (diffuse) => set({ diffuse }),
  setMapBrightness: (mapBrightness) => set({ mapBrightness }),
  setMarkersVisible: (markersVisible) => set({ markersVisible }),
  setPayments: (payments) => set({ payments }),
  setSelectedPayment: (payment) => set({ selectedPayment: payment }),
  setHighlightedRegion: (region) => set({ highlightedRegion: region }),
  setRotationSpeed: (speed) => set({ rotationSpeed: speed }),
  setDateRange: (range) => set({ dateRange: range }),
  setSelectedCurrencies: (currencies) =>
    set({ selectedCurrencies: currencies }),
  setAmountRange: (range) =>
    set({ minAmount: range.min, maxAmount: range.max }),

  zoomToLocation: (coordinates) => {
    set({
      phi: (coordinates.longitude * Math.PI) / 180,
      theta: (coordinates.latitude * Math.PI) / 180,
      isRotating: false,
      isZooming: true,
      scale: 1.5,
    })
    // Reset zooming state after animation
    setTimeout(() => set({ isZooming: false }), 1000)
  },

  zoomToRegion: (region) => {
    const filteredPayments = samplePayments.filter(
      (p) => p.address.country === region
    )
    const bounds = getRegionBounds(filteredPayments)
    set({
      phi: (bounds.center.longitude * Math.PI) / 180,
      theta: (bounds.center.latitude * Math.PI) / 180,
      isRotating: false,
      highlightedRegion: region,
      scale: 1.5,
    })
  },

  resetView: () =>
    set({
      phi: 0,
      theta: 0,
      scale: 1,
      isRotating: true,
      highlightedRegion: null,
      selectedPayment: null,
    }),
}))

/**
 * RESTART
 * Add interactivity on the click to go
 * https://github.com/shuding/cobe/blob/main/website/pages/docs/showcases/rotate-to-location.mdx?plain=1
 *
 * Also maybe make it full screen and layer controls so theres no clipping
 * - Just like the bounding box extractor
 */
const Cobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null)
  const phiRef = useRef(0)
  const renderFrameRef = useRef<number>(0)

  const store = useGlobeStore()

  // Memoize marker creation to prevent unnecessary recalculation
  const createMarkers = useCallback(() => {
    if (!store.markersVisible) return []

    return store.payments
      .filter((payment) => {
        if (
          store.selectedCurrencies.length &&
          !store.selectedCurrencies.includes(payment.currency)
        )
          return false
        if (store.minAmount && payment.amount < store.minAmount) return false
        if (store.maxAmount && payment.amount > store.maxAmount) return false
        return true
      })
      .map((payment) => ({
        location: [
          payment.address.coordinates.latitude,
          payment.address.coordinates.longitude,
        ],
        size: calculateMarkerSize(payment.amount),
        color:
          store.selectedPayment?.id === payment.id ? [1, 0.8, 0.1] : undefined,
      }))
  }, [
    store.payments,
    store.markersVisible,
    store.selectedCurrencies,
    store.minAmount,
    store.maxAmount,
    store.selectedPayment,
  ])

  const createGlobeInstance = useCallback(() => {
    if (!canvasRef.current) return

    // Cleanup previous instance
    if (globeRef.current) {
      globeRef.current.destroy()
    }

    // Create new instance
    globeRef.current = createGlobe(canvasRef.current, {
      ...DEFAULT_GLOBE_CONFIG,
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: phiRef.current,
      theta: store.theta,
      dark: store.dark,
      diffuse: store.diffuse,
      mapBrightness: store.mapBrightness,
      scale: store.scale,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: createMarkers(),
      onRender: (state) => {
        state.phi = phiRef.current
        if (store.isRotating) {
          phiRef.current += store.rotationSpeed
          store.setPhi(phiRef.current)
        }
      },
    })
  }, [
    store.theta,
    store.dark,
    store.diffuse,
    store.mapBrightness,
    store.scale,
    store.isRotating,
    store.rotationSpeed,
    createMarkers,
  ])

  // Initial setup
  useEffect(() => {
    createGlobeInstance()
    return () => {
      if (renderFrameRef.current) {
        cancelAnimationFrame(renderFrameRef.current)
      }
      if (globeRef.current) {
        globeRef.current.destroy()
      }
    }
  }, [createGlobeInstance])

  // Synchronize phi with store
  useEffect(() => {
    phiRef.current = store.phi
  }, [store.phi])

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return
      createGlobeInstance()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [createGlobeInstance])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: 600,
        height: 600,
        maxWidth: '100%',
        aspectRatio: 1,
        opacity: globeRef.current ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    />
  )
}

const PaymentTable = () => {
  const {
    payments,
    selectedPayment,
    setSelectedPayment,
    zoomToLocation,
    selectedCurrencies,
    minAmount,
    maxAmount,
  } = useGlobeStore()

  const filteredPayments = payments.filter((payment) => {
    if (
      selectedCurrencies.length &&
      !selectedCurrencies.includes(payment.currency)
    )
      return false
    if (minAmount && payment.amount < minAmount) return false
    if (maxAmount && payment.amount > maxAmount) return false
    return true
  })

  const totals = getTotalsByCurrency(filteredPayments)

  return (
    <Card className="w-full md:w-[600px]">
      <CardHeader>
        <CardTitle>Payment Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          {Object.entries(totals).map(([currency, total]) => (
            <span key={currency} className="mr-4">
              {currency}: {total.toLocaleString()}
            </span>
          ))}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow
                key={payment.id}
                className={
                  selectedPayment?.id === payment.id ? 'bg-accent' : ''
                }
              >
                <TableCell>{format(payment.date, 'PPP')}</TableCell>
                <TableCell>
                  {payment.amount.toLocaleString()} {payment.currency}
                </TableCell>
                <TableCell>
                  {payment.address.city}, {payment.address.country}
                </TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedPayment(payment)
                      zoomToLocation(payment.address.coordinates)
                    }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

const Controls = () => {
  const {
    isRotating,
    setRotating,
    markersVisible,
    setMarkersVisible,
    setScale,
    setDark,
    setDiffuse,
    setMapBrightness,
    rotationSpeed,
    setRotationSpeed,
    resetView,
    selectedCurrencies,
    setSelectedCurrencies,
  } = useGlobeStore()

  return (
    <Card className="w-full md:w-[300px]">
      <CardHeader>
        <CardTitle>Globe Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Auto Rotation</Label>
          <Switch checked={isRotating} onCheckedChange={setRotating} />
        </div>

        <div className="flex items-center justify-between">
          <Label>Show Markers</Label>
          <Switch
            checked={markersVisible}
            onCheckedChange={setMarkersVisible}
          />
        </div>

        <div className="space-y-2">
          <Label>Rotation Speed</Label>
          <Slider
            defaultValue={[rotationSpeed]}
            min={0.001}
            max={0.01}
            step={0.001}
            onValueChange={([value]) => setRotationSpeed(value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Scale</Label>
          <Slider
            defaultValue={[1]}
            min={0.5}
            max={2}
            step={0.1}
            onValueChange={([value]) => setScale(value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Dark Mode</Label>
          <Slider
            defaultValue={[1]}
            min={0}
            max={1}
            step={0.1}
            onValueChange={([value]) => setDark(value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Diffuse</Label>
          <Slider
            defaultValue={[1.2]}
            min={0}
            max={2}
            step={0.1}
            onValueChange={([value]) => setDiffuse(value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Map Brightness</Label>
          <Slider
            defaultValue={[6]}
            min={0}
            max={12}
            step={0.5}
            onValueChange={([value]) => setMapBrightness(value)}
          />
        </div>

        <Button className="w-full" variant="secondary" onClick={resetView}>
          Reset View
        </Button>
      </CardContent>
    </Card>
  )
}

export default function MarketingIndex() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-950 flex flex-col items-center">
      <div className="flex flex-col space-y-12 text-center pt-12">
        <div className="flex flex-col">
          <div className="text-4xl md:text-6xl text-white-800 font-medium">
            RevCobe
          </div>
          <div className="text-2xl md:text-4xl text-white-600">
            Visualize your revenue.
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 p-4">
          <div className="flex flex-col md:flex-row gap-8">
            <Cobe />
            <Controls />
          </div>
          <PaymentTable />
        </div>
      </div>
    </div>
  )
}
