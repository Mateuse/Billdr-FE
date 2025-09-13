import { getInvoices, getInvoice, createInvoice, updateInvoice, deleteInvoice } from '../invoices'
import { mockInvoice } from '../../__tests__/utils/test-utils'

// Mock global fetch
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>

describe('invoices API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getInvoices', () => {
    const mockInvoicesResponse = {
      data: [mockInvoice],
    }

    it('fetches all invoices successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockInvoicesResponse),
      } as unknown as Response)

      const result = await getInvoices()

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/invoices/')
      )
      expect(result).toEqual(mockInvoicesResponse.data)
    })

    it('handles fetch error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      } as unknown as Response)

      await expect(getInvoices()).rejects.toThrow(
        'Failed to load invoices'
      )
    })
  })

  describe('getInvoice', () => {
    const mockSingleInvoiceResponse = {
      data: mockInvoice,
    }

    it('fetches single invoice successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockSingleInvoiceResponse),
      } as unknown as Response)

      const result = await getInvoice('invoice-123')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/invoices/invoice-123/')
      )
      expect(result).toEqual(mockSingleInvoiceResponse.data)
    })

    it('handles fetch error for single invoice', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      } as unknown as Response)

      await expect(getInvoice('invoice-123')).rejects.toThrow(
        'Failed to load invoices'
      )
    })
  })

  describe('createInvoice', () => {
    const createRequest = {
      customer: 'customer-123',
      business_owner: 'business-123',
      due_date: '2024-01-01',
      line_items: [
        {
          description: 'Test service',
          quantity: 1,
          unit_price: '100.00',
        },
      ],
    }

    const mockCreateResponse = {
      data: mockInvoice,
    }

    it('creates invoice successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockCreateResponse),
      } as unknown as Response)

      const result = await createInvoice(createRequest)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/invoices/'),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(createRequest),
        }
      )
      expect(result).toEqual(mockCreateResponse.data)
    })

    it('handles create error', async () => {
      const errorResponse = { message: 'Invalid invoice data' }
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValueOnce(errorResponse),
      } as unknown as Response)

      await expect(createInvoice(createRequest)).rejects.toThrow(
        'Failed to create invoice'
      )
    })
  })

  describe('updateInvoice', () => {
    const updateRequest = {
      due_date: '2024-02-01',
    }

    const mockUpdateResponse = {
      data: { ...mockInvoice, due_date: '2024-02-01' },
    }

    it('updates invoice successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockUpdateResponse),
      } as unknown as Response)

      const result = await updateInvoice('invoice-123', updateRequest)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/invoices/invoice-123/'),
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateRequest),
        }
      )
      expect(result).toEqual(mockUpdateResponse.data)
    })

    it('handles update error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValueOnce({ message: 'Update failed' }),
      } as unknown as Response)

      await expect(updateInvoice('invoice-123', updateRequest)).rejects.toThrow(
        'Failed to update invoice'
      )
    })
  })

  describe('deleteInvoice', () => {
    it('deletes invoice successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
      } as unknown as Response)

      await deleteInvoice('invoice-123')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/invoices/invoice-123/'),
        {
          method: 'DELETE',
        }
      )
    })

    it('handles delete error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      } as unknown as Response)

      await expect(deleteInvoice('invoice-123')).rejects.toThrow(
        'Failed to delete invoice'
      )
    })
  })
})