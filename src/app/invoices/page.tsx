"use client";

import { useRouter } from 'next/navigation';
import { Container, Title, Text, Group, Box } from "@mantine/core";
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { SIZES, COLORS } from "../../constants/ui";
import { useInvoices, useDeleteInvoice } from "../../hooks/useInvoices";
import { InvoicesTable } from "../../components/ui/InvoicesTable";
import {
  PAGE_TITLES,
  UI_TEXT,
  CONSOLE_MESSAGES,
  DELETE_MODAL_TITLES,
  DELETE_CONFIRMATION_MESSAGES,
  DELETE_LABELS,
  SUCCESS_NOTIFICATION_TITLES,
  DELETE_SUCCESS_MESSAGES,
  DELETE_ERROR_MESSAGES,
} from "../../constants/messages";
import { Invoice } from "../../types/invoice";
import classes from "./page.module.scss";

export default function InvoicesPage() {
  const router = useRouter();
  const { data: invoices, isLoading, error } = useInvoices();
  const deleteInvoiceMutation = useDeleteInvoice();

  const handleViewInvoice = (invoice: Invoice) => {
    console.log(CONSOLE_MESSAGES.VIEW_INVOICE, invoice);
    router.push(`/invoices/${invoice.id}`);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    console.log(CONSOLE_MESSAGES.EDIT_INVOICE, invoice);

  };

  const handleDeleteInvoice = (invoice: Invoice) => {
    modals.openConfirmModal({
      title: DELETE_MODAL_TITLES.DELETE_INVOICE,
      children: (
        <Text size="sm">
          {DELETE_CONFIRMATION_MESSAGES.INVOICE(invoice.invoice_number)}
        </Text>
      ),
      labels: { confirm: DELETE_LABELS.CONFIRM, cancel: DELETE_LABELS.CANCEL },
      confirmProps: { color: COLORS.DANGER },
      onConfirm: () => {
        deleteInvoiceMutation.mutate(invoice.id, {
          onSuccess: () => {
            notifications.show({
              title: SUCCESS_NOTIFICATION_TITLES.SUCCESS,
              message: DELETE_SUCCESS_MESSAGES.INVOICE(invoice.invoice_number),
              color: COLORS.SUCCESS,
            });
          },
          onError: (error: Error) => {
            notifications.show({
              title: SUCCESS_NOTIFICATION_TITLES.ERROR,
              message: DELETE_ERROR_MESSAGES.INVOICE(error.message),
              color: COLORS.DANGER,
            });
          },
        });
      },
    });
  };

  return (
      <Container size={SIZES.XL} className={classes.content}>
      <Group justify="space-between" align="flex-start" className={classes.pageHeader}>
        <Box>
          <Title order={1} className={classes.pageTitle}>
            {PAGE_TITLES.INVOICES}
          </Title>
          <Text c="dimmed" size={SIZES.LG}>
            {UI_TEXT.MANAGE_INVOICES_SUBTITLE}
          </Text>
        </Box>
      </Group>

      <Box className={classes.tableSection}>
        <InvoicesTable
          invoices={invoices || []}
          loading={isLoading}
          error={error?.message || null}
          onView={handleViewInvoice}
          onEdit={handleEditInvoice}
          onDelete={handleDeleteInvoice}
          onRowClick={handleViewInvoice}
        />
      </Box>

    </Container>
  );
}
