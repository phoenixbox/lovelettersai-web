import type { Payment, Currency } from './types'

export const samplePayments: Payment[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    amount: 50000,
    currency: 'USD',
    date: new Date('2024-02-10'),
    description: 'Enterprise license payment',
    status: 'completed',
    address: {
      street: '350 Fifth Avenue',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postalCode: '10118',
      coordinates: {
        latitude: 40.7484,
        longitude: -73.9857,
      },
    },
  },
  {
    id: '223e4567-e89b-12d3-a456-426614174001',
    amount: 25000,
    currency: 'GBP',
    date: new Date('2024-02-12'),
    description: 'Annual subscription',
    status: 'completed',
    address: {
      street: '30 St Mary Axe',
      city: 'London',
      country: 'United Kingdom',
      postalCode: 'EC3A 8BF',
      coordinates: {
        latitude: 51.5144,
        longitude: -0.0803,
      },
    },
  },
  {
    id: '323e4567-e89b-12d3-a456-426614174002',
    amount: 75000,
    currency: 'EUR',
    date: new Date('2024-02-13'),
    description: 'Corporate license',
    status: 'completed',
    address: {
      street: 'Friedrichstraße 126',
      city: 'Berlin',
      country: 'Germany',
      postalCode: '10117',
      coordinates: {
        latitude: 52.52,
        longitude: 13.405,
      },
    },
  },
  {
    id: '423e4567-e89b-12d3-a456-426614174003',
    amount: 100000,
    currency: 'JPY',
    date: new Date('2024-02-14'),
    description: 'Enterprise agreement',
    status: 'completed',
    address: {
      street: '1-1 Marunouchi',
      city: 'Tokyo',
      country: 'Japan',
      postalCode: '100-0005',
      coordinates: {
        latitude: 35.6762,
        longitude: 139.6503,
      },
    },
  },
  {
    id: '523e4567-e89b-12d3-a456-426614174004',
    amount: 30000,
    currency: 'AUD',
    date: new Date('2024-02-15'),
    description: 'Annual contract',
    status: 'completed',
    address: {
      street: '1 Market Street',
      city: 'Sydney',
      state: 'NSW',
      country: 'Australia',
      postalCode: '2000',
      coordinates: {
        latitude: -33.8688,
        longitude: 151.2093,
      },
    },
  },
  {
    id: '623e4567-e89b-12d3-a456-426614174005',
    amount: 15000,
    currency: 'CAD',
    date: new Date('2024-02-16'),
    description: 'Software license',
    status: 'completed',
    address: {
      street: '100 Wellington Street West',
      city: 'Toronto',
      state: 'ON',
      country: 'Canada',
      postalCode: 'M5K 1M6',
      coordinates: {
        latitude: 43.6532,
        longitude: -79.3832,
      },
    },
  },
  {
    id: '723e4567-e89b-12d3-a456-426614174006',
    amount: 40000,
    currency: 'EUR',
    date: new Date('2024-02-17'),
    description: 'Platform subscription',
    status: 'completed',
    address: {
      street: 'Avenue des Champs-Élysées',
      city: 'Paris',
      country: 'France',
      postalCode: '75008',
      coordinates: {
        latitude: 48.8566,
        longitude: 2.3522,
      },
    },
  },
  {
    id: '823e4567-e89b-12d3-a456-426614174007',
    amount: 20000,
    currency: 'USD',
    date: new Date('2024-02-18'),
    description: 'Team license',
    status: 'completed',
    address: {
      street: '1455 Market Street',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      postalCode: '94103',
      coordinates: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
    },
  },
  {
    id: '923e4567-e89b-12d3-a456-426614174008',
    amount: 60000,
    currency: 'EUR',
    date: new Date('2024-02-19'),
    description: 'Enterprise subscription',
    status: 'completed',
    address: {
      street: 'Via Dante',
      city: 'Milan',
      country: 'Italy',
      postalCode: '20121',
      coordinates: {
        latitude: 45.4642,
        longitude: 9.19,
      },
    },
  },
  {
    id: 'a23e4567-e89b-12d3-a456-426614174009',
    amount: 35000,
    currency: 'USD',
    date: new Date('2024-02-20'),
    description: 'Corporate package',
    status: 'completed',
    address: {
      street: 'Sheikh Mohammed bin Rashid Blvd',
      city: 'Dubai',
      country: 'United Arab Emirates',
      postalCode: '00000',
      coordinates: {
        latitude: 25.1972,
        longitude: 55.2744,
      },
    },
  },
]

// Helper function to get total revenue by currency
export const getTotalsByCurrency = (
  payments: Payment[]
): Record<Currency, number> => {
  return payments.reduce((acc, payment) => {
    acc[payment.currency] = (acc[payment.currency] || 0) + payment.amount
    return acc
  }, {} as Record<Currency, number>)
}

// Helper function to calculate marker size based on payment amount
export const calculateMarkerSize = (amount: number): number => {
  // Scale marker size logarithmically between 0.03 and 0.15 based on payment amount
  const minSize = 0.03
  const maxSize = 0.15
  const minAmount = 10000 // Minimum expected payment
  const maxAmount = 100000 // Maximum expected payment

  const normalizedAmount = Math.min(Math.max(amount, minAmount), maxAmount)
  const scale = Math.log(normalizedAmount) / Math.log(maxAmount)
  return minSize + (maxSize - minSize) * scale
}

// Helper to get region bounds for payments
export const getRegionBounds = (payments: Payment[]) => {
  const coordinates = payments.map((p) => p.address.coordinates)

  return {
    minLat: Math.min(...coordinates.map((c) => c.latitude)),
    maxLat: Math.max(...coordinates.map((c) => c.latitude)),
    minLong: Math.min(...coordinates.map((c) => c.longitude)),
    maxLong: Math.max(...coordinates.map((c) => c.longitude)),
    center: {
      latitude:
        coordinates.reduce((sum, c) => sum + c.latitude, 0) /
        coordinates.length,
      longitude:
        coordinates.reduce((sum, c) => sum + c.longitude, 0) /
        coordinates.length,
    },
  }
}
