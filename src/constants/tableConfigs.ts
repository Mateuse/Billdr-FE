

import { TableConfig } from '../utils/tableRenderer';
import { BUSINESS_OWNER_FIELDS, CUSTOMER_FIELDS } from './fields';
import { COLORS, STATUS_COLORS } from './ui';
import { INVOICE_STATUSES } from './messages';
import { CELL_TYPES, TABLE_COLUMN_KEYS, TABLE_CSS_CLASSES } from './tableStrings';


export interface TableActionHandlers<T = Record<string, unknown>> {
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}


const INVOICE_STATUS_COLORS = {
  draft: STATUS_COLORS.DRAFT,
  sent: STATUS_COLORS.SENT,
  paid: STATUS_COLORS.PAID,
  overdue: STATUS_COLORS.OVERDUE,
  cancelled: STATUS_COLORS.CANCELLED,
  partial: COLORS.WARNING,
} as const;


export const INVOICES_TABLE_CONFIG: TableConfig = {
  columns: [
    {
      key: TABLE_COLUMN_KEYS.INVOICE_NUMBER,
      type: CELL_TYPES.TEXT,
      field: 'invoice_number',
      textStyle: {
        weight: 'MEDIUM',
        className: TABLE_CSS_CLASSES.INVOICE_NUMBER
      }
    },
    {
      key: TABLE_COLUMN_KEYS.OWNER_NAME,
      type: CELL_TYPES.TEXT,
      field: TABLE_COLUMN_KEYS.OWNER_NAME,
      textStyle: {
        size: 'XS'
      }
    },
    {
      key: TABLE_COLUMN_KEYS.CUSTOMER_NAME,
      type: CELL_TYPES.TEXT,
      field: TABLE_COLUMN_KEYS.CUSTOMER_NAME,
      textStyle: {
        size: 'SM',
        weight: 'MEDIUM'
      }
    },
    {
      key: TABLE_COLUMN_KEYS.AMOUNT,
      type: CELL_TYPES.CURRENCY,
      field: 'total_amount',
      textStyle: {
        weight: 'SEMIBOLD',
        className: TABLE_CSS_CLASSES.AMOUNT
      }
    },
    {
      key: TABLE_COLUMN_KEYS.AMOUNT_PAID,
      type: CELL_TYPES.CURRENCY,
      field: TABLE_COLUMN_KEYS.AMOUNT_PAID,
      textStyle: {
        weight: 'SEMIBOLD',
        className: TABLE_CSS_CLASSES.AMOUNT
      }
    },
    {
      key: TABLE_COLUMN_KEYS.ISSUED_AT,
      type: CELL_TYPES.DATE,
      field: TABLE_COLUMN_KEYS.ISSUED_AT,
      textStyle: {
        size: 'SM'
      }
    },
    {
      key: TABLE_COLUMN_KEYS.DUE_DATE,
      type: CELL_TYPES.DATE,
      field: TABLE_COLUMN_KEYS.DUE_DATE,
      textStyle: {
        size: 'SM'
      }
    },
    {
      key: TABLE_COLUMN_KEYS.STATUS,
      type: CELL_TYPES.BADGE,
      field: TABLE_COLUMN_KEYS.STATUS,
      badgeConfig: {
        colorMapping: INVOICE_STATUS_COLORS,
        statusMapping: INVOICE_STATUSES,
        size: 'SM'
      }
    },
    {
      key: TABLE_COLUMN_KEYS.ACTIONS,
      type: CELL_TYPES.ACTIONS,
      actionConfig: {
        view: {
          show: true,
          color: COLORS.PRIMARY
        },
        edit: {
          show: true,
          color: COLORS.WARNING
        },
        delete: {
          show: true,
          color: COLORS.DANGER
        }
      }
    }
  ],
  actionClassName: TABLE_CSS_CLASSES.ACTION_BUTTON
};


export const BUSINESS_OWNERS_TABLE_CONFIG: TableConfig = {
  columns: [
    {
      key: BUSINESS_OWNER_FIELDS.COMPANY_NAME,
      type: CELL_TYPES.TEXT,
      field: BUSINESS_OWNER_FIELDS.COMPANY_NAME,
      textStyle: {
        weight: 'MEDIUM',
        className: TABLE_CSS_CLASSES.COMPANY_NAME
      }
    },
    {
      key: TABLE_COLUMN_KEYS.ACTIONS,
      type: CELL_TYPES.ACTIONS,
      actionConfig: {
        view: {
          show: true,
          color: COLORS.PRIMARY
        },
        edit: {
          show: true,
          color: COLORS.WARNING
        },
        delete: {
          show: true,
          color: COLORS.DANGER
        }
      }
    }
  ],
  actionClassName: TABLE_CSS_CLASSES.ACTION_BUTTON
};


export const CUSTOMERS_TABLE_CONFIG: TableConfig = {
  columns: [
    {
      key: CUSTOMER_FIELDS.NAME,
      type: CELL_TYPES.TEXT,
      field: CUSTOMER_FIELDS.NAME,
      textStyle: {
        weight: 'MEDIUM',
        className: TABLE_CSS_CLASSES.CUSTOMER_NAME
      }
    },
    {
      key: CUSTOMER_FIELDS.EMAIL,
      type: CELL_TYPES.TEXT,
      field: CUSTOMER_FIELDS.EMAIL,
      textStyle: {
        size: 'SM',
        className: TABLE_CSS_CLASSES.CUSTOMER_EMAIL
      }
    },
    {
      key: TABLE_COLUMN_KEYS.ACTIONS,
      type: CELL_TYPES.ACTIONS,
      actionConfig: {
        view: {
          show: true,
          color: COLORS.PRIMARY
        },
        edit: {
          show: true,
          color: COLORS.WARNING
        },
        delete: {
          show: true,
          color: COLORS.DANGER
        }
      }
    }
  ],
  actionClassName: TABLE_CSS_CLASSES.ACTION_BUTTON
};


export const createInvoicesTableConfig = <T = Record<string, unknown>>(handlers: TableActionHandlers<T>) => ({
  ...INVOICES_TABLE_CONFIG,
  columns: INVOICES_TABLE_CONFIG.columns.map(col =>
    col.type === CELL_TYPES.ACTIONS ? {
      ...col,
      actionConfig: {
        view: { show: !!handlers.onView, handler: handlers.onView, color: COLORS.PRIMARY },
        delete: { show: !!handlers.onDelete, handler: handlers.onDelete, color: COLORS.DANGER }
      }
    } : col
  )
});

export const createBusinessOwnersTableConfig = <T = Record<string, unknown>>(handlers: TableActionHandlers<T>) => ({
  ...BUSINESS_OWNERS_TABLE_CONFIG,
  columns: BUSINESS_OWNERS_TABLE_CONFIG.columns.map(col =>
    col.type === CELL_TYPES.ACTIONS ? {
      ...col,
      actionConfig: {
        view: { show: !!handlers.onView, handler: handlers.onView, color: COLORS.PRIMARY },
        delete: { show: !!handlers.onDelete, handler: handlers.onDelete, color: COLORS.DANGER }
      }
    } : col
  )
});

export const createCustomersTableConfig = <T = Record<string, unknown>>(handlers: TableActionHandlers<T>) => ({
  ...CUSTOMERS_TABLE_CONFIG,
  columns: CUSTOMERS_TABLE_CONFIG.columns.map(col =>
    col.type === CELL_TYPES.ACTIONS ? {
      ...col,
      actionConfig: {
        view: { show: !!handlers.onView, handler: handlers.onView, color: COLORS.PRIMARY },
        delete: { show: !!handlers.onDelete, handler: handlers.onDelete, color: COLORS.DANGER }
      }
    } : col
  )
});