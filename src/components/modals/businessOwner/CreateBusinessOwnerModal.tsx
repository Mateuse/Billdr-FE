'use client';

import React from 'react';
import { 
  Modal, 
  Stack, 
  Button, 
  Group,
  Title,
  Alert,
  TextInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconBuilding, IconCheck, IconX } from '@tabler/icons-react';
import { CreateBusinessOwnerRequest } from '../../../types/businessOwner';
import { useCreateBusinessOwner } from '../../../hooks/useBusinessOwners';
import { BUSINESS_OWNER_FIELDS } from '../../../constants/fields';
import { 
  SIZES, 
  FONT_WEIGHTS, 
  ICON_SIZES,
  COLORS
} from '../../../constants/ui';
import {
  MODAL_TEXT,
  UI_TEXT,
  FORM_VALIDATION,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  ERROR_MESSAGES_EXTENDED
} from '../../../constants/messages';
import classes from './BusinessOwnerModal.module.scss';

interface CreateBusinessOwnerModalProps {
  opened: boolean;
  onClose: () => void;
}

export const CreateBusinessOwnerModal = ({ 
  opened, 
  onClose
}: CreateBusinessOwnerModalProps) => {
  const createMutation = useCreateBusinessOwner();

  const form = useForm<CreateBusinessOwnerRequest>({
    initialValues: {
      [BUSINESS_OWNER_FIELDS.COMPANY_NAME]: '',
    },
    validate: {
      [BUSINESS_OWNER_FIELDS.COMPANY_NAME]: (value) => {
        if (!value?.trim()) {
          return FORM_VALIDATION.COMPANY_NAME_REQUIRED;
        }
        if (value.trim().length < 2) {
          return FORM_VALIDATION.COMPANY_NAME_MIN_LENGTH;
        }
        if (value.trim().length > 255) {
          return FORM_VALIDATION.COMPANY_NAME_MAX_LENGTH;
        }
        return null;
      },
    },
  });

  const handleSubmit = async (values: CreateBusinessOwnerRequest) => {
    console.log('values', values);
    try {
      await createMutation.mutateAsync({
        [BUSINESS_OWNER_FIELDS.COMPANY_NAME]: values[BUSINESS_OWNER_FIELDS.COMPANY_NAME].trim(),
      });
      
      notifications.show({
        title: SUCCESS_MESSAGES.BUSINESS_OWNER_CREATED_TITLE,
        message: SUCCESS_MESSAGES.BUSINESS_OWNER_CREATED_MESSAGE,
        color: COLORS.SUCCESS,
        icon: <IconCheck size={ICON_SIZES.SM} />,
      });
      
      form.reset();
      onClose();
    } catch (error) {
      console.error('Error creating business owner:', error);
      
      notifications.show({
        title: ERROR_MESSAGES_EXTENDED.CREATE_BUSINESS_OWNER_ERROR_TITLE,
        message: error instanceof Error ? error.message : ERROR_MESSAGES.CREATE_BUSINESS_OWNER_ERROR,
        color: COLORS.DANGER,
        icon: <IconX size={ICON_SIZES.SM} />,
      });
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        <Group gap={SIZES.SM}>
          <IconBuilding size={ICON_SIZES.MD} />
          <Title order={3} fw={FONT_WEIGHTS.SEMIBOLD}>
            {MODAL_TEXT.CREATE_BUSINESS_OWNER}
          </Title>
        </Group>
      }
      size={SIZES.MD}
      centered
      closeOnClickOutside={!createMutation.isPending}
      closeOnEscape={!createMutation.isPending}
      withCloseButton={!createMutation.isPending}
      classNames={{
        header: classes.modalHeader,
        body: classes.modalBody,
        content: classes.modalContent,
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={SIZES.MD}>
          {createMutation.error && (
            <Alert color={COLORS.DANGER} title={UI_TEXT.ERROR_TITLE}>
              {createMutation.error.message}
            </Alert>
          )}

          <TextInput
            label={UI_TEXT.COMPANY_NAME_LABEL}
            placeholder={UI_TEXT.COMPANY_NAME_PLACEHOLDER}
            required
            size={SIZES.SM}
            disabled={createMutation.isPending}
            {...form.getInputProps(BUSINESS_OWNER_FIELDS.COMPANY_NAME)}
          />

          <Group justify="flex-end" mt={SIZES.MD}>
            <Button
              variant="subtle"
              color={COLORS.GRAY}
              size={SIZES.SM}
              onClick={handleClose}
              disabled={createMutation.isPending}
            >
              {UI_TEXT.CANCEL}
            </Button>
            <Button
              type="submit"
              color={COLORS.PRIMARY}
              size={SIZES.SM}
              loading={createMutation.isPending}
              leftSection={<IconBuilding size={ICON_SIZES.SM} />}
            >
              {UI_TEXT.CREATE_BUSINESS_OWNER}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};