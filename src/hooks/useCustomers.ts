

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer, getCustomerPaymentHistory } from '../api/customers';
import { Customer, CreateCustomerRequest, UpdateCustomerRequest } from '../types/customer';
import { PaymentTransaction } from '../types/invoice';
import { CACHE_TIMES } from '../constants/urls';

const QUERY_KEYS = {
  CUSTOMERS: ['customers'],
  CUSTOMER: (id: string) => ['customers', id],
  CUSTOMER_PAYMENT_HISTORY: (customerId: string) => ['customers', customerId, 'payment-history'],
};

export const useCustomers = () => {
  return useQuery<Customer[], Error>({
    queryKey: QUERY_KEYS.CUSTOMERS,
    queryFn: getCustomers,
    staleTime: CACHE_TIMES.STALE_TIME,
  });
};

export const useCustomer = (id: string) => {
  return useQuery<Customer, Error>({
    queryKey: QUERY_KEYS.CUSTOMER(id),
    queryFn: () => getCustomer(id),
    enabled: !!id,
    staleTime: CACHE_TIMES.STALE_TIME,
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation<Customer, Error, CreateCustomerRequest>({
    mutationFn: (data: CreateCustomerRequest) => createCustomer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CUSTOMERS });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation<Customer, Error, { id: string; data: UpdateCustomerRequest }>({
    mutationFn: ({ id, data }: { id: string; data: UpdateCustomerRequest }) => 
      updateCustomer(id, data),
    onSuccess: (updatedCustomer) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CUSTOMERS });
      queryClient.setQueryData(QUERY_KEYS.CUSTOMER(updatedCustomer.id), updatedCustomer);
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id: string) => deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CUSTOMERS });
    },
  });
};

export const useCustomerPaymentHistory = (customerId: string) => {
  return useQuery<PaymentTransaction[], Error>({
    queryKey: QUERY_KEYS.CUSTOMER_PAYMENT_HISTORY(customerId),
    queryFn: () => getCustomerPaymentHistory(customerId),
    enabled: !!customerId,
    staleTime: CACHE_TIMES.STALE_TIME,
  });
};
