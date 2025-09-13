import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return ''
  },
}))

// Mock Stripe
jest.mock('@stripe/stripe-js', () => ({
  loadStripe: jest.fn(() =>
    Promise.resolve({
      confirmPayment: jest.fn(),
      elements: jest.fn(),
      createPaymentMethod: jest.fn(),
    })
  ),
}))

// Mock TanStack Query
const mockQueryClient = {
  invalidateQueries: jest.fn(),
  removeQueries: jest.fn(),
  getQueryData: jest.fn(),
  setQueryData: jest.fn(),
}

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(() => ({
    data: undefined,
    isLoading: false,
    isError: false,
    error: null,
  })),
  useMutation: jest.fn(() => ({
    mutate: jest.fn(),
    mutateAsync: jest.fn(),
    isLoading: false,
    isError: false,
    error: null,
  })),
  useQueryClient: jest.fn(() => mockQueryClient),
  QueryClient: jest.fn(() => mockQueryClient),
  QueryClientProvider: ({ children }) => children,
}))

// Global fetch mock
global.fetch = jest.fn()

// Mock console methods
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
}

// Mock environment variables
process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = 'pk_test_mock_key'