'use client';

import React from 'react';
import { Table, Text, Loader, Alert, Stack, Box } from '@mantine/core';
import { Invoice } from '../../types/invoice';
import { TABLE_HEADERS, ERROR_MESSAGES, UI_TEXT } from '../../constants/messages';
import { TABLE_COLUMNS, SIZES, COLORS } from '../../constants/ui';
import { renderTableCell } from '../../utils/tableRenderer';
import { createInvoicesTableConfig } from '../../constants/tableConfigs';
import classes from './InvoicesTable.module.scss';

interface InvoicesTableProps {
  invoices: Invoice[];
  loading?: boolean;
  error?: string | null;
  onView?: (invoice: Invoice) => void;
  onEdit?: (invoice: Invoice) => void;
  onDelete?: (invoice: Invoice) => void;
  onRowClick?: (invoice: Invoice) => void;
}

export const InvoicesTable = ({ 
  invoices, 
  loading = false, 
  error = null,
  onView,
  onEdit,
  onDelete,
  onRowClick
}: InvoicesTableProps) => {

  const tableConfig = createInvoicesTableConfig<Invoice>({ onView, onEdit, onDelete });
  

  const columns = TABLE_COLUMNS.INVOICES.map(col => ({
    ...col,
    header: TABLE_HEADERS[col.header as keyof typeof TABLE_HEADERS],
  }));

  if (loading) {
    return (
      <Stack align="center" className={classes.loadingContainer}>
        <Loader size={SIZES.LG} />
        <Text mt={SIZES.MD} c="dimmed">{UI_TEXT.LOADING_INVOICES}</Text>
      </Stack>
    );
  }

  if (error) {
    return (
      <Alert color={COLORS.DANGER} title={UI_TEXT.ERROR_TITLE}>
        {error}
      </Alert>
    );
  }

  if (!invoices || invoices.length === 0) {
    return (
      <Stack align="center" className={classes.emptyState}>
        <Text size={SIZES.LG} c="dimmed">
          {ERROR_MESSAGES.NO_DATA}
        </Text>
      </Stack>
    );
  }

  const handleRowClick = (invoice: Invoice, event: React.MouseEvent) => {

    const target = event.target as HTMLElement;
    if (target.closest('button') || target.closest('[role="button"]')) {
      return;
    }
    

    if (onRowClick) {
      onRowClick(invoice);
    } else if (onView) {
      onView(invoice);
    }
  };

  const rows = invoices.map((invoice) => (
    <Table.Tr 
      key={invoice.id} 
      className={`${classes.tableRow} ${(onRowClick || onView) ? classes.clickableRow : ''}`}
      onClick={(event) => handleRowClick(invoice, event)}
    >
      {tableConfig.columns.map((column) => (
        <Table.Td key={column.key}>
          {renderTableCell<Invoice>(column, invoice, { actionClassName: tableConfig.actionClassName })}
        </Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <Box className={classes.tableContainer}>
      <Table className={classes.table} highlightOnHover>
        <Table.Thead className={classes.tableHead}>
          <Table.Tr>
            {tableConfig.columns.map((column) => {
              const originalColumn = columns.find(col => col.key === column.key);
              return (
                <Table.Th key={column.key}>{originalColumn?.header}</Table.Th>
              );
            })}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Box>
  );
};