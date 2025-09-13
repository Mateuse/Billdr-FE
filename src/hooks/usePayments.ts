

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { createPaymentIntent, refundPayment, getAllPaymentHistory, getPaymentHistoryById } from '../api/payments';
import type { CreatePaymentIntentRequest } from '../api/payments';
import {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  UI_TEXT,
} from '../constants/messages';
import { COLORS } from '../constants/ui';
import { CACHE_TIMES } from '../constants/urls';
import { PaymentTransaction } from '../types/invoice';
import { QUERY_KEYS } from './useInvoices';

export const useCreatePaymentIntent = () => {
  return useMutation({
    mutationFn: ({ invoiceId, request }: { invoiceId: string; request: CreatePaymentIntentRequest }) => 
      createPaymentIntent(invoiceId, request),
    onSuccess: () => {
      notifications.show({
        title: SUCCESS_MESSAGES.PAYMENT_INTENT_CREATED_TITLE,
        message: SUCCESS_MESSAGES.PAYMENT_INTENT_CREATED_MESSAGE,
        color: COLORS.SUCCESS,
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: UI_TEXT.PAYMENT_SETUP_ERROR,
        message: error.message || ERROR_MESSAGES.PAYMENT_INTENT_CREATION_ERROR,
        color: COLORS.DANGER,
      });
    },
  });
};

export const usePaymentSuccess = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invoiceId: string) => Promise.resolve(invoiceId),
    onSuccess: (invoiceId) => {

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.INVOICE(invoiceId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.INVOICES });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.INVOICE_PAYMENT_HISTORY(invoiceId) });
      
      notifications.show({
        title: SUCCESS_MESSAGES.PAYMENT_SUCCESSFUL_TITLE,
        message: SUCCESS_MESSAGES.PAYMENT_SUCCESSFUL_MESSAGE,
        color: COLORS.SUCCESS,
      });
    },
  });
};


export const useRefundPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (stripePaymentId: string) => refundPayment(stripePaymentId),
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.INVOICE(data.invoice_id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.INVOICES });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.INVOICE_PAYMENT_HISTORY(data.invoice_id) });


      queryClient.invalidateQueries({ queryKey: PAYMENT_QUERY_KEYS.PAYMENT_HISTORY });
      queryClient.invalidateQueries({ predicate: (query) => {
        const queryKey = query.queryKey;

        return Array.isArray(queryKey) &&
               queryKey.some(key => typeof key === 'string' && key.includes('payment-history'));
      }});

      notifications.show({
        title: UI_TEXT.REFUND_PROCESSED_SUCCESSFULLY,
        message: `Refunded ${new Intl.NumberFormat('en-CA', {
          style: 'currency',
          currency: data.currency,
        }).format(data.amount_refunded)} for invoice ${data.invoice_number}`,
        color: COLORS.SUCCESS,
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: UI_TEXT.REFUND_FAILED,
        message: error.message || ERROR_MESSAGES.REFUND_PROCESSING_ERROR,
        color: COLORS.DANGER,
      });
    },
  });
};


const PAYMENT_QUERY_KEYS = {
  PAYMENT_HISTORY: ['payment-history'],
  PAYMENT_HISTORY_ITEM: (id: string) => ['payment-history', id],
};

export const useAllPaymentHistory = () => {
  return useQuery<PaymentTransaction[], Error>({
    queryKey: PAYMENT_QUERY_KEYS.PAYMENT_HISTORY,
    queryFn: getAllPaymentHistory,
    staleTime: CACHE_TIMES.STALE_TIME,
  });
};

export const usePaymentHistoryItem = (paymentId: string) => {
  return useQuery<PaymentTransaction, Error>({
    queryKey: PAYMENT_QUERY_KEYS.PAYMENT_HISTORY_ITEM(paymentId),
    queryFn: () => getPaymentHistoryById(paymentId),
    enabled: !!paymentId,
    staleTime: CACHE_TIMES.STALE_TIME,
  });
};


export { PAYMENT_QUERY_KEYS };