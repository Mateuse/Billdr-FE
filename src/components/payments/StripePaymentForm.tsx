'use client';

import React, { useState, useEffect } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import {
  Box,
  Button,
  Stack,
  Alert,
  Text,
  LoadingOverlay,
} from '@mantine/core';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import {
  PAYMENT_FORM_STATE,
  type PaymentFormStateType,
  STRIPE_ELEMENT_OPTIONS,
  PAYMENT_INTENT_STATUS,
  STRIPE_ERROR_CODES,
  ICON_SIZES,
  INPUT_PROPERTIES,
  PAYMENT_DISPLAY_TEXT,
} from '../../constants/payment';
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  UI_TEXT,
} from '../../constants/messages';
import { COLORS, SIZES } from '../../constants/ui';
import { CURRENCIES } from '../../constants/formatting';
import type { Invoice } from '../../types/invoice';

interface StripePaymentFormProps {
  invoice: Invoice;
  paymentAmount?: number;
  onPaymentSuccess: () => void;
  onPaymentError: (error: string) => void;
}

export const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  invoice,
  paymentAmount,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [formState, setFormState] = useState<PaymentFormStateType>(PAYMENT_FORM_STATE.INITIAL);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setFormState(PAYMENT_FORM_STATE.INITIAL);
    setErrorMessage(null);
  }, []);

  const remainingAmount = Number(invoice.total_amount) - Number(invoice.amount_paid);
  const displayAmount = paymentAmount || remainingAmount;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage(ERROR_MESSAGES.PAYMENT_PROCESSING_ERROR);
      return;
    }

    setFormState(PAYMENT_FORM_STATE.PROCESSING);
    setErrorMessage(null);

    try {
      const {error: submitError} = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message || ERROR_MESSAGES.PAYMENT_PROCESSING_ERROR);
        setFormState(PAYMENT_FORM_STATE.ERROR);
        onPaymentError(submitError.message || ERROR_MESSAGES.PAYMENT_PROCESSING_ERROR);
        return;
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
        confirmParams: {
          return_url: `${window.location.origin}/invoices/${invoice.id}?payment=success`,
        },
      });

      if (error) {
        let errorMsg = ERROR_MESSAGES.PAYMENT_PROCESSING_ERROR;
        if (error.type === 'card_error') {
          switch (error.code) {
            case STRIPE_ERROR_CODES.CARD_DECLINED:
              errorMsg = ERROR_MESSAGES.CARD_DECLINED_ERROR;
              break;
            case STRIPE_ERROR_CODES.INSUFFICIENT_FUNDS:
              errorMsg = ERROR_MESSAGES.INSUFFICIENT_FUNDS_ERROR;
              break;
            case STRIPE_ERROR_CODES.EXPIRED_CARD:
              errorMsg = ERROR_MESSAGES.EXPIRED_CARD_ERROR;
              break;
            case STRIPE_ERROR_CODES.INCORRECT_CVC:
              errorMsg = ERROR_MESSAGES.INCORRECT_CVC_ERROR;
              break;
            default:
              errorMsg = error.message || ERROR_MESSAGES.CARD_DECLINED_ERROR;
          }
        } else if (error.type === 'validation_error') {
          errorMsg = error.message || ERROR_MESSAGES.PAYMENT_PROCESSING_ERROR;
        } else if (error.type === 'api_error' || error.code === 'payment_intent_authentication_failure') {
          errorMsg = 'Payment setup failed. Please close this window and try again.';
        } else {
          errorMsg = error.message || ERROR_MESSAGES.PAYMENT_PROCESSING_ERROR;
        }

        setErrorMessage(errorMsg);
        setFormState(PAYMENT_FORM_STATE.ERROR);
        onPaymentError(errorMsg);
        return;
      }

      if (paymentIntent) {
        if (paymentIntent.status === PAYMENT_INTENT_STATUS.SUCCEEDED) {
          setFormState(PAYMENT_FORM_STATE.SUCCESS);
          onPaymentSuccess();
        } else if (paymentIntent.status === PAYMENT_INTENT_STATUS.PROCESSING) {
          setFormState(PAYMENT_FORM_STATE.PROCESSING);
          onPaymentSuccess();
        } else if (paymentIntent.status === PAYMENT_INTENT_STATUS.REQUIRES_ACTION) {
          setFormState(PAYMENT_FORM_STATE.PROCESSING);
        } else {
          setErrorMessage(ERROR_MESSAGES.PAYMENT_INCOMPLETE_ERROR);
          setFormState(PAYMENT_FORM_STATE.ERROR);
          onPaymentError(ERROR_MESSAGES.PAYMENT_INCOMPLETE_ERROR);
        }
      } else {
        setErrorMessage(ERROR_MESSAGES.PAYMENT_PROCESSING_ERROR);
        setFormState(PAYMENT_FORM_STATE.ERROR);
        onPaymentError(ERROR_MESSAGES.PAYMENT_PROCESSING_ERROR);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : ERROR_MESSAGES.PAYMENT_PROCESSING_ERROR;
      setErrorMessage(errorMsg);
      setFormState(PAYMENT_FORM_STATE.ERROR);
      onPaymentError(errorMsg);
    }
  };

  const isLoading = formState === PAYMENT_FORM_STATE.PROCESSING;
  const isSuccess = formState === PAYMENT_FORM_STATE.SUCCESS;
  const isError = formState === PAYMENT_FORM_STATE.ERROR;

  if (isSuccess) {
    return (
      <Box>
        <Alert
          icon={<IconCheck size={ICON_SIZES.SMALL} />}
          title={SUCCESS_MESSAGES.PAYMENT_SUCCESSFUL_TITLE}
          color={COLORS.SUCCESS}
        >
          {SUCCESS_MESSAGES.PAYMENT_SUCCESSFUL_MESSAGE}
        </Alert>
      </Box>
    );
  }

  return (
    <Box pos={INPUT_PROPERTIES.POSITION_RELATIVE}>
      <LoadingOverlay visible={isLoading} />
      
      <form onSubmit={handleSubmit}>
        <Stack gap={SIZES.MD}>
          <Box>
            <Text size={SIZES.SM} c="dimmed" mb={SIZES.XS}>
              {PAYMENT_DISPLAY_TEXT.AMOUNT_TO_PAY} <Text component={INPUT_PROPERTIES.SPAN} fw={600}>{INPUT_PROPERTIES.CURRENCY_SYMBOL}{Number(displayAmount).toFixed(2)} {invoice.currency || CURRENCIES.CAD}</Text>
            </Text>
          </Box>

          <Box>
            <PaymentElement 
              options={STRIPE_ELEMENT_OPTIONS}
            />
          </Box>

          {isError && errorMessage && (
            <Alert
              icon={<IconAlertCircle size={ICON_SIZES.SMALL} />}
              title={PAYMENT_DISPLAY_TEXT.PAYMENT_ERROR_TITLE}
              color={COLORS.DANGER}
            >
              {errorMessage}
            </Alert>
          )}

          <Button
            type={INPUT_PROPERTIES.SUBMIT}
            loading={isLoading}
            disabled={!stripe || !elements || isLoading}
            size={SIZES.MD}
            fullWidth
          >
            {isLoading ? UI_TEXT.PAYMENT_PROCESSING : UI_TEXT.COMPLETE_PAYMENT}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};