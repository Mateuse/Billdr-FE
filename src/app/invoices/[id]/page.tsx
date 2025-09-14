'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Stack,
  Divider,
  Group,
  Title,
  ActionIcon,
  LoadingOverlay,
  Alert,
  Box,
  Button,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconArrowLeft, IconFileText, IconCreditCard, IconLink } from '@tabler/icons-react';
import { useInvoice, useInvoicePaymentHistory } from '../../../hooks/useInvoices';
import { usePaymentSuccess } from '../../../hooks/usePayments';
import { 
  SIZES, 
  FONT_WEIGHTS, 
  ICON_SIZES,
  COLORS
} from '../../../constants/ui';
import { 
  MODAL_TEXT,
  UI_TEXT,
  ERROR_MESSAGES
} from '../../../constants/messages';
import { InvoiceModalHeader } from '../../../components/modals/invoice/InvoiceModalHeader';
import { InvoiceDetailsSection } from '../../../components/modals/invoice/InvoiceDetailsSection';
import { InvoicePartiesSection } from '../../../components/modals/invoice/InvoicePartiesSection';
import { PaymentHistoryTable } from '../../../components/ui/PaymentHistoryTable';
import { PaymentModal } from '../../../components/payments/PaymentModal';
import { copyPaymentLinkToClipboard } from '../../../utils/paymentLinks';
import classes from './page.module.scss';

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const invoiceId = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  
  const { data: invoice, isLoading, error } = useInvoice(invoiceId!);
  const { data: transactions, isLoading: transactionsLoading, error: transactionsError } = useInvoicePaymentHistory(invoiceId!);
  const paymentSuccessMutation = usePaymentSuccess();

  const handleGoBack = () => {
    router.back();
  };

  const handlePayNowClick = () => {
    setPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {

    paymentSuccessMutation.mutate(invoiceId!);

    setTimeout(() => {
      setPaymentModalOpen(false);
    }, 2000);
  };

  const handlePaymentModalClose = () => {
    setPaymentModalOpen(false);

  };

  const handleCopyPaymentLink = async () => {
    try {
      await copyPaymentLinkToClipboard(invoiceId!);
      notifications.show({
        title: UI_TEXT.PAYMENT_LINK_COPIED,
        message: UI_TEXT.PAYMENT_LINK_COPIED_MESSAGE,
        color: COLORS.SUCCESS,
      });
    } catch {
      notifications.show({
        title: UI_TEXT.COPY_FAILED,
        message: UI_TEXT.COPY_FAILED_MESSAGE,
        color: COLORS.DANGER,
      });
    }
  };


  const canPay = invoice && 
    invoice.status !== 'paid' && 
    invoice.status !== 'cancelled' && 
    (Number(invoice.total_amount) - Number(invoice.amount_paid)) > 0;

  if (isLoading) {
    return (
      <Container size={SIZES.XL} className={classes.content}>
        <LoadingOverlay visible={true} />
      </Container>
    );
  }

  if (error || !invoice) {
    return (
      <Container size={SIZES.XL} className={classes.content}>
        <Alert color={COLORS.DANGER} title={UI_TEXT.ERROR_TITLE}>
          {error?.message || ERROR_MESSAGES.FETCH_INVOICES_ERROR}
        </Alert>
      </Container>
    );
  }

  return (
    <Container size={SIZES.XL} className={classes.content}>
      <Group justify="space-between" className={classes.pageHeader}>
        <Group gap={SIZES.MD}>
          <ActionIcon
            variant="subtle"
            color={COLORS.PRIMARY}
            size={SIZES.LG}
            onClick={handleGoBack}
          >
            <IconArrowLeft size={ICON_SIZES.MD} />
          </ActionIcon>
          
          <Group gap={SIZES.SM}>
            <IconFileText size={ICON_SIZES.MD} />
            <Title order={2} fw={FONT_WEIGHTS.SEMIBOLD}>
              {MODAL_TEXT.INVOICE_DETAILS}
            </Title>
          </Group>
        </Group>
        
        {canPay && (
          <Group gap={SIZES.SM}>
            <Button
              leftSection={<IconCreditCard size={ICON_SIZES.SM} />}
              onClick={handlePayNowClick}
              color={COLORS.SUCCESS}
              size={SIZES.SM}
            >
              {UI_TEXT.PAY_NOW}
            </Button>
            <Button
              leftSection={<IconLink size={ICON_SIZES.SM} />}
              onClick={handleCopyPaymentLink}
              variant="light"
              color={COLORS.PRIMARY}
              size={SIZES.SM}
            >
              {UI_TEXT.COPY_PAYMENT_LINK}
            </Button>
          </Group>
        )}
      </Group>

      <Box className={classes.detailSection}>
        <Stack gap={SIZES.LG}>
          <InvoiceModalHeader invoice={invoice} />
          
          <Divider />
          
          <InvoiceDetailsSection invoice={invoice} />
          
          <Divider />
          
          <InvoicePartiesSection invoice={invoice} />
          
          <Divider />
          
          <PaymentHistoryTable
            transactions={transactions || []}
            loading={transactionsLoading}
            error={transactionsError?.message || null}
            showRefunds={false}
          />
        </Stack>
      </Box>

      {}
      {invoice && (
        <PaymentModal
          opened={paymentModalOpen}
          onClose={handlePaymentModalClose}
          invoice={invoice}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </Container>
  );
}