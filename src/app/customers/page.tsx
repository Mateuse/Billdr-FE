'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Title, Text, Button, Group, Box } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { CustomersTable } from '../../components/ui/CustomersTable';
import { CreateCustomerModal } from '../../components/modals/customer/CreateCustomerModal';
import { useCustomers, useDeleteCustomer } from '../../hooks/useCustomers';
import { Customer } from '../../types/customer';
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
} from '../../constants/messages';
import { SIZES, ICON_SIZES, COLORS } from '../../constants/ui';
import classes from './page.module.scss';

export default function CustomersPage() {
  const router = useRouter();
  const { data: customers = [], isLoading, error } = useCustomers();
  const deleteCustomerMutation = useDeleteCustomer();
  
  const [createModalOpened, setCreateModalOpened] = useState(false);

  const handleView = (customer: Customer) => {
    router.push(`/customers/${customer.id}`);
  };

  const handleEdit = (customer: Customer) => {
    console.log(CONSOLE_MESSAGES.EDIT_CUSTOMER, customer);

  };

  const handleDelete = (customer: Customer) => {
    modals.openConfirmModal({
      title: DELETE_MODAL_TITLES.DELETE_CUSTOMER,
      children: (
        <Text size="sm">
          {DELETE_CONFIRMATION_MESSAGES.CUSTOMER(customer.name)}
        </Text>
      ),
      labels: { confirm: DELETE_LABELS.CONFIRM, cancel: DELETE_LABELS.CANCEL },
      confirmProps: { color: COLORS.DANGER },
      onConfirm: () => {
        deleteCustomerMutation.mutate(customer.id, {
          onSuccess: () => {
            notifications.show({
              title: SUCCESS_NOTIFICATION_TITLES.SUCCESS,
              message: DELETE_SUCCESS_MESSAGES.CUSTOMER(customer.name),
              color: COLORS.SUCCESS,
            });
          },
          onError: (error: Error) => {
            notifications.show({
              title: SUCCESS_NOTIFICATION_TITLES.ERROR,
              message: DELETE_ERROR_MESSAGES.CUSTOMER(error.message),
              color: COLORS.DANGER,
            });
          },
        });
      },
    });
  };

  const handleCreateNew = () => {
    setCreateModalOpened(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpened(false);
  };


  return (
    <Container size={SIZES.XL} className={classes.content}>
      <Group justify="space-between" align="flex-start" className={classes.pageHeader}>
        <Box>
          <Title order={1} className={classes.pageTitle}>
            {PAGE_TITLES.CUSTOMERS}
          </Title>
          <Text c="dimmed" size={SIZES.LG}>
            {UI_TEXT.MANAGE_CUSTOMERS_SUBTITLE}
          </Text>
        </Box>
        <Button
          leftSection={<IconPlus size={ICON_SIZES.SM} />}
          onClick={handleCreateNew}
          className={classes.createButton}
        >
          {UI_TEXT.CREATE_CUSTOMER}
        </Button>
      </Group>

      <Box className={classes.tableSection}>
        <CustomersTable
          customers={customers}
          loading={isLoading}
          error={error?.message || null}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Box>


      <CreateCustomerModal
        opened={createModalOpened}
        onClose={handleCloseCreateModal}
      />
    </Container>
  );
}
