

import { LOCALES, CURRENCIES, CURRENCY_FORMAT_OPTIONS, DATE_FORMAT_OPTIONS } from '../constants/formatting';
import { STATUS_COLORS, COLORS } from '../constants/ui';
import { InvoiceStatus } from '../types/invoice';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat(LOCALES.US, {
    style: CURRENCY_FORMAT_OPTIONS.STYLE,
    currency: CURRENCIES.CAD,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()).toLocaleDateString(LOCALES.US, {
    year: DATE_FORMAT_OPTIONS.YEAR,
    month: DATE_FORMAT_OPTIONS.MONTH,
    day: DATE_FORMAT_OPTIONS.DAY,
  });
};

export const getStatusColor = (status: InvoiceStatus): string => {
  const statusColors = {
    draft: STATUS_COLORS.DRAFT,
    sent: STATUS_COLORS.SENT,
    paid: STATUS_COLORS.PAID,
    partial: STATUS_COLORS.SENT,
    refunded: STATUS_COLORS.CANCELLED,
    overdue: STATUS_COLORS.OVERDUE,
    cancelled: STATUS_COLORS.CANCELLED,
  };
  return statusColors[status] || STATUS_COLORS.DRAFT;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
