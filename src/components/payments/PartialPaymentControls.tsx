import React from 'react';
import { Checkbox, NumberInput, Group } from '@mantine/core';
import { SIZES } from '../../constants/ui';
import { UI_TEXT } from '../../constants/messages';
import { CURRENCIES } from '../../constants/formatting';
import { PAYMENT_VALIDATION, INPUT_PROPERTIES, FLEX_ALIGNMENT } from '../../constants/payment';
import type { Invoice } from '../../types/invoice';

interface PartialPaymentControlsProps {
  invoice: Invoice;
  isPartialPayment: boolean;
  paymentAmount: number;
  remainingAmount: number;
  onPartialPaymentToggle: (checked: boolean) => void;
  onAmountChange: (amount: number) => void;
}

export const PartialPaymentControls: React.FC<PartialPaymentControlsProps> = ({
  invoice,
  isPartialPayment,
  paymentAmount,
  remainingAmount,
  onPartialPaymentToggle,
  onAmountChange,
}) => {
  const getAmountError = () => {
    if (paymentAmount > 0 && (paymentAmount < PAYMENT_VALIDATION.MIN_AMOUNT || paymentAmount > remainingAmount)) {
      return `Amount must be between $${PAYMENT_VALIDATION.MIN_AMOUNT.toFixed(2)} and $${remainingAmount.toFixed(2)}`;
    }
    return null;
  };

  return (
    <>
      <Group mt={SIZES.SM} align={FLEX_ALIGNMENT.FLEX_START}>
        <Checkbox
          checked={isPartialPayment}
          onChange={(event) => onPartialPaymentToggle(event.currentTarget.checked)}
          label={UI_TEXT.MAKE_PARTIAL_PAYMENT}
          size={SIZES.SM}
        />
      </Group>

      {isPartialPayment && (
        <NumberInput
          label={UI_TEXT.PAYMENT_AMOUNT}
          placeholder={UI_TEXT.ENTER_AMOUNT_TO_PAY}
          value={paymentAmount || INPUT_PROPERTIES.EMPTY_STRING}
          onChange={(value) => onAmountChange(Number(value) || 0)}
          min={PAYMENT_VALIDATION.MIN_AMOUNT}
          max={remainingAmount}
          step={0.01}
          precision={2}
          leftSection={INPUT_PROPERTIES.CURRENCY_SYMBOL}
          rightSection={<span style={{ fontSize: '0.875rem', color: 'var(--mantine-color-gray-6)' }}>{invoice.currency || CURRENCIES.CAD}</span>}
          rightSectionWidth={50}
          mt={SIZES.XS}
          required
          error={getAmountError()}
        />
      )}
    </>
  );
};