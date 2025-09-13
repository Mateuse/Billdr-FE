'use client';

import { Invoice } from '../../../types/invoice';
import { MODAL_TEXT } from '../../../constants/messages';
import { PartiesSection, Party } from '../../shared/PartiesSection';

interface InvoicePartiesSectionProps {
  invoice: Invoice;
}

export const InvoicePartiesSection = ({ invoice }: InvoicePartiesSectionProps) => {
  const parties: Party[] = [
    {
      title: MODAL_TEXT.BUSINESS_OWNER,
      name: invoice.owner_name,
      id: invoice.owner,
    },
    {
      title: MODAL_TEXT.CUSTOMER,
      name: invoice.customer_name,
      id: invoice.customer,
    },
  ];

  return (
    <PartiesSection
      title={MODAL_TEXT.PARTIES}
      parties={parties}
    />
  );
};