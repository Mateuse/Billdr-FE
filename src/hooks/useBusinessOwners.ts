

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBusinessOwners, getBusinessOwner, createBusinessOwner, updateBusinessOwner, deleteBusinessOwner, getBusinessOwnerPaymentHistory } from '../api/businessOwners';
import { BusinessOwner, CreateBusinessOwnerRequest, UpdateBusinessOwnerRequest } from '../types/businessOwner';
import { PaymentTransaction } from '../types/invoice';
import { CACHE_TIMES } from '../constants/urls';

const QUERY_KEYS = {
  BUSINESS_OWNERS: ['business-owners'],
  BUSINESS_OWNER: (id: string) => ['business-owners', id],
  BUSINESS_OWNER_PAYMENT_HISTORY: (businessOwnerId: string) => ['business-owners', businessOwnerId, 'payment-history'],
};

export const useBusinessOwners = () => {
  return useQuery<BusinessOwner[], Error>({
    queryKey: QUERY_KEYS.BUSINESS_OWNERS,
    queryFn: getBusinessOwners,
    staleTime: CACHE_TIMES.STALE_TIME,
  });
};

export const useBusinessOwner = (id: string) => {
  return useQuery<BusinessOwner, Error>({
    queryKey: QUERY_KEYS.BUSINESS_OWNER(id),
    queryFn: () => getBusinessOwner(id),
    enabled: !!id,
    staleTime: CACHE_TIMES.STALE_TIME,
  });
};

export const useCreateBusinessOwner = () => {
  const queryClient = useQueryClient();

  return useMutation<BusinessOwner, Error, CreateBusinessOwnerRequest>({
    mutationFn: (data: CreateBusinessOwnerRequest) => createBusinessOwner(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BUSINESS_OWNERS });
    },
  });
};

export const useUpdateBusinessOwner = () => {
  const queryClient = useQueryClient();

  return useMutation<BusinessOwner, Error, { id: string; data: UpdateBusinessOwnerRequest }>({
    mutationFn: ({ id, data }: { id: string; data: UpdateBusinessOwnerRequest }) => 
      updateBusinessOwner(id, data),
    onSuccess: (updatedBusinessOwner) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BUSINESS_OWNERS });
      queryClient.setQueryData(QUERY_KEYS.BUSINESS_OWNER(updatedBusinessOwner.id), updatedBusinessOwner);
    },
  });
};

export const useDeleteBusinessOwner = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id: string) => deleteBusinessOwner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BUSINESS_OWNERS });
    },
  });
};

export const useBusinessOwnerPaymentHistory = (businessOwnerId: string) => {
  return useQuery<PaymentTransaction[], Error>({
    queryKey: QUERY_KEYS.BUSINESS_OWNER_PAYMENT_HISTORY(businessOwnerId),
    queryFn: () => getBusinessOwnerPaymentHistory(businessOwnerId),
    enabled: !!businessOwnerId,
    staleTime: CACHE_TIMES.STALE_TIME,
  });
};
