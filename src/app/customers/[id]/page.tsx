'use client';

import { useParams, useRouter } from 'next/navigation';
import { 
  Container, 
  Stack, 
  Divider, 
  Grid,
  Group,
  Title,
  ActionIcon,
  LoadingOverlay,
  Alert,
  Box,
  Text,
  Loader
} from '@mantine/core';
import { IconArrowLeft, IconUser } from '@tabler/icons-react';
import { useCustomer, useCustomerPaymentHistory } from '../../../hooks/useCustomers';
import { useInvoices } from '../../../hooks/useInvoices';
import { Invoice, PaymentTransaction } from '../../../types/invoice';
import { 
  SIZES, 
  FONT_WEIGHTS, 
  ICON_SIZES,
  COLORS,
  TABLE_COLUMNS
} from '../../../constants/ui';
import { 
  MODAL_TEXT,
  UI_TEXT,
  ERROR_MESSAGES,
  TABLE_HEADERS
} from '../../../constants/messages';
import { DataSection, DataField } from '../../../components/shared';
import { StatsSection, createCustomerStats } from '../../../components/shared/StatsSection';
import { InvoicesTable } from '../../../components/ui/InvoicesTable';
import { PaymentHistoryTable } from '../../../components/ui/PaymentHistoryTable';
import classes from './page.module.scss';

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const { data: customer, isLoading, error } = useCustomer(customerId!);
  const { data: invoices = [], isLoading: invoicesLoading, error: invoicesError } = useInvoices();
  const { data: transactions, isLoading: transactionsLoading, error: transactionsError } = useCustomerPaymentHistory(customerId!);

  const handleGoBack = () => {
    router.back();
  };

  const handleViewInvoice = (invoice: Invoice) => {
    router.push(`/invoices/${invoice.id}`);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    console.log('Edit invoice:', invoice);

  };

  const handleDeleteInvoice = (invoice: Invoice) => {
    console.log('Delete invoice:', invoice);

  };

  const handlePaymentHistoryRowClick = (transaction: PaymentTransaction) => {
    router.push(`/invoices/${transaction.invoice}`);
  };

  if (isLoading) {
    return (
      <Container size={SIZES.XL} className={classes.content}>
        <LoadingOverlay visible={true} />
      </Container>
    );
  }

  if (error || !customer) {
    return (
      <Container size={SIZES.XL} className={classes.content}>
        <Alert color={COLORS.DANGER} title={UI_TEXT.ERROR_TITLE}>
          {error?.message || 'Customer not found'}
        </Alert>
      </Container>
    );
  }


  const customerInvoices = invoices.filter(invoice => 
    invoice.customer_name === customer.name
  );


  const infoFields: DataField[] = [
    {
      key: TABLE_COLUMNS.CUSTOMERS[0].key,
      label: TABLE_HEADERS.NAME,
      value: customer.name,
    },
    {
      key: TABLE_COLUMNS.CUSTOMERS[1].key,
      label: TABLE_HEADERS.EMAIL,
      value: customer.email,
    }
  ];


  const stats = createCustomerStats(customerInvoices);

  return (
    <Container size={SIZES.XL} className={classes.content}>
      <Group gap={SIZES.MD} className={classes.pageHeader}>
        <ActionIcon
          variant="subtle"
          color={COLORS.PRIMARY}
          size={SIZES.LG}
          onClick={handleGoBack}
        >
          <IconArrowLeft size={ICON_SIZES.MD} />
        </ActionIcon>
        
        <Group gap={SIZES.SM}>
          <IconUser size={ICON_SIZES.MD} />
          <Title order={2} fw={FONT_WEIGHTS.SEMIBOLD}>
            {MODAL_TEXT.CUSTOMER}
          </Title>
        </Group>
      </Group>

      <Box className={classes.detailSection}>
        <Stack gap={SIZES.LG}>
          {}
          <DataSection
            fields={infoFields}
          />
          
          <Divider />
          
          {}
          <StatsSection
            title={MODAL_TEXT.INVOICE_STATISTICS}
            stats={stats}
          />
          
          <Divider />
          
          {}
          <Box>
            <Title order={4} fw={FONT_WEIGHTS.SEMIBOLD} mb={SIZES.MD}>
              {MODAL_TEXT.ASSOCIATED_INVOICES}
            </Title>
            
            {invoicesLoading ? (
              <Stack align="center" className={classes.loadingContainer}>
                <Loader size={SIZES.LG} />
                <Text mt={SIZES.MD} c="dimmed">
                  {UI_TEXT.LOADING_INVOICES}
                </Text>
              </Stack>
            ) : invoicesError ? (
              <Alert color={COLORS.DANGER} title={UI_TEXT.ERROR_TITLE}>
                {invoicesError.message}
              </Alert>
            ) : (
              <InvoicesTable
                invoices={customerInvoices}
                onView={handleViewInvoice}
                onEdit={handleEditInvoice}
                onDelete={handleDeleteInvoice}
              />
            )}
          </Box>
          
          <Divider />
          
          {}
          <PaymentHistoryTable
            transactions={transactions || []}
            loading={transactionsLoading}
            error={transactionsError?.message || null}
            showBusinessOwner={true}
            showInvoice={true}
            showRefunds={false}
            onRowClick={handlePaymentHistoryRowClick}
          />
        </Stack>
      </Box>
    </Container>
  );
}