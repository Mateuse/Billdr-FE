'use client';

import { Table, Text, Loader, Alert, Stack, Box } from '@mantine/core';
import { Customer } from '../../types/customer';
import { TABLE_HEADERS, ERROR_MESSAGES, UI_TEXT } from '../../constants/messages';
import { TABLE_COLUMNS, SIZES, COLORS } from '../../constants/ui';
import { renderTableCell } from '../../utils/tableRenderer';
import { createCustomersTableConfig } from '../../constants/tableConfigs';
import classes from './CustomersTable.module.scss';

interface CustomersTableProps {
  customers: Customer[];
  loading?: boolean;
  error?: string | null;
  onView?: (customer: Customer) => void;
  onEdit?: (customer: Customer) => void;
  onDelete?: (customer: Customer) => void;
}

export const CustomersTable = ({ 
  customers, 
  loading = false, 
  error = null,
  onView,
  onEdit,
  onDelete 
}: CustomersTableProps) => {


  const tableConfig = createCustomersTableConfig<Customer>({ onView, onEdit, onDelete });
  

  const columns = TABLE_COLUMNS.CUSTOMERS.map(col => ({
    ...col,
    header: TABLE_HEADERS[col.header as keyof typeof TABLE_HEADERS],
  }));

  if (loading) {
    return (
      <Stack align="center" className={classes.loadingContainer}>
        <Loader size={SIZES.LG} />
        <Text mt={SIZES.MD} c="dimmed">{UI_TEXT.LOADING_CUSTOMERS}</Text>
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

  if (!customers || customers.length === 0) {
    return (
      <Stack align="center" className={classes.emptyState}>
        <Text size={SIZES.LG} c="dimmed">
          {ERROR_MESSAGES.NO_DATA}
        </Text>
      </Stack>
    );
  }

  const rows = customers.map((customer) => (
    <Table.Tr key={customer.id} className={classes.tableRow}>
      {tableConfig.columns.map((column) => (
        <Table.Td key={column.key}>
          {renderTableCell<Customer>(column, customer, { actionClassName: tableConfig.actionClassName })}
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