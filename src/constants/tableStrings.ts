/**
 * Table-related string constants for consistent usage across the application
 * Centralizes all table column keys, headers, and cell type strings
 */

// Column type constants used in tableRenderer
export const CELL_TYPES = {
  TEXT: 'text',
  NUMBER: 'number',
  CURRENCY: 'currency',
  DATE: 'date',
  BADGE: 'badge',
  ACTIONS: 'actions',
} as const;

export type CellType = typeof CELL_TYPES[keyof typeof CELL_TYPES];

export const TABLE_COLUMN_KEYS = {
  INVOICE_NUMBER: 'invoice_number',
  OWNER_NAME: 'owner_name',
  CUSTOMER_NAME: 'customer_name',
  AMOUNT: 'amount',
  AMOUNT_PAID: 'amount_paid',
  ISSUED_AT: 'issued_at',
  DUE_DATE: 'due_date',
  STATUS: 'status',
  ACTIONS: 'actions',

  COMPANY_NAME: 'company_name',

  NAME: 'name',
  EMAIL: 'email',

  TRANSACTION_TIME: 'transaction_time',
  BUSINESS_OWNER_NAME: 'business_owner_name',
} as const;

export const PAYMENT_HISTORY_LABELS = {
  CUSTOMER: 'Customer',
  BUSINESS: 'Business',
  INVOICE: 'Invoice',
} as const;

export const PAYMENT_STATUS_TEXTS = {
  REQUIRES_PAYMENT_METHOD: 'Requires Payment Method',
  REQUIRES_CONFIRMATION: 'Requires Confirmation',
  REQUIRES_ACTION: 'Requires Action',
  PROCESSING: 'Processing',
  CANCELED: 'Canceled',
} as const;

export const TABLE_ACTIONS = {
  VIEW: 'view',
  EDIT: 'edit',
  DELETE: 'delete',
  REFUND: 'refund',
} as const;

export const TABLE_CSS_CLASSES = {
  INVOICE_NUMBER: 'invoiceNumber',
  AMOUNT: 'amount',
  COMPANY_NAME: 'companyName',
  CUSTOMER_NAME: 'customerName',
  CUSTOMER_EMAIL: 'customerEmail',
  ACTION_BUTTON: 'actionButton',
} as const;