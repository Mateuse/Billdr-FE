import {
  Customer,
  CreateCustomerRequest,
  UpdateCustomerRequest,
} from "../types/customer";
import { PaymentTransaction } from "../types/invoice";
import { ApiResponse } from "../types/api";
import {
  API_ENDPOINTS,
  HTTP_METHODS,
  HTTP_HEADERS,
  CONTENT_TYPES,
} from "../constants/urls";
import { ERROR_MESSAGES } from "../constants/messages";

export const getCustomers = async (): Promise<Customer[]> => {
  const response = await fetch(`${API_ENDPOINTS.CUSTOMERS}`);
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_CUSTOMERS_ERROR);
  }
  const data: ApiResponse<Customer[]> = await response.json();
  return data.data;
};

export const getCustomer = async (customer_id: string): Promise<Customer> => {
  const response = await fetch(`${API_ENDPOINTS.CUSTOMERS}${customer_id}/`);
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_CUSTOMERS_ERROR);
  }
  const data: ApiResponse<Customer> = await response.json();
  return data.data;
};

export const createCustomer = async (
  customerData: CreateCustomerRequest
): Promise<Customer> => {
  const response = await fetch(`${API_ENDPOINTS.CUSTOMERS}`, {
    method: HTTP_METHODS.POST,
    headers: {
      [HTTP_HEADERS.CONTENT_TYPE]: CONTENT_TYPES.JSON,
    },
    body: JSON.stringify(customerData),
  });
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.CREATE_CUSTOMER_ERROR);
  }
  const data: ApiResponse<Customer> = await response.json();
  return data.data;
};

export const updateCustomer = async (
  id: string,
  customerData: UpdateCustomerRequest
): Promise<Customer> => {
  const response = await fetch(`${API_ENDPOINTS.CUSTOMERS}${id}/`, {
    method: HTTP_METHODS.PUT,
    headers: {
      [HTTP_HEADERS.CONTENT_TYPE]: CONTENT_TYPES.JSON,
    },
    body: JSON.stringify(customerData),
  });
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.UPDATE_CUSTOMER_ERROR);
  }
  const data: ApiResponse<Customer> = await response.json();
  return data.data;
};

export const deleteCustomer = async (id: string): Promise<void> => {
  const response = await fetch(`${API_ENDPOINTS.CUSTOMERS}${id}/`, {
    method: HTTP_METHODS.DELETE,
  });
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.DELETE_CUSTOMER_ERROR);
  }
};

export const getCustomerPaymentHistory = async (customerId: string): Promise<PaymentTransaction[]> => {
  const response = await fetch(`${API_ENDPOINTS.CUSTOMERS}${customerId}/transactions/`);
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_PAYMENT_HISTORY_ERROR);
  }
  const data: ApiResponse<PaymentTransaction[]> = await response.json();
  return data.data;
};
