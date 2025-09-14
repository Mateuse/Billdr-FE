import { createPaymentIntent, refundPayment, getAllPaymentHistory, getPaymentHistoryById } from '../payments'
import { mockPaymentTransaction } from '../../__tests__/utils/test-utils'

// Mock global fetch
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>

// Type for mock Response
interface MockResponse {
  ok: boolean
  json?: jest.MockedFunction<() => Promise<unknown>>
}

describe('payments API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createPaymentIntent', () => {
    const mockResponse = {
      data: {
        client_secret: 'pi_test_123_secret',
        payment_intent_id: 'pi_test_123',
        amount: 10000,
        currency: 'cad',
      },
    }

    it('creates payment intent successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      } as MockResponse)

      const result = await createPaymentIntent('invoice-123')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/invoices/invoice-123/create-payment-intent/'),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        }
      )
      expect(result).toEqual(mockResponse.data)
    })

    it('creates payment intent with custom amount', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      } as MockResponse)

      await createPaymentIntent('invoice-123', {
        customer_email: 'test@example.com',
        payment_amount: 50,
      })

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/invoices/invoice-123/create-payment-intent/'),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customer_email: 'test@example.com',
            payment_amount: 50,
          }),
        }
      )
    })

    it('handles API error', async () => {
      const errorResponse = { message: 'Payment intent creation failed' }
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValueOnce(errorResponse),
      } as MockResponse)

      await expect(createPaymentIntent('invoice-123')).rejects.toThrow(
        'Payment intent creation failed'
      )
    })

    it('handles network error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockRejectedValueOnce(new Error('Network error')),
      } as MockResponse)

      await expect(createPaymentIntent('invoice-123')).rejects.toThrow(
        'Failed to create payment intent'
      )
    })
  })

  describe('refundPayment', () => {
    const mockRefundResponse = {
      data: {
        payment_id: 'pi_test_123',
        amount_refunded: 10000,
        currency: 'cad',
        invoice_id: 'invoice-123',
        invoice_number: 'INV-001',
      },
    }

    it('refunds payment successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockRefundResponse),
      } as MockResponse)

      const result = await refundPayment('pi_test_123')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/payments/pi_test_123/refund/'),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        }
      )
      expect(result).toEqual(mockRefundResponse.data)
    })

    it('handles refund error', async () => {
      const errorResponse = { message: 'Refund failed' }
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValueOnce(errorResponse),
      } as MockResponse)

      await expect(refundPayment('pi_test_123')).rejects.toThrow('Refund failed')
    })
  })

  describe('getAllPaymentHistory', () => {
    const mockPaymentHistoryResponse = {
      data: [mockPaymentTransaction],
    }

    it('fetches all payment history successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockPaymentHistoryResponse),
      } as MockResponse)

      const result = await getAllPaymentHistory()

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/transactions/')
      )
      expect(result).toEqual(mockPaymentHistoryResponse.data)
    })

    it('handles fetch error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      } as MockResponse)

      await expect(getAllPaymentHistory()).rejects.toThrow(
        'Failed to load payment history'
      )
    })
  })

  describe('getPaymentHistoryById', () => {
    const mockSinglePaymentResponse = {
      data: mockPaymentTransaction,
    }

    it('fetches single payment history successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockSinglePaymentResponse),
      } as MockResponse)

      const result = await getPaymentHistoryById('payment-123')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/transactions/payment-123/')
      )
      expect(result).toEqual(mockSinglePaymentResponse.data)
    })

    it('handles fetch error for single payment', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      } as MockResponse)

      await expect(getPaymentHistoryById('payment-123')).rejects.toThrow(
        'Failed to load payment history'
      )
    })
  })
})