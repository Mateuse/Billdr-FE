

import { TableConfig } from '../utils/tableRenderer';
import { BUSINESS_OWNER_FIELDS, CUSTOMER_FIELDS } from './fields';
import { COLORS, STATUS_COLORS } from './ui';
import { INVOICE_STATUSES } from './messages';


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
      key: 'invoice_number',
      type: 'text',
      field: 'id',
      textStyle: {
        weight: 'MEDIUM',
        className: 'invoiceNumber'
      }
    },
    {
      key: 'owner_name',
      type: 'text',
      field: 'owner_name',
      textStyle: {
        size: 'XS'
      }
    },
    {
      key: 'customer_name', 
      type: 'text',
      field: 'customer_name',
      textStyle: {
        size: 'SM',
        weight: 'MEDIUM'
      }
    },
    {
      key: 'amount',
      type: 'currency',
      field: 'total_amount',
      textStyle: {
        weight: 'SEMIBOLD',
        className: 'amount'
      }
    },
    {
      key: 'amount_paid',
      type: 'currency', 
      field: 'amount_paid',
      textStyle: {
        weight: 'SEMIBOLD',
        className: 'amount'
      }
    },
    {
      key: 'issued_at',
      type: 'date',
      field: 'issued_at',
      textStyle: {
        size: 'SM'
      }
    },
    {
      key: 'due_date',
      type: 'date',
      field: 'due_date', 
      textStyle: {
        size: 'SM'
      }
    },
    {
      key: 'status',
      type: 'badge',
      field: 'status',
      badgeConfig: {
        colorMapping: INVOICE_STATUS_COLORS,
        statusMapping: INVOICE_STATUSES,
        size: 'SM'
      }
    },
    {
      key: 'actions',
      type: 'actions',
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
  actionClassName: 'actionButton'
};


export const BUSINESS_OWNERS_TABLE_CONFIG: TableConfig = {
  columns: [
    {
      key: BUSINESS_OWNER_FIELDS.COMPANY_NAME,
      type: 'text',
      field: BUSINESS_OWNER_FIELDS.COMPANY_NAME,
      textStyle: {
        weight: 'MEDIUM',
        className: 'companyName'
      }
    },
    {
      key: 'actions',
      type: 'actions',
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
  actionClassName: 'actionButton'
};


export const CUSTOMERS_TABLE_CONFIG: TableConfig = {
  columns: [
    {
      key: CUSTOMER_FIELDS.NAME,
      type: 'text',
      field: CUSTOMER_FIELDS.NAME,
      textStyle: {
        weight: 'MEDIUM',
        className: 'customerName'
      }
    },
    {
      key: CUSTOMER_FIELDS.EMAIL,
      type: 'text',
      field: CUSTOMER_FIELDS.EMAIL,
      textStyle: {
        size: 'SM',
        className: 'customerEmail'
      }
    },
    {
      key: 'actions',
      type: 'actions', 
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
  actionClassName: 'actionButton'
};


export const createInvoicesTableConfig = <T = Record<string, unknown>>(handlers: TableActionHandlers<T>) => ({
  ...INVOICES_TABLE_CONFIG,
  columns: INVOICES_TABLE_CONFIG.columns.map(col => 
    col.type === 'actions' ? {
      ...col,
      actionConfig: {
        view: { show: !!handlers.onView, handler: handlers.onView, color: COLORS.PRIMARY },
        edit: { show: !!handlers.onEdit, handler: handlers.onEdit, color: COLORS.WARNING },
        delete: { show: !!handlers.onDelete, handler: handlers.onDelete, color: COLORS.DANGER }
      }
    } : col
  )
});

export const createBusinessOwnersTableConfig = <T = Record<string, unknown>>(handlers: TableActionHandlers<T>) => ({
  ...BUSINESS_OWNERS_TABLE_CONFIG,
  columns: BUSINESS_OWNERS_TABLE_CONFIG.columns.map(col => 
    col.type === 'actions' ? {
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
    col.type === 'actions' ? {
      ...col,
      actionConfig: {
        view: { show: !!handlers.onView, handler: handlers.onView, color: COLORS.PRIMARY },
        delete: { show: !!handlers.onDelete, handler: handlers.onDelete, color: COLORS.DANGER }
      }
    } : col
  )
});