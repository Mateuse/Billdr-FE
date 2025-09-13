'use client';

import { Grid } from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import { Invoice } from '../../../types/invoice';
import { 
  MODAL_TEXT,
  TABLE_HEADERS
} from '../../../constants/messages';
import { COLORS, SIZES, ICON_SIZES } from '../../../constants/ui';
import { FIELD_TYPES } from '../../../constants/formatting';
import { DataSection, DataField } from '../../shared/DataSection';

interface InvoiceDetailsSectionProps {
  invoice: Invoice;
}

export const InvoiceDetailsSection = ({ invoice }: InvoiceDetailsSectionProps) => {
  const infoFields: DataField[] = [
    {
      key: 'total_amount',
      label: TABLE_HEADERS.AMOUNT,
      value: invoice.total_amount,
      type: FIELD_TYPES.CURRENCY,
    },
    {
      key: 'amount_paid',
      label: TABLE_HEADERS.AMOUNT_PAID,
      value: invoice.amount_paid,
      type: FIELD_TYPES.CURRENCY,
    },
    {
      key: 'remaining_balance',
      label: MODAL_TEXT.REMAINING_BALANCE,
      value: invoice.total_amount - invoice.amount_paid,
      type: FIELD_TYPES.CURRENCY,
      color: invoice.total_amount - invoice.amount_paid > 0 ? COLORS.DANGER : COLORS.SUCCESS,
    },
  ];

  const dateFields: DataField[] = [
    {
      key: 'issued_at',
      label: TABLE_HEADERS.ISSUED_AT,
      value: invoice.issued_at,
      type: 'date',
    },
    {
      key: 'due_date',
      label: TABLE_HEADERS.DUE_DATE,
      value: invoice.due_date,
      type: 'date',
    },
    {
      key: 'updated_at',
      label: MODAL_TEXT.UPDATED_AT,
      value: invoice.updated_at,
      type: 'date',
    },
  ];

  return (
    <Grid gutter={SIZES.LG} align="stretch">
      <Grid.Col span={{ base: 12, md: 6 }}>
        <DataSection title={MODAL_TEXT.BALANCE_DETAILS} fields={infoFields} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <DataSection
          title={MODAL_TEXT.DATES}
          icon={<IconCalendar size={ICON_SIZES.SM} />}
          fields={dateFields}
        />
      </Grid.Col>
    </Grid>
  );
};