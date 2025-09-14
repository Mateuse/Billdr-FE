'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Stack,
  Group,
  Title,
  LoadingOverlay,
  Alert,
  Paper,
  Text,
  Button,
} from '@mantine/core';
import { IconFileText } from '@tabler/icons-react';
import { useInvoice } from '../../../hooks/useInvoices';
import { usePaymentSuccess } from '../../../hooks/usePayments';
import { 
  SIZES, 
  FONT_WEIGHTS, 
  ICON_SIZES,
  COLORS
} from '../../../constants/ui';
import { 
  UI_TEXT,
  ERROR_MESSAGES,
  BASE_TEXT
} from '../../../constants/messages';
import { InvoiceModalHeader } from '../../../components/modals/invoice/InvoiceModalHeader';
import { PaymentModal } from '../../../components/payments/PaymentModal';

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const invoiceId = Array.isArray(params.invoiceId) ? params.invoiceId[0] : params.invoiceId;
  
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  
  const { data: invoice, isLoading, error } = useInvoice(invoiceId!);
  const paymentSuccessMutation = usePaymentSuccess();

  const canPay = invoice &&
    invoice.status !== 'paid' &&
    invoice.status !== 'cancelled' &&
    (Number(invoice.total_amount) - Number(invoice.amount_paid)) > 0;

  useEffect(() => {
    if (invoice && canPay) {
      setPaymentModalOpen(true);
    }
  }, [invoice, canPay]);

  const handlePaymentSuccess = () => {
    paymentSuccessMutation.mutate(invoiceId!);
    setTimeout(() => {
      setPaymentModalOpen(false);
      router.push(`/invoices/${invoiceId}`);
    }, 2000);
  };

  const handlePaymentModalClose = () => {
    setPaymentModalOpen(false);
  };

  const handlePayNowClick = () => {
    setPaymentModalOpen(true);
  };



  if (isLoading) {
    return (
      <Container size={SIZES.XL} py={SIZES.XL}>
        <LoadingOverlay visible={true} />
      </Container>
    );
  }

  if (error || !invoice) {
    return (
      <Container size={SIZES.XL} py={SIZES.XL}>
        <Alert color={COLORS.DANGER} title={UI_TEXT.ERROR_TITLE}>
          {error?.message || ERROR_MESSAGES.FETCH_INVOICES_ERROR}
        </Alert>
      </Container>
    );
  }

  return (
    <Container size={SIZES.MD} py={SIZES.XL}>
      <Stack gap={SIZES.XL} align="center">
        {}
        <Group gap={SIZES.SM}>
          <IconFileText size={ICON_SIZES.LG} />
          <Title order={2} fw={FONT_WEIGHTS.SEMIBOLD} ta="center">
            {BASE_TEXT.PAYMENT} for Invoice #{invoice.invoice_number}
          </Title>
        </Group>

        {}
        <Paper p={SIZES.LG} w="100%" maw={600}>
          <InvoiceModalHeader invoice={invoice} />
        </Paper>

        {}
        {!canPay ? (
          <Paper p={SIZES.LG} w="100%" maw={600}>
            <Stack align="center" gap={SIZES.MD}>
              <Title order={3} ta="center" c={COLORS.SUCCESS}>
                Invoice Already Paid
              </Title>
              <Text ta="center" c="dimmed">
                This invoice has already been paid or cannot accept payments at this time.
              </Text>
              <Button 
                variant="light" 
                onClick={() => router.push(`/invoices/${invoiceId}`)}
              >
                View Invoice Details
              </Button>
            </Stack>
          </Paper>
        ) : (
          <Paper p={SIZES.LG} w="100%" maw={600}>
            <Stack align="center" gap={SIZES.MD}>
              <Title order={3} ta="center">
                Ready to Pay
              </Title>
              <Text ta="center" c="dimmed">
                Click the button below to complete your payment securely.
              </Text>
              <Button 
                size="lg"
                onClick={handlePayNowClick}
                leftSection={<IconFileText size={ICON_SIZES.SM} />}
              >
                {UI_TEXT.PAY_NOW}
              </Button>
            </Stack>
          </Paper>
        )}

        {}
        {invoice && (
          <PaymentModal
            opened={paymentModalOpen}
            onClose={handlePaymentModalClose}
            invoice={invoice}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}
      </Stack>
    </Container>
  );
}