'use client';

import { Invoice } from '../../../types/invoice';
import { 
  MODAL_TEXT,
  TABLE_HEADERS,
  INVOICE_STATUSES 
} from '../../../constants/messages';
import { getStatusColor } from '../../../utils/formatters';
import { ModalHeader, StatusConfig } from '../../shared/ModalHeader';

interface InvoiceModalHeaderProps {
  invoice: Invoice;
}

export const InvoiceModalHeader = ({ invoice }: InvoiceModalHeaderProps) => {
  const status: StatusConfig = {
    value: invoice.status,
    label: INVOICE_STATUSES[invoice.status.toUpperCase() as keyof typeof INVOICE_STATUSES],
    color: getStatusColor(invoice.status),
  };

  return (
    <ModalHeader
      title={`#${invoice.id}`}
      subtitle={TABLE_HEADERS.INVOICE_NUMBER}
      status={status}
    />
  );
};
