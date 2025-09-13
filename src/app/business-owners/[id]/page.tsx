'use client';

import React, { useState } from 'react';
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
  Loader,
  ScrollArea,
  Button
} from '@mantine/core';
import { IconArrowLeft, IconBuilding, IconPlus } from '@tabler/icons-react';
import { useBusinessOwner, useBusinessOwnerPaymentHistory } from '../../../hooks/useBusinessOwners';
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
import { StatsSection, createBusinessOwnerStats } from '../../../components/shared/StatsSection';
import { InvoicesTable } from '../../../components/ui/InvoicesTable';
import { PaymentHistoryTable } from '../../../components/ui/PaymentHistoryTable';
import { CreateInvoiceModal } from '../../../components/modals/invoice/CreateInvoiceModal';
import classes from './page.module.scss';

export default function BusinessOwnerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const businessOwnerId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [createInvoiceModalOpened, setCreateInvoiceModalOpened] = useState(false);
  
  const { data: businessOwner, isLoading, error } = useBusinessOwner(businessOwnerId!);
  const { data: invoices = [], isLoading: invoicesLoading, error: invoicesError } = useInvoices();
  const { data: transactions, isLoading: transactionsLoading, error: transactionsError } = useBusinessOwnerPaymentHistory(businessOwnerId!);

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

  if (error || !businessOwner) {
    return (
      <Container size={SIZES.XL} className={classes.content}>
        <Alert color={COLORS.DANGER} title={UI_TEXT.ERROR_TITLE}>
          {error?.message || ERROR_MESSAGES.FETCH_BUSINESS_OWNERS_ERROR}
        </Alert>
      </Container>
    );
  }


  const ownerInvoices = invoices.filter(invoice => 
    invoice.owner_name === businessOwner.company_name
  );


  const infoFields: DataField[] = [
    {
      key: TABLE_COLUMNS.BUSINESS_OWNERS[0].key,
      label: TABLE_HEADERS.COMPANY_NAME,
      value: businessOwner.company_name,
    }
  ];


  const stats = createBusinessOwnerStats(ownerInvoices);

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
          <IconBuilding size={ICON_SIZES.MD} />
          <Title order={2} fw={FONT_WEIGHTS.SEMIBOLD}>
            {MODAL_TEXT.BUSINESS_OWNER}
          </Title>
        </Group>
      </Group>

      <Box className={classes.detailSection}>
        <ScrollArea>
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
              <Group justify="space-between" mb={SIZES.MD}>
                <Title order={4} fw={FONT_WEIGHTS.SEMIBOLD}>
                  {MODAL_TEXT.ASSOCIATED_INVOICES}
                </Title>
                <Button
                  size={SIZES.SM}
                  color={COLORS.PRIMARY}
                  leftSection={<IconPlus size={ICON_SIZES.SM} />}
                  onClick={() => setCreateInvoiceModalOpened(true)}
                >
                  {UI_TEXT.CREATE_INVOICE}
                </Button>
              </Group>
              
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
                  invoices={ownerInvoices}
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
              showCustomer={true}
              showInvoice={true}
              onRowClick={handlePaymentHistoryRowClick}
            />
          </Stack>
        </ScrollArea>
      </Box>

      {}
      <CreateInvoiceModal
        opened={createInvoiceModalOpened}
        onClose={() => setCreateInvoiceModalOpened(false)}
        businessOwnerId={businessOwnerId!}
      />
    </Container>
  );
}