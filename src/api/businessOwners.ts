import {
  BusinessOwner,
  CreateBusinessOwnerRequest,
  UpdateBusinessOwnerRequest,
} from "../types/businessOwner";
import { PaymentTransaction } from "../types/invoice";
import { ApiResponse } from "../types/api";
import {
  API_ENDPOINTS,
  HTTP_METHODS,
  HTTP_HEADERS,
  CONTENT_TYPES,
} from "../constants/urls";
import { ERROR_MESSAGES } from "../constants/messages";

export const getBusinessOwners = async (): Promise<BusinessOwner[]> => {
  const response = await fetch(`${API_ENDPOINTS.BUSINESS_OWNERS}`);
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_BUSINESS_OWNERS_ERROR);
  }
  const data: ApiResponse<BusinessOwner[]> = await response.json();
  return data.data;
};

export const getBusinessOwner = async (company_name: string): Promise<BusinessOwner> => {
  const response = await fetch(`${API_ENDPOINTS.BUSINESS_OWNERS}${company_name}/`);
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_BUSINESS_OWNERS_ERROR);
  }
  const data: ApiResponse<BusinessOwner> = await response.json();
  return data.data;
};

export const createBusinessOwner = async (
  businessOwnerData: CreateBusinessOwnerRequest
): Promise<BusinessOwner> => {
  const response = await fetch(`${API_ENDPOINTS.BUSINESS_OWNERS}`, {
    method: HTTP_METHODS.POST,
    headers: {
      [HTTP_HEADERS.CONTENT_TYPE]: CONTENT_TYPES.JSON,
    },
    body: JSON.stringify(businessOwnerData),
  });
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.CREATE_BUSINESS_OWNER_ERROR);
  }
  const data: ApiResponse<BusinessOwner> = await response.json();
  return data.data;
};

export const updateBusinessOwner = async (
  id: string,
  businessOwnerData: UpdateBusinessOwnerRequest
): Promise<BusinessOwner> => {
  const response = await fetch(`${API_ENDPOINTS.BUSINESS_OWNERS}${id}/`, {
    method: HTTP_METHODS.PUT,
    headers: {
      [HTTP_HEADERS.CONTENT_TYPE]: CONTENT_TYPES.JSON,
    },
    body: JSON.stringify(businessOwnerData),
  });
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.UPDATE_BUSINESS_OWNER_ERROR);
  }
  const data: ApiResponse<BusinessOwner> = await response.json();
  return data.data;
};

export const deleteBusinessOwner = async (id: string): Promise<void> => {
  const response = await fetch(`${API_ENDPOINTS.BUSINESS_OWNERS}${id}/`, {
    method: HTTP_METHODS.DELETE,
  });
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.DELETE_BUSINESS_OWNER_ERROR);
  }
};

export const getBusinessOwnerPaymentHistory = async (businessOwnerId: string): Promise<PaymentTransaction[]> => {
  const response = await fetch(`${API_ENDPOINTS.BUSINESS_OWNERS}${businessOwnerId}/transactions/`);
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_PAYMENT_HISTORY_ERROR);
  }
  const data: ApiResponse<PaymentTransaction[]> = await response.json();
  return data.data;
};
