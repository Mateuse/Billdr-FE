import React from 'react';
import { Stack } from '@mantine/core';
import { Elements } from '@stripe/react-stripe-js';
import { SIZES } from '../../constants/ui';
import { STRIPE_APPEARANCE_OPTIONS, PAYMENT_FORM_STATE } from '../../constants/payment';
import { InvoiceSummary } from './InvoiceSummary';
import { PartialPaymentControls } from './PartialPaymentControls';
import { PaymentButton } from './PaymentButton';
import { PaymentStateDisplay } from './PaymentStateDisplay';
import { StripePaymentForm } from './StripePaymentForm';
import type { Invoice } from '../../types/invoice';
import type { PaymentFormStateType } from '../../constants/payment';
import type { Stripe } from '@stripe/stripe-js';

interface PaymentError {
  message?: string;
}

interface PaymentContentProps {
  invoice: Invoice;
  stripePromise: Promise<Stripe | null>;
  remainingAmount: number;
  isPartialPayment: boolean;
  paymentAmount: number;
  modalState: PaymentFormStateType;
  clientSecret?: string;
  isCreatingPaymentIntent: boolean;
  isPaymentIntentError: boolean;
  paymentIntentError: PaymentError | null;
  onPartialPaymentToggle: (checked: boolean) => void;
  onAmountChange: (amount: number) => void;
  onCreatePaymentIntent: () => void;
  onPaymentSuccess: () => void;
  onPaymentError: (error: string) => void;
  onRetry: () => void;
}

export const PaymentContent: React.FC<PaymentContentProps> = ({
  invoice,
  stripePromise,
  remainingAmount,
  isPartialPayment,
  paymentAmount,
  modalState,
  clientSecret,
  isCreatingPaymentIntent,
  isPaymentIntentError,
  paymentIntentError,
  onPartialPaymentToggle,
  onAmountChange,
  onCreatePaymentIntent,
  onPaymentSuccess,
  onPaymentError,
  onRetry,
}) => {
  const shouldShowPaymentButton = !clientSecret && 
    modalState !== PAYMENT_FORM_STATE.LOADING && 
    modalState !== PAYMENT_FORM_STATE.ERROR && 
    !isPaymentIntentError;

  const shouldShowStripeForm = clientSecret && 
    modalState !== PAYMENT_FORM_STATE.LOADING && 
    modalState !== PAYMENT_FORM_STATE.ERROR && 
    modalState !== PAYMENT_FORM_STATE.SUCCESS;

  const stripeOptions = {
    clientSecret: clientSecret || undefined,
    appearance: STRIPE_APPEARANCE_OPTIONS,
  };

  return (
    <Stack gap={SIZES.MD}>
      <InvoiceSummary invoice={invoice} remainingAmount={remainingAmount} />
      
      <PartialPaymentControls
        invoice={invoice}
        isPartialPayment={isPartialPayment}
        paymentAmount={paymentAmount}
        remainingAmount={remainingAmount}
        onPartialPaymentToggle={onPartialPaymentToggle}
        onAmountChange={onAmountChange}
      />

      {shouldShowPaymentButton && (
        <PaymentButton
          isPartialPayment={isPartialPayment}
          paymentAmount={paymentAmount}
          remainingAmount={remainingAmount}
          isCreatingPaymentIntent={isCreatingPaymentIntent}
          onClick={onCreatePaymentIntent}
        />
      )}

      <PaymentStateDisplay
        modalState={modalState}
        isCreatingPaymentIntent={isCreatingPaymentIntent}
        isPaymentIntentError={isPaymentIntentError}
        paymentIntentError={paymentIntentError}
        onRetry={onRetry}
      />

      {shouldShowStripeForm && (
        <Elements
          key={clientSecret}
          stripe={stripePromise}
          options={stripeOptions}
        >
          <StripePaymentForm
            invoice={invoice}
            paymentAmount={isPartialPayment ? paymentAmount : undefined}
            onPaymentSuccess={onPaymentSuccess}
            onPaymentError={onPaymentError}
          />
        </Elements>
      )}
    </Stack>
  );
};