

export interface Invoice {
  id: string;
  invoice_number: string;
  owner: string;
  owner_name: string;
  customer: string;
  customer_name: string;
  customer_email?: string;
  total_amount: number;
  due_date: string;
  status: InvoiceStatus;
  updated_at: string;
  issued_at: string;
  amount_paid: number;
  payment_status?: PaymentStatus;
  currency?: string;
  [key: string]: unknown;
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'partial' | 'overdue' | 'cancelled' | 'refunded';

export type PaymentStatus = 
  | 'requires_payment_method' 
  | 'requires_confirmation' 
  | 'requires_action' 
  | 'processing' 
  | 'succeeded' 
  | 'canceled' 
  | 'refunded';

export interface CreateInvoiceRequest {
  owner: string;
  customer: string;
  total_amount: number;
  due_date: string;
}

export interface UpdateInvoiceRequest extends Partial<CreateInvoiceRequest> {
  status?: InvoiceStatus;
}

export interface StripePaymentHistory {
  id: string;
  transaction_time: string;
  amount_paid: number;
  currency: string;
  customer: string;
  customer_name: string;
  business_owner: string;
  business_owner_name: string;
  invoice: string;
  invoice_number: string;
  transaction_type: 'payment' | 'refund';
  stripe_payment: string;
  status: PaymentStatus;
}


export type PaymentTransaction = StripePaymentHistory;
