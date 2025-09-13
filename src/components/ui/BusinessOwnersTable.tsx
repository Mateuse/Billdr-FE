'use client';

import { Table, Text, Loader, Alert, Stack, Box } from '@mantine/core';
import { BusinessOwner } from '../../types/businessOwner';
import { TABLE_HEADERS, ERROR_MESSAGES, UI_TEXT } from '../../constants/messages';
import { TABLE_COLUMNS, SIZES, COLORS } from '../../constants/ui';
import { renderTableCell } from '../../utils/tableRenderer';
import { createBusinessOwnersTableConfig } from '../../constants/tableConfigs';
import classes from './BusinessOwnersTable.module.scss';

interface BusinessOwnersTableProps {
  businessOwners: BusinessOwner[];
  loading?: boolean;
  error?: string | null;
  onView?: (businessOwner: BusinessOwner) => void;
  onEdit?: (businessOwner: BusinessOwner) => void;
  onDelete?: (businessOwner: BusinessOwner) => void;
}

export const BusinessOwnersTable = ({ 
  businessOwners, 
  loading = false, 
  error = null,
  onView,
  onEdit,
  onDelete 
}: BusinessOwnersTableProps) => {


  const tableConfig = createBusinessOwnersTableConfig<BusinessOwner>({ onView, onEdit, onDelete });
  

  const columns = TABLE_COLUMNS.BUSINESS_OWNERS.map(col => ({
    ...col,
    header: TABLE_HEADERS[col.header as keyof typeof TABLE_HEADERS],
  }));

  if (loading) {
    return (
      <Stack align="center" className={classes.loadingContainer}>
        <Loader size={SIZES.LG} />
        <Text mt={SIZES.MD} c="dimmed">{UI_TEXT.LOADING_BUSINESS_OWNERS}</Text>
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

  if (!businessOwners || businessOwners.length === 0) {
    return (
      <Stack align="center" className={classes.emptyState}>
        <Text size={SIZES.LG} c="dimmed">
          {ERROR_MESSAGES.NO_DATA}
        </Text>
      </Stack>
    );
  }

  const rows = businessOwners.map((businessOwner) => (
    <Table.Tr key={businessOwner.id} className={classes.tableRow}>
      {tableConfig.columns.map((column) => (
        <Table.Td key={column.key}>
          {renderTableCell<BusinessOwner>(column, businessOwner, { actionClassName: tableConfig.actionClassName })}
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