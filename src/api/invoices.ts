import {
  Invoice,
  CreateInvoiceRequest,
  UpdateInvoiceRequest,
  PaymentTransaction,
} from "../types/invoice";
import { ApiResponse } from "../types/api";
import {
  API_ENDPOINTS,
  HTTP_METHODS,
  HTTP_HEADERS,
  CONTENT_TYPES,
} from "../constants/urls";
import { ERROR_MESSAGES } from "../constants/messages";

export const getInvoices = async (): Promise<Invoice[]> => {
  const response = await fetch(`${API_ENDPOINTS.INVOICES}`);
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_INVOICES_ERROR);
  }
  const data: ApiResponse<Invoice[]> = await response.json();
  return data.data;
};

export const getInvoice = async (invoice_id: string): Promise<Invoice> => {
  const response = await fetch(`${API_ENDPOINTS.INVOICES}${invoice_id}/`);
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_INVOICES_ERROR);
  }
  const data: ApiResponse<Invoice> = await response.json();
  return data.data;
};

export const createInvoice = async (
  invoiceData: CreateInvoiceRequest
): Promise<Invoice> => {
  const response = await fetch(`${API_ENDPOINTS.INVOICES}`, {
    method: HTTP_METHODS.POST,
    headers: {
      [HTTP_HEADERS.CONTENT_TYPE]: CONTENT_TYPES.JSON,
    },
    body: JSON.stringify(invoiceData),
  });
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.CREATE_INVOICE_ERROR);
  }
  const data: ApiResponse<Invoice> = await response.json();
  return data.data;
};

export const updateInvoice = async (
  id: string,
  invoiceData: UpdateInvoiceRequest
): Promise<Invoice> => {
  const response = await fetch(`${API_ENDPOINTS.INVOICES}${id}/`, {
    method: HTTP_METHODS.PUT,
    headers: {
      [HTTP_HEADERS.CONTENT_TYPE]: CONTENT_TYPES.JSON,
    },
    body: JSON.stringify(invoiceData),
  });
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.UPDATE_INVOICE_ERROR);
  }
  const data: ApiResponse<Invoice> = await response.json();
  return data.data;
};

export const deleteInvoice = async (id: string): Promise<void> => {
  const response = await fetch(`${API_ENDPOINTS.INVOICES}${id}/`, {
    method: HTTP_METHODS.DELETE,
  });
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.DELETE_INVOICE_ERROR);
  }
};

export const getInvoicePaymentHistory = async (invoiceId: string): Promise<PaymentTransaction[]> => {
  const response = await fetch(`${API_ENDPOINTS.INVOICES}${invoiceId}/transactions/`);
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_PAYMENT_HISTORY_ERROR);
  }
  const data: ApiResponse<PaymentTransaction[]> = await response.json();
  return data.data;
};
