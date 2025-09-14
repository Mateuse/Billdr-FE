import { renderHook } from '../../__tests__/utils/test-utils'
import { useInvoices, useInvoice, useCreateInvoice, useUpdateInvoice, useDeleteInvoice } from '../useInvoices'
import { mockInvoice } from '../../__tests__/utils/test-utils'
import { useQuery, useMutation } from '@tanstack/react-query'

// Mock the API functions
jest.mock('../../api/invoices', () => ({
  getInvoices: jest.fn(),
  getInvoice: jest.fn(),
  createInvoice: jest.fn(),
  updateInvoice: jest.fn(),
  deleteInvoice: jest.fn(),
  getInvoicePaymentHistory: jest.fn(),
}))

// Mock TanStack Query hooks
const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>
const mockUseMutation = useMutation as jest.MockedFunction<typeof useMutation>

describe('useInvoices hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('useInvoices', () => {
    it('returns query result for all invoices', () => {
      const mockQueryResult = {
        data: [mockInvoice],
        isLoading: false,
        isError: false,
        error: null,
        refetch: jest.fn(),
        remove: jest.fn(),
        status: 'success' as const,
        dataUpdatedAt: 0,
        errorUpdatedAt: 0,
        failureCount: 0,
        failureReason: null,
        fetchStatus: 'idle' as const,
        isInitialLoading: false,
        isLoadingError: false,
        isPaused: false,
        isPending: false,
        isPlaceholderData: false,
        isRefetchError: false,
        isRefetching: false,
        isStale: false,
        isSuccess: true,
      }

      mockUseQuery.mockReturnValueOnce(mockQueryResult)

      const { result } = renderHook(() => useInvoices())

      expect(result.current).toEqual(mockQueryResult)
      expect(mockUseQuery).toHaveBeenCalledWith({
        queryKey: ['invoices'],
        queryFn: expect.any(Function),
        staleTime: expect.any(Number),
      })
    })

    it('handles loading state', () => {
      const mockQueryResult = {
        data: undefined,
        isLoading: true,
        isError: false,
        error: null,
        refetch: jest.fn(),
        remove: jest.fn(),
        status: 'pending' as const,
        dataUpdatedAt: 0,
        errorUpdatedAt: 0,
        failureCount: 0,
        failureReason: null,
        fetchStatus: 'fetching' as const,
        isInitialLoading: true,
        isLoadingError: false,
        isPaused: false,
        isPending: true,
        isPlaceholderData: false,
        isRefetchError: false,
        isRefetching: false,
        isStale: false,
        isSuccess: false,
      }

      mockUseQuery.mockReturnValueOnce(mockQueryResult)

      const { result } = renderHook(() => useInvoices())

      expect(result.current.isLoading).toBe(true)
      expect(result.current.data).toBeUndefined()
    })
  })

  describe('useInvoice', () => {
    it('returns query result for single invoice', () => {
      const mockQueryResult = {
        data: mockInvoice,
        isLoading: false,
        isError: false,
        error: null,
        refetch: jest.fn(),
        remove: jest.fn(),
        status: 'success' as const,
        dataUpdatedAt: 0,
        errorUpdatedAt: 0,
        failureCount: 0,
        failureReason: null,
        fetchStatus: 'idle' as const,
        isInitialLoading: false,
        isLoadingError: false,
        isPaused: false,
        isPending: false,
        isPlaceholderData: false,
        isRefetchError: false,
        isRefetching: false,
        isStale: false,
        isSuccess: true,
      }

      mockUseQuery.mockReturnValueOnce(mockQueryResult)

      const { result } = renderHook(() => useInvoice('invoice-123'))

      expect(result.current).toEqual(mockQueryResult)
      expect(mockUseQuery).toHaveBeenCalledWith({
        queryKey: ['invoices', 'invoice-123'],
        queryFn: expect.any(Function),
        enabled: true,
        staleTime: expect.any(Number),
        refetchInterval: undefined,
      })
    })

    it('is disabled when id is empty', () => {
      mockUseQuery.mockReturnValueOnce({
        data: undefined,
        isLoading: false,
        isError: false,
        error: null,
        refetch: jest.fn(),
        remove: jest.fn(),
        status: 'success' as const,
        dataUpdatedAt: 0,
        errorUpdatedAt: 0,
        failureCount: 0,
        failureReason: null,
        fetchStatus: 'idle' as const,
        isInitialLoading: false,
        isLoadingError: false,
        isPaused: false,
        isPending: false,
        isPlaceholderData: false,
        isRefetchError: false,
        isRefetching: false,
        isStale: false,
        isSuccess: true,
      })

      renderHook(() => useInvoice(''))

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: false,
        })
      )
    })

    it('accepts refetchInterval option', () => {
      mockUseQuery.mockReturnValueOnce({
        data: mockInvoice,
        isLoading: false,
        isError: false,
        error: null,
        refetch: jest.fn(),
        remove: jest.fn(),
        status: 'success' as const,
        dataUpdatedAt: 0,
        errorUpdatedAt: 0,
        failureCount: 0,
        failureReason: null,
        fetchStatus: 'idle' as const,
        isInitialLoading: false,
        isLoadingError: false,
        isPaused: false,
        isPending: false,
        isPlaceholderData: false,
        isRefetchError: false,
        isRefetching: false,
        isStale: false,
        isSuccess: true,
      })

      renderHook(() => useInvoice('invoice-123', { refetchInterval: 5000 }))

      expect(mockUseQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          refetchInterval: 5000,
        })
      )
    })
  })

  describe('useCreateInvoice', () => {
    it('returns mutation for creating invoice', () => {
      const mockMutationResult = {
        mutate: jest.fn(),
        mutateAsync: jest.fn(),
        isLoading: false,
        isError: false,
        error: null,
        data: undefined,
        reset: jest.fn(),
        status: 'idle' as const,
        isIdle: true,
        isPending: false,
        isPaused: false,
        isSuccess: false,
        submittedAt: 0,
        variables: undefined,
        context: undefined,
        failureCount: 0,
        failureReason: null,
      }

      mockUseMutation.mockReturnValueOnce(mockMutationResult)

      const { result } = renderHook(() => useCreateInvoice())

      expect(result.current).toEqual(mockMutationResult)
      expect(mockUseMutation).toHaveBeenCalledWith({
        mutationFn: expect.any(Function),
        onSuccess: expect.any(Function),
      })
    })
  })

  describe('useUpdateInvoice', () => {
    it('returns mutation for updating invoice', () => {
      const mockMutationResult = {
        mutate: jest.fn(),
        mutateAsync: jest.fn(),
        isLoading: false,
        isError: false,
        error: null,
        data: undefined,
        reset: jest.fn(),
        status: 'idle' as const,
        isIdle: true,
        isPending: false,
        isPaused: false,
        isSuccess: false,
        submittedAt: 0,
        variables: undefined,
        context: undefined,
        failureCount: 0,
        failureReason: null,
      }

      mockUseMutation.mockReturnValueOnce(mockMutationResult)

      const { result } = renderHook(() => useUpdateInvoice())

      expect(result.current).toEqual(mockMutationResult)
      expect(mockUseMutation).toHaveBeenCalledWith({
        mutationFn: expect.any(Function),
        onSuccess: expect.any(Function),
      })
    })
  })

  describe('useDeleteInvoice', () => {
    it('returns mutation for deleting invoice', () => {
      const mockMutationResult = {
        mutate: jest.fn(),
        mutateAsync: jest.fn(),
        isLoading: false,
        isError: false,
        error: null,
        data: undefined,
        reset: jest.fn(),
        status: 'idle' as const,
        isIdle: true,
        isPending: false,
        isPaused: false,
        isSuccess: false,
        submittedAt: 0,
        variables: undefined,
        context: undefined,
        failureCount: 0,
        failureReason: null,
      }

      mockUseMutation.mockReturnValueOnce(mockMutationResult)

      const { result } = renderHook(() => useDeleteInvoice())

      expect(result.current).toEqual(mockMutationResult)
      expect(mockUseMutation).toHaveBeenCalledWith({
        mutationFn: expect.any(Function),
        onSuccess: expect.any(Function),
      })
    })
  })
})