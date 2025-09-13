
export const BASE_TEXT = {

  INVOICE: "Invoice",
  INVOICES: "Invoices",
  CUSTOMER: "Customer",
  CUSTOMERS: "Customers",
  BUSINESS_OWNER: "Business Owner",
  BUSINESS_OWNERS: "Business Owners",
  DASHBOARD: "Dashboard",
  OWNER: "Owner",
  COMPANY_NAME: "Company Name",
  NAME: "Name",
  EMAIL: "Email",
  AMOUNT: "Amount",
  AMOUNT_PAID: "Amount Paid",
  TOTAL_AMOUNT: "Total Amount",
  TOTAL_REVENUE: "Total Revenue",
  TOTAL_INVOICES: "Total Invoices",
  PENDING_AMOUNT: "Pending Amount",
  OUTSTANDING_BALANCE: "Outstanding Balance",
  ISSUED_AT: "Issued At",
  DUE_DATE: "Due Date",
  STATUS: "Status",
  ACTIONS: "Actions",
  ERROR: "Error",
  CLOSE: "Close",
  CANCEL: "Cancel",
  DATES: "Important Dates",
  CREATED_AT: "Created At",
  UPDATED_AT: "Updated At",
  PARTIES: "Parties Involved",
  REMAINING_BALANCE: "Remaining Balance",
  BALANCE: "Balance",
  PAYMENT_HISTORY: "Payment History",
  DATE: "Date",
  COMPLETED: "Completed",
  NO_PAYMENT_HISTORY: "No payment history",
  

  DRAFT: "Draft",
  SENT: "Sent",
  PAID: "Paid",
  OVERDUE: "Overdue",
  CANCELLED: "Cancelled",
  REFUNDED: "Refunded",
  

  CREATE: "Create",
  VIEW: "View",
  EDIT: "Edit",
  DELETE: "Delete",
  CONFIRM: "Confirm",
  SUCCESS: "Success",
  PAY_NOW: "Pay Now",
  REFUND: "Refund",
  PAYMENT: "Payment",
  PROCESSING: "Processing",
  COMPLETE_PAYMENT: "Complete Payment",
  

  LOADING: "Loading",
  LOADING_DATA: "Loading data...",
  

  GENERIC_ERROR: "Something went wrong",
  NO_DATA: "No data available",
  NETWORK_ERROR: "Network error occurred",
  CORS_ERROR: "CORS error - unable to connect to server",
} as const;

export const APP_METADATA = {
  TITLE: "Billdr Invoice Manager",
  DESCRIPTION: "Emanuel Mateus Take Home Project",
};

export const PAGE_TITLES = {
  INVOICES: BASE_TEXT.INVOICES,
  CUSTOMERS: BASE_TEXT.CUSTOMERS,
  BUSINESS_OWNERS: BASE_TEXT.BUSINESS_OWNERS,
  DASHBOARD: BASE_TEXT.DASHBOARD,
};

export const TABLE_HEADERS = {
  INVOICE_NUMBER: `${BASE_TEXT.INVOICE} #`,
  OWNER_NAME: BASE_TEXT.OWNER,
  CUSTOMER_NAME: BASE_TEXT.CUSTOMER,
  COMPANY_NAME: BASE_TEXT.COMPANY_NAME,
  NAME: BASE_TEXT.NAME,
  EMAIL: BASE_TEXT.EMAIL,
  AMOUNT_PAID: BASE_TEXT.AMOUNT_PAID,
  ISSUED_AT: BASE_TEXT.ISSUED_AT,
  AMOUNT: BASE_TEXT.AMOUNT,
  DUE_DATE: BASE_TEXT.DUE_DATE,
  STATUS: BASE_TEXT.STATUS,
  ACTIONS: BASE_TEXT.ACTIONS,
  TOTAL_INVOICES: BASE_TEXT.TOTAL_INVOICES,
  TOTAL_REVENUE: BASE_TEXT.TOTAL_REVENUE,
  TOTAL_AMOUNT: BASE_TEXT.TOTAL_AMOUNT,
  PENDING_AMOUNT: BASE_TEXT.PENDING_AMOUNT,
  OUTSTANDING_BALANCE: BASE_TEXT.OUTSTANDING_BALANCE,
};

export const STAT_KEYS = {
  TOTAL_INVOICES: "total_invoices",
  TOTAL_REVENUE: "total_revenue",
  TOTAL_AMOUNT: "total_amount",
  AMOUNT_PAID: "amount_paid",
  PENDING_AMOUNT: "pending_amount",
} as const;

export const STAT_ICONS = {
  RECEIPT: "receipt",
  CURRENCY: "currency",
  TRENDING: "trending",
  CLOCK: "clock",
} as const;

export const STAT_COLORS = {
  PRIMARY: "primary",
  SUCCESS: "success",
  WARNING: "warning",
  DANGER: "danger",
  GRAY: "gray",
  DARK: "dark",
} as const;

export const STAT_FORMATS = {
  CURRENCY: "currency",
  NUMBER: "number",
  PERCENTAGE: "percentage",
} as const;

export type StatIconType = typeof STAT_ICONS[keyof typeof STAT_ICONS];
export type StatColorType = typeof STAT_COLORS[keyof typeof STAT_COLORS];
export type StatFormatType = typeof STAT_FORMATS[keyof typeof STAT_FORMATS];

export interface StatConfig {
  key: string;
  label: string;
  valueKey: string;
  icon: StatIconType;
  color: StatColorType;
  format?: StatFormatType;
}

export const STAT_TYPES = {
  BUSINESS_OWNER: "business_owner",
  CUSTOMER: "customer",
} as const;



export const STAT_TYPE_CONFIGS: Record<string, StatConfig[]> = {
  [STAT_TYPES.BUSINESS_OWNER]: [
    {
      key: STAT_KEYS.TOTAL_INVOICES,
      label: TABLE_HEADERS.TOTAL_INVOICES,
      valueKey: 'totalInvoices',
      icon: STAT_ICONS.RECEIPT,
      color: STAT_COLORS.PRIMARY,
    },
    {
      key: STAT_KEYS.TOTAL_REVENUE,
      label: TABLE_HEADERS.TOTAL_REVENUE,
      valueKey: 'totalAmount',
      icon: STAT_ICONS.CURRENCY,
      color: STAT_COLORS.SUCCESS,
      format: STAT_FORMATS.CURRENCY,
    },
    {
      key: STAT_KEYS.AMOUNT_PAID,
      label: TABLE_HEADERS.AMOUNT_PAID,
      valueKey: 'totalPaid',
      icon: STAT_ICONS.TRENDING,
      color: STAT_COLORS.SUCCESS,
      format: STAT_FORMATS.CURRENCY,
    },
    {
      key: STAT_KEYS.PENDING_AMOUNT,
      label: TABLE_HEADERS.PENDING_AMOUNT,
      valueKey: 'pendingAmount',
      icon: STAT_ICONS.CLOCK,
      color: STAT_COLORS.WARNING,
      format: STAT_FORMATS.CURRENCY,
    },
  ],
  [STAT_TYPES.CUSTOMER]: [
    {
      key: STAT_KEYS.TOTAL_INVOICES,
      label: TABLE_HEADERS.TOTAL_INVOICES,
      valueKey: 'totalInvoices',
      icon: STAT_ICONS.RECEIPT,
      color: STAT_COLORS.PRIMARY,
    },
    {
      key: STAT_KEYS.TOTAL_AMOUNT,
      label: TABLE_HEADERS.TOTAL_AMOUNT,
      valueKey: 'totalAmount',
      icon: STAT_ICONS.CURRENCY,
      color: STAT_COLORS.PRIMARY,
      format: STAT_FORMATS.CURRENCY,
    },
    {
      key: STAT_KEYS.AMOUNT_PAID,
      label: TABLE_HEADERS.AMOUNT_PAID,
      valueKey: 'totalPaid',
      icon: STAT_ICONS.TRENDING,
      color: STAT_COLORS.SUCCESS,
      format: STAT_FORMATS.CURRENCY,
    },
    {
      key: STAT_KEYS.PENDING_AMOUNT,
      label: TABLE_HEADERS.OUTSTANDING_BALANCE,
      valueKey: 'pendingAmount',
      icon: STAT_ICONS.CLOCK,
      color: STAT_COLORS.WARNING,
      format: STAT_FORMATS.CURRENCY,
    },
  ],
} as const;

export const INVOICE_STATUSES = {
  DRAFT: BASE_TEXT.DRAFT,
  SENT: BASE_TEXT.SENT,
  PAID: BASE_TEXT.PAID,
  OVERDUE: BASE_TEXT.OVERDUE,
  CANCELLED: BASE_TEXT.CANCELLED,
};

export const LOADING_MESSAGES = {
  LOADING_INVOICES: `${BASE_TEXT.LOADING} ${BASE_TEXT.INVOICES.toLowerCase()}...`,
  LOADING_BUSINESS_OWNERS: `${BASE_TEXT.LOADING} ${BASE_TEXT.BUSINESS_OWNERS.toLowerCase()}...`,
  LOADING_CUSTOMERS: `${BASE_TEXT.LOADING} ${BASE_TEXT.CUSTOMERS.toLowerCase()}...`,
  LOADING_DATA: BASE_TEXT.LOADING_DATA,
};

export const ERROR_MESSAGES = {
  FETCH_INVOICES_ERROR: `Failed to load ${BASE_TEXT.INVOICES.toLowerCase()}`,
  CREATE_INVOICE_ERROR: `Failed to create ${BASE_TEXT.INVOICE.toLowerCase()}`,
  UPDATE_INVOICE_ERROR: `Failed to update ${BASE_TEXT.INVOICE.toLowerCase()}`,
  DELETE_INVOICE_ERROR: `Failed to delete ${BASE_TEXT.INVOICE.toLowerCase()}`,
  FETCH_BUSINESS_OWNERS_ERROR: `Failed to load ${BASE_TEXT.BUSINESS_OWNERS.toLowerCase()}`,
  CREATE_BUSINESS_OWNER_ERROR: `Failed to create ${BASE_TEXT.BUSINESS_OWNER.toLowerCase()}`,
  UPDATE_BUSINESS_OWNER_ERROR: `Failed to update ${BASE_TEXT.BUSINESS_OWNER.toLowerCase()}`,
  DELETE_BUSINESS_OWNER_ERROR: `Failed to delete ${BASE_TEXT.BUSINESS_OWNER.toLowerCase()}`,
  FETCH_CUSTOMERS_ERROR: `Failed to load ${BASE_TEXT.CUSTOMERS.toLowerCase()}`,
  CREATE_CUSTOMER_ERROR: `Failed to create ${BASE_TEXT.CUSTOMER.toLowerCase()}`,
  UPDATE_CUSTOMER_ERROR: `Failed to update ${BASE_TEXT.CUSTOMER.toLowerCase()}`,
  DELETE_CUSTOMER_ERROR: `Failed to delete ${BASE_TEXT.CUSTOMER.toLowerCase()}`,
  FETCH_PAYMENT_HISTORY_ERROR: "Failed to load payment history",
  PAYMENT_HISTORY_ERROR_TITLE: "Error loading payment history",
  PAYMENT_INTENT_CREATION_ERROR: "Failed to create payment intent",
  PAYMENT_PROCESSING_ERROR: "Payment processing failed",
  PAYMENT_CANCELLED_ERROR: "Payment was cancelled",
  PAYMENT_INCOMPLETE_ERROR: "Payment could not be completed",
  REFUND_PROCESSING_ERROR: "Refund processing failed",

  CARD_DECLINED_ERROR: "Your card was declined. Please try a different payment method.",
  INSUFFICIENT_FUNDS_ERROR: "Insufficient funds. Please try a different card or payment method.",
  EXPIRED_CARD_ERROR: "Your card has expired. Please use a different card.",
  INCORRECT_CVC_ERROR: "Your card's security code is incorrect. Please try again.",
  PROCESSING_ERROR: "An error occurred while processing your card. Please try again.",
  AUTHENTICATION_FAILURE_ERROR: "Authentication failed. Please try again.",
  GENERIC_ERROR: BASE_TEXT.GENERIC_ERROR,
  NO_DATA: BASE_TEXT.NO_DATA,
  NETWORK_ERROR: BASE_TEXT.NETWORK_ERROR,
  CORS_ERROR: BASE_TEXT.CORS_ERROR,
};

export const UI_TEXT = {
  ERROR_TITLE: BASE_TEXT.ERROR,
  CANCEL: BASE_TEXT.CANCEL,
  LOADING_INVOICES: LOADING_MESSAGES.LOADING_INVOICES,
  LOADING_BUSINESS_OWNERS: LOADING_MESSAGES.LOADING_BUSINESS_OWNERS,
  LOADING_CUSTOMERS: LOADING_MESSAGES.LOADING_CUSTOMERS,
  CREATE_INVOICE: `${BASE_TEXT.CREATE} ${BASE_TEXT.INVOICE}`,
  CREATE_BUSINESS_OWNER: `${BASE_TEXT.CREATE} ${BASE_TEXT.BUSINESS_OWNER}`,
  CREATE_CUSTOMER: `${BASE_TEXT.CREATE} ${BASE_TEXT.CUSTOMER}`,
  COMPANY_NAME_LABEL: BASE_TEXT.COMPANY_NAME,
  COMPANY_NAME_PLACEHOLDER: `Enter ${BASE_TEXT.COMPANY_NAME.toLowerCase()}`,
  NAME_LABEL: BASE_TEXT.NAME,
  NAME_PLACEHOLDER: `Enter ${BASE_TEXT.NAME.toLowerCase()}`,
  EMAIL_LABEL: BASE_TEXT.EMAIL,
  EMAIL_PLACEHOLDER: `Enter ${BASE_TEXT.EMAIL.toLowerCase()}`,
  TOTAL_AMOUNT_LABEL: BASE_TEXT.TOTAL_AMOUNT,
  TOTAL_AMOUNT_PLACEHOLDER: `Enter ${BASE_TEXT.TOTAL_AMOUNT.toLowerCase()}`,
  DUE_DATE_LABEL: BASE_TEXT.DUE_DATE,
  DUE_DATE_PLACEHOLDER: `Select ${BASE_TEXT.DUE_DATE.toLowerCase()}`,
  CUSTOMER_LABEL: BASE_TEXT.CUSTOMER,
  CUSTOMER_PLACEHOLDER: `Select a ${BASE_TEXT.CUSTOMER.toLowerCase()}`,
  MANAGE_INVOICES_SUBTITLE: `Manage your ${BASE_TEXT.INVOICES.toLowerCase()} and track payments`,
  MANAGE_BUSINESS_OWNERS_SUBTITLE: `Manage your ${BASE_TEXT.BUSINESS_OWNERS.toLowerCase()} and company information`,
  MANAGE_CUSTOMERS_SUBTITLE: `Manage your ${BASE_TEXT.CUSTOMERS.toLowerCase()} and contact information`,
  PAY_NOW: BASE_TEXT.PAY_NOW,
  PAYMENT_FORM_TITLE: `${BASE_TEXT.PAYMENT} for Invoice`,
  PAYMENT_PROCESSING: `${BASE_TEXT.PROCESSING} ${BASE_TEXT.PAYMENT.toLowerCase()}...`,
  COMPLETE_PAYMENT: BASE_TEXT.COMPLETE_PAYMENT,
  INVOICE_TOTAL: `${BASE_TEXT.INVOICE} Total`,
  AMOUNT_DUE: `${BASE_TEXT.AMOUNT} Due`,
  MAKE_PARTIAL_PAYMENT: "Make partial payment",
  PAYMENT_AMOUNT: "Payment Amount",
  ENTER_AMOUNT_TO_PAY: "Enter amount to pay",
  PAYMENT_SETUP_ERROR: "Payment Setup Error",
  REFUND_PROCESSED_SUCCESSFULLY: "Refund Processed Successfully",
  REFUND_FAILED: "Refund Failed", 
  COPY_PAYMENT_LINK: "Copy Payment Link",
  PAYMENT_LINK_COPIED: "Payment Link Copied",
  COPY_FAILED: "Copy Failed",
  PAYMENT_LINK_COPIED_MESSAGE: "The payment link has been copied to your clipboard",
  COPY_FAILED_MESSAGE: "Failed to copy payment link to clipboard",
  RETRY: "Retry",
};

export const CONSOLE_MESSAGES = {
  VIEW_INVOICE: `${BASE_TEXT.VIEW} ${BASE_TEXT.INVOICE.toLowerCase()}:`,
  EDIT_INVOICE: `${BASE_TEXT.EDIT} ${BASE_TEXT.INVOICE.toLowerCase()}:`,
  DELETE_INVOICE: `${BASE_TEXT.DELETE} ${BASE_TEXT.INVOICE.toLowerCase()}:`,
  CREATE_NEW_INVOICE: `${BASE_TEXT.CREATE} new ${BASE_TEXT.INVOICE.toLowerCase()}`,
  VIEW_BUSINESS_OWNER: `${BASE_TEXT.VIEW} ${BASE_TEXT.BUSINESS_OWNER.toLowerCase()}:`,
  EDIT_BUSINESS_OWNER: `${BASE_TEXT.EDIT} ${BASE_TEXT.BUSINESS_OWNER.toLowerCase()}:`,
  DELETE_BUSINESS_OWNER: `${BASE_TEXT.DELETE} ${BASE_TEXT.BUSINESS_OWNER.toLowerCase()}:`,
  CREATE_NEW_BUSINESS_OWNER: `${BASE_TEXT.CREATE} new ${BASE_TEXT.BUSINESS_OWNER.toLowerCase()}`,
  VIEW_CUSTOMER: `${BASE_TEXT.VIEW} ${BASE_TEXT.CUSTOMER.toLowerCase()}:`,
  EDIT_CUSTOMER: `${BASE_TEXT.EDIT} ${BASE_TEXT.CUSTOMER.toLowerCase()}:`,
  DELETE_CUSTOMER: `${BASE_TEXT.DELETE} ${BASE_TEXT.CUSTOMER.toLowerCase()}:`,
  CREATE_NEW_CUSTOMER: `${BASE_TEXT.CREATE} new ${BASE_TEXT.CUSTOMER.toLowerCase()}`,
  CREATING_PAYMENT_INTENT: "Creating payment intent with data:",
  PAYMENT_FAILED: "Payment failed:",
};

export const MODAL_TEXT = {
  INVOICE_DETAILS: `${BASE_TEXT.INVOICE} Details`,
  CLOSE: BASE_TEXT.CLOSE,
  INVOICE_INFO: `${BASE_TEXT.INVOICE} Information`,
  REMAINING_BALANCE: BASE_TEXT.REMAINING_BALANCE,
  DATES: BASE_TEXT.DATES,
  CREATED_AT: BASE_TEXT.CREATED_AT,
  UPDATED_AT: BASE_TEXT.UPDATED_AT,
  PARTIES: BASE_TEXT.PARTIES,
  BUSINESS_OWNER: `${BASE_TEXT.BUSINESS_OWNER} Details`,
  CUSTOMER: `${BASE_TEXT.CUSTOMER} Details`,
  CREATE_BUSINESS_OWNER: `${BASE_TEXT.CREATE} ${BASE_TEXT.BUSINESS_OWNER}`,
  CREATE_CUSTOMER: `${BASE_TEXT.CREATE} ${BASE_TEXT.CUSTOMER}`,
  CREATE_INVOICE: `${BASE_TEXT.CREATE} ${BASE_TEXT.INVOICE}`,
  BUSINESS_OWNER_INFO: `${BASE_TEXT.BUSINESS_OWNER} Information`,
  CUSTOMER_INFO: `${BASE_TEXT.CUSTOMER} Information`,
  INVOICE_STATISTICS: `${BASE_TEXT.INVOICE} Statistics`,
  ASSOCIATED_INVOICES: `Associated ${BASE_TEXT.INVOICES}`,
  BALANCE_DETAILS: `${BASE_TEXT.BALANCE} Details`,
};

export const FORM_VALIDATION = {
  COMPANY_NAME_REQUIRED: `${BASE_TEXT.COMPANY_NAME} is required`,
  COMPANY_NAME_MIN_LENGTH: `${BASE_TEXT.COMPANY_NAME} must be at least 2 characters`,
  COMPANY_NAME_MAX_LENGTH: `${BASE_TEXT.COMPANY_NAME} must be less than 255 characters`,
  NAME_REQUIRED: `${BASE_TEXT.NAME} is required`,
  NAME_MIN_LENGTH: `${BASE_TEXT.NAME} must be at least 2 characters`,
  NAME_MAX_LENGTH: `${BASE_TEXT.NAME} must be less than 255 characters`,
  EMAIL_REQUIRED: `${BASE_TEXT.EMAIL} is required`,
  EMAIL_INVALID: `Please enter a valid ${BASE_TEXT.EMAIL.toLowerCase()}`,
  TOTAL_AMOUNT_REQUIRED: `${BASE_TEXT.TOTAL_AMOUNT} is required`,
  TOTAL_AMOUNT_MIN: `${BASE_TEXT.TOTAL_AMOUNT} must be greater than 0`,
  DUE_DATE_REQUIRED: `${BASE_TEXT.DUE_DATE} is required`,
  DUE_DATE_FUTURE: `${BASE_TEXT.DUE_DATE} must be in the future`,
  CUSTOMER_REQUIRED: `${BASE_TEXT.CUSTOMER} is required`,
};

export const SUCCESS_MESSAGES = {
  BUSINESS_OWNER_CREATED_TITLE: `${BASE_TEXT.BUSINESS_OWNER} Created`,
  BUSINESS_OWNER_CREATED_MESSAGE: `${BASE_TEXT.BUSINESS_OWNER} has been successfully created`,
  CUSTOMER_CREATED_TITLE: `${BASE_TEXT.CUSTOMER} Created`,
  CUSTOMER_CREATED_MESSAGE: `${BASE_TEXT.CUSTOMER} has been successfully created`,
  INVOICE_CREATED_TITLE: `${BASE_TEXT.INVOICE} Created`,
  INVOICE_CREATED_MESSAGE: `${BASE_TEXT.INVOICE} has been successfully created`,
  PAYMENT_SUCCESSFUL_TITLE: `${BASE_TEXT.PAYMENT} ${BASE_TEXT.SUCCESS}`,
  PAYMENT_SUCCESSFUL_MESSAGE: `Your payment has been processed successfully`,
  PAYMENT_INTENT_CREATED_TITLE: `${BASE_TEXT.PAYMENT} Ready`,
  PAYMENT_INTENT_CREATED_MESSAGE: `Please complete your payment details`,
};

export const ERROR_MESSAGES_EXTENDED = {
  CREATE_BUSINESS_OWNER_ERROR_TITLE: `Failed to Create ${BASE_TEXT.BUSINESS_OWNER}`,
  CREATE_CUSTOMER_ERROR_TITLE: `Failed to Create ${BASE_TEXT.CUSTOMER}`,
  CREATE_INVOICE_ERROR_TITLE: `Failed to Create ${BASE_TEXT.INVOICE}`,
};

export const TODO_COMMENTS = {
  NAVIGATE_TO_DETAIL: "TODO: Navigate to invoice detail page",
  NAVIGATE_TO_EDIT: "TODO: Navigate to edit invoice page",
  SHOW_DELETE_MODAL: "TODO: Show confirmation modal and delete",
  NAVIGATE_TO_CREATE: "TODO: Navigate to create invoice page",
};


export const DELETE_MODAL_TITLES = {
  DELETE_INVOICE: `${BASE_TEXT.DELETE} ${BASE_TEXT.INVOICE}`,
  DELETE_BUSINESS_OWNER: `${BASE_TEXT.DELETE} ${BASE_TEXT.BUSINESS_OWNER}`,
  DELETE_CUSTOMER: `${BASE_TEXT.DELETE} ${BASE_TEXT.CUSTOMER}`,
};

export const DELETE_CONFIRMATION_MESSAGES = {
  INVOICE: (invoiceNumber: string) => 
    `Are you sure you want to delete invoice #${invoiceNumber}? This action cannot be undone.`,
  BUSINESS_OWNER: (companyName: string) => 
    `Are you sure you want to delete business owner "${companyName}"? This action cannot be undone and will also delete all associated invoices.`,
  CUSTOMER: (customerName: string) => 
    `Are you sure you want to delete customer "${customerName}"? This action cannot be undone and will also delete all associated invoices.`,
};

export const DELETE_LABELS = {
  CONFIRM: BASE_TEXT.DELETE,
  CANCEL: BASE_TEXT.CANCEL,
};

export const SUCCESS_NOTIFICATION_TITLES = {
  SUCCESS: BASE_TEXT.SUCCESS,
  ERROR: BASE_TEXT.ERROR,
};

export const DELETE_SUCCESS_MESSAGES = {
  INVOICE: (invoiceNumber: string) => `Invoice #${invoiceNumber} has been deleted successfully.`,
  BUSINESS_OWNER: (companyName: string) => `Business owner "${companyName}" has been deleted successfully.`,
  CUSTOMER: (customerName: string) => `Customer "${customerName}" has been deleted successfully.`,
};

export const DELETE_ERROR_MESSAGES = {
  INVOICE: (errorMessage: string) => `Failed to delete invoice: ${errorMessage}`,
  BUSINESS_OWNER: (errorMessage: string) => `Failed to delete business owner: ${errorMessage}`,
  CUSTOMER: (errorMessage: string) => `Failed to delete customer: ${errorMessage}`,
};


export const LANDING_PAGE = {
  WELCOME_TITLE: "Welcome to Billdr",
  WELCOME_SUBTITLE: "Your complete invoice management solution. Create, manage, and track invoices for your business with ease.",
  GET_STARTED: "Get Started",
  VIEW_INVOICES: "View Invoices",
  INVOICE_MANAGEMENT_TITLE: "Invoice Management",
  INVOICE_MANAGEMENT_DESCRIPTION: "Create, edit, and track your invoices with automatic numbering and payment status tracking.",
  CUSTOMER_MANAGEMENT_TITLE: "Customer Management", 
  CUSTOMER_MANAGEMENT_DESCRIPTION: "Keep track of your customers and their invoice history in one centralized location.",
  BUSINESS_OWNERS_TITLE: "Business Owners",
  BUSINESS_OWNERS_DESCRIPTION: "Manage multiple business entities and their associated invoices and customers.",
  MANAGE_INVOICES: `Manage ${BASE_TEXT.INVOICES}`,
  MANAGE_CUSTOMERS: `Manage ${BASE_TEXT.CUSTOMERS}`,
  MANAGE_BUSINESSES: "Manage Businesses",
};

