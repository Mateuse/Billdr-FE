import React from 'react';
import { Text } from '@mantine/core';
import { COLORS, SIZES, FONT_WEIGHTS } from '../../constants/ui';
import { UI_TEXT } from '../../constants/messages';
import { INPUT_PROPERTIES } from '../../constants/payment';
import { CURRENCIES } from '../../constants/formatting';
import type { Invoice } from '../../types/invoice';

interface InvoiceSummaryProps {
  invoice: Invoice;
  remainingAmount: number;
}

export const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({
  invoice,
  remainingAmount,
}) => {
  return (
    <div>
      <Text size={SIZES.SM} c="dimmed">
        {UI_TEXT.INVOICE_TOTAL}: <Text component={INPUT_PROPERTIES.SPAN} fw={FONT_WEIGHTS.SEMIBOLD}>{INPUT_PROPERTIES.CURRENCY_SYMBOL}{Number(invoice.total_amount).toFixed(2)}</Text>
      </Text>
      <Text size={SIZES.SM} c="dimmed">
        {UI_TEXT.AMOUNT_PAID}: <Text component={INPUT_PROPERTIES.SPAN} fw={FONT_WEIGHTS.SEMIBOLD}>{INPUT_PROPERTIES.CURRENCY_SYMBOL}{Number(invoice.amount_paid).toFixed(2)}</Text>
      </Text>
      <Text size={SIZES.LG} fw={FONT_WEIGHTS.SEMIBOLD} c={COLORS.PRIMARY}>
        {UI_TEXT.AMOUNT_DUE}: {INPUT_PROPERTIES.CURRENCY_SYMBOL}{Number(remainingAmount).toFixed(2)} {invoice.currency || CURRENCIES.CAD}
      </Text>
    </div>
  );
};