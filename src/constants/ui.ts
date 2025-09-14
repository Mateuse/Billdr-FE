import { BUSINESS_OWNER_FIELDS, CUSTOMER_FIELDS } from './fields';
import { TABLE_COLUMN_KEYS } from './tableStrings';

export const COLORS = {
  PRIMARY: 'blue',
  SUCCESS: 'green',
  WARNING: 'orange',
  DANGER: 'red',
  GRAY: 'gray',
  DARK: 'dark',
};

export const VARIANTS = {
  FILLED: 'filled',
  LIGHT: 'light',
  OUTLINE: 'outline',
  SUBTLE: 'subtle',
  DEFAULT: 'default',
  GRADIENT: 'gradient',
};

export const SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const;

export const FONT_WEIGHTS = {
  NORMAL: 400,
  MEDIUM: 500,
  SEMIBOLD: 600,
  BOLD: 700,
  EXTRABOLD: 800,
};

export const ICON_SIZES = {
  XS: 12,
  SM: 16,
  MD: 20,
  LG: 24,
  XL: 32,
  XXL: 48,
} as const;

export const STATUS_COLORS = {
  DRAFT: COLORS.GRAY,
  SENT: COLORS.PRIMARY,
  PAID: COLORS.SUCCESS,
  OVERDUE: COLORS.DANGER,
  CANCELLED: COLORS.DARK,
} as const;

export const COMPONENT_PROPS = {
  UNDERLINE: {
    NEVER: 'never',
    HOVER: 'hover',
    ALWAYS: 'always',
  },
  COMPONENT: {
    HEADER: 'header',
    NAV: 'nav',
    MAIN: 'main',
    SECTION: 'section',
    ARTICLE: 'article',
  },
} as const;

export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 60,
} as const;

export const TITLE_SIZES = {
  SM: 24,
  MD: 32,
  LG: 40,
  XL: 48,
  XXL: 56,
} as const;

export const MAX_WIDTHS = {
  SM: 400,
  MD: 600,
  LG: 800,
  XL: 1200,
} as const;

export const BOOLEAN_VALUES = {
  TRUE: true,
  FALSE: false,
};

export const MODAL_SIZES = {
  XS: 'xs',
  SM: 'sm', 
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  FULL: 'full',
} as const;

export const TABLE_COLUMNS = {
  INVOICES: [
    { key: TABLE_COLUMN_KEYS.INVOICE_NUMBER, header: 'INVOICE_NUMBER', field: 'id' },
    { key: TABLE_COLUMN_KEYS.OWNER_NAME, header: 'OWNER_NAME', field: TABLE_COLUMN_KEYS.OWNER_NAME },
    { key: TABLE_COLUMN_KEYS.CUSTOMER_NAME, header: 'CUSTOMER_NAME', field: TABLE_COLUMN_KEYS.CUSTOMER_NAME },
    { key: TABLE_COLUMN_KEYS.AMOUNT, header: 'AMOUNT', field: 'total_amount' },
    { key: TABLE_COLUMN_KEYS.AMOUNT_PAID, header: 'AMOUNT_PAID', field: TABLE_COLUMN_KEYS.AMOUNT_PAID },
    { key: TABLE_COLUMN_KEYS.ISSUED_AT, header: 'ISSUED_AT', field: TABLE_COLUMN_KEYS.ISSUED_AT },
    { key: TABLE_COLUMN_KEYS.DUE_DATE, header: 'DUE_DATE', field: TABLE_COLUMN_KEYS.DUE_DATE },
    { key: TABLE_COLUMN_KEYS.STATUS, header: 'STATUS', field: TABLE_COLUMN_KEYS.STATUS },
    { key: TABLE_COLUMN_KEYS.ACTIONS, header: 'ACTIONS', field: null },
  ],
  BUSINESS_OWNERS: [
    { key: BUSINESS_OWNER_FIELDS.COMPANY_NAME, header: 'COMPANY_NAME', field: BUSINESS_OWNER_FIELDS.COMPANY_NAME },
    { key: TABLE_COLUMN_KEYS.ACTIONS, header: 'ACTIONS', field: null },
  ],
  CUSTOMERS: [
    { key: CUSTOMER_FIELDS.NAME, header: 'NAME', field: CUSTOMER_FIELDS.NAME },
    { key: CUSTOMER_FIELDS.EMAIL, header: 'EMAIL', field: CUSTOMER_FIELDS.EMAIL },
    { key: TABLE_COLUMN_KEYS.ACTIONS, header: 'ACTIONS', field: null },
  ],
};
