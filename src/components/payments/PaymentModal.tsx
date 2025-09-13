'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Modal } from '@mantine/core';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createPaymentIntent } from '../../api/payments';
import { PAYMENT_FORM_STATE, PAYMENT_VALIDATION, PAYMENT_TIMING, QUERY_KEYS, type PaymentFormStateType } from '../../constants/payment';
import { UI_TEXT, CONSOLE_MESSAGES } from '../../constants/messages';
import { MODAL_SIZES } from '../../constants/ui';
import { PaymentContent } from './PaymentContent';
import { QUERY_KEYS as INVOICE_QUERY_KEYS } from '../../hooks/useInvoices';
import type { Invoice } from '../../types/invoice';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentModalProps {
  opened: boolean;
  onClose: () => void;
  invoice: Invoice;
  onPaymentSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  opened,
  onClose,
  invoice,
  onPaymentSuccess,
}) => {
  const queryClient = useQueryClient();
  const [isPartialPayment, setIsPartialPayment] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [shouldCreateIntent, setShouldCreateIntent] = useState(false);
  const [modalState, setModalState] = useState<PaymentFormStateType>(PAYMENT_FORM_STATE.INITIAL);
  const [paymentAttemptId, setPaymentAttemptId] = useState<string>('');


  const remainingAmount = Number(invoice.total_amount) - Number(invoice.amount_paid);


  const {
    data: paymentIntentData,
    isLoading: isCreatingPaymentIntent,
    isError: isPaymentIntentError,
    error: paymentIntentError,
  } = useQuery({
    queryKey: [
      QUERY_KEYS.PAYMENT_INTENT,
      invoice.id,
      paymentAttemptId || 'no-attempt'
    ],
    queryFn: () => {
      const requestData = {
        ...(isPartialPayment && paymentAmount > 0 && { payment_amount: paymentAmount })
      };
      console.log(CONSOLE_MESSAGES.CREATING_PAYMENT_INTENT, requestData);
      return createPaymentIntent(invoice.id, requestData);
    },
    enabled: shouldCreateIntent &&
             opened &&
             paymentAttemptId &&
             modalState === PAYMENT_FORM_STATE.INITIAL && (
      isPartialPayment ?
        (paymentAmount >= PAYMENT_VALIDATION.MIN_AMOUNT && paymentAmount <= remainingAmount) :
        true
    ),
    retry: false,
    staleTime: PAYMENT_TIMING.STALE_TIME_MS,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const handleCreatePaymentIntent = () => {
    const isValidAmount = isPartialPayment ?
      (paymentAmount >= PAYMENT_VALIDATION.MIN_AMOUNT && paymentAmount <= remainingAmount) :
      true;

    if (isValidAmount) {
      const attemptId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setPaymentAttemptId(attemptId);
      setShouldCreateIntent(true);
    }
  };

  const handlePaymentSuccess = () => {
    setShouldCreateIntent(false);
    setPaymentAttemptId('');
    setModalState(PAYMENT_FORM_STATE.SUCCESS);

    queryClient.removeQueries({ queryKey: [QUERY_KEYS.PAYMENT_INTENT], exact: false });

    queryClient.invalidateQueries({ queryKey: INVOICE_QUERY_KEYS.INVOICES });
    queryClient.invalidateQueries({ queryKey: INVOICE_QUERY_KEYS.INVOICE(invoice.id) });
    queryClient.invalidateQueries({ queryKey: INVOICE_QUERY_KEYS.INVOICE_PAYMENT_HISTORY(invoice.id) });

    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: INVOICE_QUERY_KEYS.INVOICES });
      queryClient.invalidateQueries({ queryKey: INVOICE_QUERY_KEYS.INVOICE(invoice.id) });
      queryClient.invalidateQueries({ queryKey: INVOICE_QUERY_KEYS.INVOICE_PAYMENT_HISTORY(invoice.id) });
    }, 1000);

    onPaymentSuccess();
    setTimeout(() => {
      onClose();
      setModalState(PAYMENT_FORM_STATE.INITIAL);
      setIsPartialPayment(false);
      setPaymentAmount(remainingAmount);
    }, PAYMENT_TIMING.SUCCESS_DELAY_MS);
  };

  const handlePaymentError = (error: string) => {
    setModalState(PAYMENT_FORM_STATE.ERROR);
    console.error(CONSOLE_MESSAGES.PAYMENT_FAILED, error);

    queryClient.removeQueries({ queryKey: [QUERY_KEYS.PAYMENT_INTENT], exact: false });
    setShouldCreateIntent(false);
    setPaymentAttemptId('');
  };

  const handleCloseModal = () => {
    onClose();
    setModalState(PAYMENT_FORM_STATE.INITIAL);
    setIsPartialPayment(false);
    setPaymentAmount(remainingAmount);
    setShouldCreateIntent(false);
    setPaymentAttemptId('');

    queryClient.removeQueries({ queryKey: [QUERY_KEYS.PAYMENT_INTENT], exact: false });
  };


  useEffect(() => {
    if (!isPartialPayment) {
      setPaymentAmount(remainingAmount);
    }
  }, [isPartialPayment, remainingAmount]);


  useEffect(() => {
    if (opened) {
      setModalState(PAYMENT_FORM_STATE.INITIAL);
      setShouldCreateIntent(false);
      setIsPartialPayment(false);
      setPaymentAmount(remainingAmount);
      setPaymentAttemptId('');

      queryClient.removeQueries({ queryKey: [QUERY_KEYS.PAYMENT_INTENT], exact: false });
    }
  }, [opened, remainingAmount, queryClient]);


  const clientSecret = paymentIntentData?.client_secret || undefined;

  const handlePartialPaymentToggle = (checked: boolean) => {
    setIsPartialPayment(checked);
    if (!checked) {
      setPaymentAmount(remainingAmount);
    }
  };

  const handleAmountChange = (amount: number) => {
    setPaymentAmount(amount);
  };

  const handleRetry = () => {
    setModalState(PAYMENT_FORM_STATE.INITIAL);
    setShouldCreateIntent(false);
    setPaymentAttemptId('');
    queryClient.removeQueries({ queryKey: [QUERY_KEYS.PAYMENT_INTENT], exact: false });

    setTimeout(() => {
      const attemptId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setPaymentAttemptId(attemptId);
      setShouldCreateIntent(true);
    }, PAYMENT_TIMING.RETRY_DELAY_MS);
  };

  return (
    <Modal
      opened={opened}
      onClose={handleCloseModal}
      title={`${UI_TEXT.PAYMENT_FORM_TITLE} #${invoice.invoice_number}`}
      size={MODAL_SIZES.MD}
      centered
    >
      <PaymentContent
        invoice={invoice}
        stripePromise={stripePromise}
        remainingAmount={remainingAmount}
        isPartialPayment={isPartialPayment}
        paymentAmount={paymentAmount}
        modalState={modalState}
        clientSecret={clientSecret}
        isCreatingPaymentIntent={isCreatingPaymentIntent}
        isPaymentIntentError={isPaymentIntentError}
        paymentIntentError={paymentIntentError}
        onPartialPaymentToggle={handlePartialPaymentToggle}
        onAmountChange={handleAmountChange}
        onCreatePaymentIntent={handleCreatePaymentIntent}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentError={handlePaymentError}
        onRetry={handleRetry}
      />
    </Modal>
  );
};