


export const STRIPE_CONFIG = {
  PUBLIC_KEY_ENV: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  APPEARANCE_THEME: 'stripe' as const,
} as const;


export const PAYMENT_INTENT_STATUS = {
  REQUIRES_PAYMENT_METHOD: 'requires_payment_method',
  REQUIRES_CONFIRMATION: 'requires_confirmation',
  REQUIRES_ACTION: 'requires_action',
  PROCESSING: 'processing',
  SUCCEEDED: 'succeeded',
  CANCELED: 'canceled',
  REFUNDED: 'refunded',
} as const;


export const PAYMENT_FORM_STATE = {
  INITIAL: 'initial',
  LOADING: 'loading',
  PROCESSING: 'processing',
  SUCCESS: 'success',
  ERROR: 'error',
  CANCELLED: 'cancelled',
} as const;


export const STRIPE_ELEMENT_OPTIONS = {
  layout: 'tabs' as const,
  paymentMethodOrder: ['card'],
  fields: {
    billingDetails: 'auto' as const,
  },
  wallets: {
    applePay: 'never' as const,
    googlePay: 'never' as const,
  },
  terms: {
    card: 'never' as const,
  },
};

export const STRIPE_APPEARANCE_OPTIONS = {
  theme: STRIPE_CONFIG.APPEARANCE_THEME,
  variables: {
    colorPrimary: '#228be6',
    colorBackground: '#ffffff',
    colorText: '#212529',
    colorDanger: '#fa5252',
    fontFamily: 'system-ui, sans-serif',
    spacingUnit: '4px',
    borderRadius: '6px',
  },
  rules: {
    '.p-Link': {
      display: 'none !important',
    },
    '.p-Link-button': {
      display: 'none !important',
    },
    '.p-LinkAuthenticationElement': {
      display: 'none !important',
    },
    '[data-testid="link-authentication-element"]': {
      display: 'none !important',
    },
    '.LinkAuthenticationElement': {
      display: 'none !important',
    },
    '.p-PaymentMethodSelector-link': {
      display: 'none !important',
    },
  },
};


export const PAYMENT_API = {
  CREATE_INTENT: (invoiceId: string) => `${invoiceId}/create-payment-intent/`,
  REFUND: (stripePaymentId: string) => `payments/${stripePaymentId}/refund/`,
} as const;


export const PAYMENT_VALIDATION = {
  MIN_AMOUNT: 1.00,
  MAX_AMOUNT: 999999.99,
} as const;


export const PAYMENT_TIMING = {
  SUCCESS_DELAY_MS: 2000,
  RETRY_DELAY_MS: 100,
  STALE_TIME_MS: 0,
} as const;


export const QUERY_KEYS = {
  PAYMENT_INTENT: 'paymentIntent',
} as const;


export const PAYMENT_METHOD_TYPES = {
  CARD: 'card',
} as const;


export const STRIPE_ERROR_CODES = {
  CARD_DECLINED: 'card_declined',
  INSUFFICIENT_FUNDS: 'insufficient_funds',
  EXPIRED_CARD: 'expired_card',
  INCORRECT_CVC: 'incorrect_cvc',
  PROCESSING_ERROR: 'processing_error',
  AUTHENTICATION_FAILURE: 'payment_intent_authentication_failure',
} as const;


export const STRIPE_REDIRECT_OPTIONS = {
  IF_REQUIRED: 'if_required',
} as const;


export const COMPONENT_STYLES = {
  POSITION_RELATIVE: 'relative',
  MIN_HEIGHT_200: '200px',
  DISPLAY_FLEX: 'flex',
  FLEX_DIRECTION_COLUMN: 'column',
  GAP_8: '8px',
} as const;


export const ICON_SIZES = {
  SMALL: '1rem',
} as const;


export const FLEX_ALIGNMENT = {
  FLEX_START: 'flex-start',
} as const;


export const INPUT_PROPERTIES = {
  CURRENCY_SYMBOL: '$',
  EMPTY_STRING: '',
  SPAN: 'span',
  OUTLINE: 'outline',
  SUBMIT: 'submit',
  POSITION_RELATIVE: 'relative',
} as const;


export const PAYMENT_DISPLAY_TEXT = {
  AMOUNT_TO_PAY: 'Amount to pay:',
  PAYMENT_ERROR_TITLE: 'Payment Error',
} as const;

export type PaymentFormStateType = typeof PAYMENT_FORM_STATE[keyof typeof PAYMENT_FORM_STATE];
export type PaymentIntentStatusType = typeof PAYMENT_INTENT_STATUS[keyof typeof PAYMENT_INTENT_STATUS];
export type PaymentMethodType = typeof PAYMENT_METHOD_TYPES[keyof typeof PAYMENT_METHOD_TYPES];