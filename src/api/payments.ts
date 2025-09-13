import { ApiResponse } from "../types/api";
import { PaymentTransaction } from "../types/invoice";
import {
  API_ENDPOINTS,
  BASE_URL,
  HTTP_METHODS,
  HTTP_HEADERS,
  CONTENT_TYPES,
} from "../constants/urls";
import { PAYMENT_API } from "../constants/payment";
import { ERROR_MESSAGES } from "../constants/messages";

export interface CreatePaymentIntentRequest {
  customer_email?: string;
  payment_amount?: number;
}

export interface CreatePaymentIntentResponse {
  client_secret: string;
  payment_intent_id: string;
  amount: number;
  currency: string;
}

export const createPaymentIntent = async (
  invoiceId: string,
  request: CreatePaymentIntentRequest = {}
): Promise<CreatePaymentIntentResponse> => {
  const response = await fetch(
    `${API_ENDPOINTS.INVOICES}${PAYMENT_API.CREATE_INTENT(invoiceId)}`,
    {
      method: HTTP_METHODS.POST,
      headers: {
        [HTTP_HEADERS.CONTENT_TYPE]: CONTENT_TYPES.JSON,
      },
      body: JSON.stringify(request),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: ERROR_MESSAGES.PAYMENT_INTENT_CREATION_ERROR }));
    throw new Error(errorData.message || ERROR_MESSAGES.PAYMENT_INTENT_CREATION_ERROR);
  }

  const data: ApiResponse<CreatePaymentIntentResponse> = await response.json();
  return data.data;
};

export interface RefundPaymentResponse {
  payment_id: string;
  amount_refunded: number;
  currency: string;
  invoice_id: string;
  invoice_number: string;
}

export const refundPayment = async (
  stripePaymentId: string
): Promise<RefundPaymentResponse> => {
  const response = await fetch(
    `${BASE_URL}/api/${PAYMENT_API.REFUND(stripePaymentId)}`,
    {
      method: HTTP_METHODS.POST,
      headers: {
        [HTTP_HEADERS.CONTENT_TYPE]: CONTENT_TYPES.JSON,
      },
      body: JSON.stringify({}),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: ERROR_MESSAGES.REFUND_PROCESSING_ERROR }));
    throw new Error(errorData.message || ERROR_MESSAGES.REFUND_PROCESSING_ERROR);
  }

  const data: ApiResponse<RefundPaymentResponse> = await response.json();
  return data.data;
};

export const getAllPaymentHistory = async (): Promise<PaymentTransaction[]> => {
  const response = await fetch(`${API_ENDPOINTS.PAYMENT_HISTORY}`);
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_PAYMENT_HISTORY_ERROR);
  }
  const data: ApiResponse<PaymentTransaction[]> = await response.json();
  return data.data;
};

export const getPaymentHistoryById = async (paymentId: string): Promise<PaymentTransaction> => {
  const response = await fetch(`${API_ENDPOINTS.PAYMENT_HISTORY}${paymentId}/`);
  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.FETCH_PAYMENT_HISTORY_ERROR);
  }
  const data: ApiResponse<PaymentTransaction> = await response.json();
  return data.data;
};