

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getInvoices, getInvoice, createInvoice, updateInvoice, deleteInvoice, getInvoicePaymentHistory } from '../api/invoices';
import { Invoice, CreateInvoiceRequest, UpdateInvoiceRequest, PaymentTransaction } from '../types/invoice';
import { CACHE_TIMES } from '../constants/urls';

export const QUERY_KEYS = {
  INVOICES: ['invoices'],
  INVOICE: (id: string) => ['invoices', id],
  INVOICE_PAYMENT_HISTORY: (invoiceId: string) => ['invoices', invoiceId, 'payment-history'],
};

export const useInvoices = () => {
  return useQuery<Invoice[], Error>({
    queryKey: QUERY_KEYS.INVOICES,
    queryFn: getInvoices,
    staleTime: CACHE_TIMES.STALE_TIME,
  });
};

export const useInvoice = (id: string, options?: { refetchInterval?: number }) => {
  return useQuery<Invoice, Error>({
    queryKey: QUERY_KEYS.INVOICE(id),
    queryFn: () => getInvoice(id),
    enabled: !!id,
    staleTime: CACHE_TIMES.STALE_TIME,
    refetchInterval: options?.refetchInterval,
  });
};

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation<Invoice, Error, CreateInvoiceRequest>({
    mutationFn: (data: CreateInvoiceRequest) => createInvoice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.INVOICES });
    },
  });
};

export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation<Invoice, Error, { id: string; data: UpdateInvoiceRequest }>({
    mutationFn: ({ id, data }: { id: string; data: UpdateInvoiceRequest }) => 
      updateInvoice(id, data),
    onSuccess: (updatedInvoice) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.INVOICES });
      queryClient.setQueryData(QUERY_KEYS.INVOICE(updatedInvoice.id), updatedInvoice);
    },
  });
};

export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id: string) => deleteInvoice(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.INVOICES });
    },
  });
};

export const useInvoicePaymentHistory = (invoiceId: string, options?: { refetchInterval?: number }) => {
  return useQuery<PaymentTransaction[], Error>({
    queryKey: QUERY_KEYS.INVOICE_PAYMENT_HISTORY(invoiceId),
    queryFn: () => getInvoicePaymentHistory(invoiceId),
    enabled: !!invoiceId,
    staleTime: CACHE_TIMES.STALE_TIME,
    refetchInterval: options?.refetchInterval,
  });
};
