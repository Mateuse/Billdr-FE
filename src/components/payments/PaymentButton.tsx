import React from 'react';
import { Button } from '@mantine/core';
import { SIZES } from '../../constants/ui';
import { PAYMENT_VALIDATION, INPUT_PROPERTIES } from '../../constants/payment';

interface PaymentButtonProps {
  isPartialPayment: boolean;
  paymentAmount: number;
  remainingAmount: number;
  isCreatingPaymentIntent: boolean;
  onClick: () => void;
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  isPartialPayment,
  paymentAmount,
  remainingAmount,
  isCreatingPaymentIntent,
  onClick,
}) => {
  const isDisabled = isPartialPayment && 
    (paymentAmount < PAYMENT_VALIDATION.MIN_AMOUNT || 
     paymentAmount > remainingAmount || 
     paymentAmount === 0);

  const buttonText = isPartialPayment 
    ? `Pay ${INPUT_PROPERTIES.CURRENCY_SYMBOL}${paymentAmount.toFixed(2)}`
    : `Pay Full Amount (${INPUT_PROPERTIES.CURRENCY_SYMBOL}${remainingAmount.toFixed(2)})`;

  return (
    <Button
      onClick={onClick}
      disabled={isDisabled}
      loading={isCreatingPaymentIntent}
      size={SIZES.MD}
      mt={SIZES.MD}
      fullWidth
    >
      {buttonText}
    </Button>
  );
};