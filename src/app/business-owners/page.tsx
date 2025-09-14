'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Title, Text, Button, Group, Box } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { BusinessOwnersTable } from '../../components/ui/BusinessOwnersTable';
import { CreateBusinessOwnerModal } from '../../components/modals/businessOwner/CreateBusinessOwnerModal';
import { useBusinessOwners, useDeleteBusinessOwner } from '../../hooks/useBusinessOwners';
import { BusinessOwner } from '../../types/businessOwner';
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

export default function BusinessOwnersPage() {
  const router = useRouter();
  const { data: businessOwners = [], isLoading, error } = useBusinessOwners();
  const deleteBusinessOwnerMutation = useDeleteBusinessOwner();
  
  const [createModalOpened, setCreateModalOpened] = useState(false);

  const handleView = (businessOwner: BusinessOwner) => {
    router.push(`/business-owners/${businessOwner.id}`);
  };

  const handleEdit = (businessOwner: BusinessOwner) => {
    console.log(CONSOLE_MESSAGES.EDIT_BUSINESS_OWNER, businessOwner);

  };

  const handleDelete = (businessOwner: BusinessOwner) => {
    modals.openConfirmModal({
      title: DELETE_MODAL_TITLES.DELETE_BUSINESS_OWNER,
      children: (
        <Text size="sm">
          {DELETE_CONFIRMATION_MESSAGES.BUSINESS_OWNER(businessOwner.company_name)}
        </Text>
      ),
      labels: { confirm: DELETE_LABELS.CONFIRM, cancel: DELETE_LABELS.CANCEL },
      confirmProps: { color: COLORS.DANGER },
      onConfirm: () => {
        deleteBusinessOwnerMutation.mutate(businessOwner.id, {
          onSuccess: () => {
            notifications.show({
              title: SUCCESS_NOTIFICATION_TITLES.SUCCESS,
              message: DELETE_SUCCESS_MESSAGES.BUSINESS_OWNER(businessOwner.company_name),
              color: COLORS.SUCCESS,
            });
          },
          onError: (error: Error) => {
            notifications.show({
              title: SUCCESS_NOTIFICATION_TITLES.ERROR,
              message: DELETE_ERROR_MESSAGES.BUSINESS_OWNER(error.message),
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
            {PAGE_TITLES.BUSINESS_OWNERS}
          </Title>
          <Text c="dimmed" size={SIZES.LG}>
            {UI_TEXT.MANAGE_BUSINESS_OWNERS_SUBTITLE}
          </Text>
        </Box>
        <Button
          leftSection={<IconPlus size={ICON_SIZES.SM} />}
          onClick={handleCreateNew}
          className={classes.createButton}
        >
          {UI_TEXT.CREATE_BUSINESS_OWNER}
        </Button>
      </Group>

      <Box className={classes.tableSection}>
        <BusinessOwnersTable
          businessOwners={businessOwners}
          loading={isLoading}
          error={error?.message || null}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Box>


      <CreateBusinessOwnerModal
        opened={createModalOpened}
        onClose={handleCloseCreateModal}
      />
    </Container>
  );
}
