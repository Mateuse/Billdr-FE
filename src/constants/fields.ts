


export const BUSINESS_OWNER_FIELDS = {
  ID: 'id',
  COMPANY_NAME: 'company_name',
} as const;


export const CUSTOMER_FIELDS = {
  ID: 'id',
  NAME: 'name',
  EMAIL: 'email',
} as const;


export const INVOICE_FIELDS = {
  ID: 'id',
  OWNER: 'owner',
  CUSTOMER: 'customer',
  OWNER_NAME: 'owner_name',
  CUSTOMER_NAME: 'customer_name',
  ISSUED_AT: 'issued_at',
  DUE_DATE: 'due_date',
  CURRENCY: 'currency',
  STATUS: 'status',
  UPDATED_AT: 'updated_at',
  TOTAL_AMOUNT: 'total_amount',
  AMOUNT_PAID: 'amount_paid',
  NUMBER: 'number',
} as const;


export const COMMON_FIELDS = {
  ID: 'id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
} as const;