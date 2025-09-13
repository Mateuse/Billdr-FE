import React, { ReactElement, PropsWithChildren } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MantineProvider } from '@mantine/core'

// Mock data for tests
export const mockInvoice = {
  id: 'test-invoice-id',
  invoice_number: 'INV-001',
  total_amount: '100.00',
  amount_paid: '0.00',
  currency: 'CAD',
  status: 'unpaid' as const,
  due_date: '2024-01-01',
  issue_date: '2023-12-01',
  business_owner: 'test-business-owner-id',
  customer: 'test-customer-id',
  line_items: [],
  created_at: '2023-12-01T00:00:00Z',
  updated_at: '2023-12-01T00:00:00Z',
}

export const mockCustomer = {
  id: 'test-customer-id',
  name: 'Test Customer',
  email: 'test@example.com',
  phone: '+1234567890',
  address: '123 Test St',
  created_at: '2023-12-01T00:00:00Z',
  updated_at: '2023-12-01T00:00:00Z',
}

export const mockBusinessOwner = {
  id: 'test-business-owner-id',
  name: 'Test Business Owner',
  email: 'business@example.com',
  phone: '+1234567890',
  address: '456 Business Ave',
  created_at: '2023-12-01T00:00:00Z',
  updated_at: '2023-12-01T00:00:00Z',
}

export const mockPaymentTransaction = {
  id: 'test-payment-id',
  invoice_id: 'test-invoice-id',
  stripe_payment_id: 'pi_test_123',
  amount: '100.00',
  currency: 'CAD',
  status: 'succeeded' as const,
  payment_method: 'card',
  created_at: '2023-12-01T00:00:00Z',
  updated_at: '2023-12-01T00:00:00Z',
}

// Custom render function that includes providers
const AllTheProviders = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        {children}
      </MantineProvider>
    </QueryClientProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }