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
import { IconUser, IconCheck, IconX } from '@tabler/icons-react';
import { CreateCustomerRequest } from '../../../types/customer';
import { useCreateCustomer } from '../../../hooks/useCustomers';
import { CUSTOMER_FIELDS } from '../../../constants/fields';
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
import classes from './CustomerModal.module.scss';

interface CreateCustomerModalProps {
  opened: boolean;
  onClose: () => void;
}

export const CreateCustomerModal = ({ 
  opened, 
  onClose
}: CreateCustomerModalProps) => {
  const createMutation = useCreateCustomer();

  const form = useForm<CreateCustomerRequest>({
    initialValues: {
      [CUSTOMER_FIELDS.NAME]: '',
      [CUSTOMER_FIELDS.EMAIL]: '',
    },
    validate: {
      [CUSTOMER_FIELDS.NAME]: (value) => {
        if (!value?.trim()) {
          return FORM_VALIDATION.NAME_REQUIRED;
        }
        if (value.trim().length < 2) {
          return FORM_VALIDATION.NAME_MIN_LENGTH;
        }
        if (value.trim().length > 255) {
          return FORM_VALIDATION.NAME_MAX_LENGTH;
        }
        return null;
      },
      [CUSTOMER_FIELDS.EMAIL]: (value) => {
        if (!value?.trim()) {
          return FORM_VALIDATION.EMAIL_REQUIRED;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          return FORM_VALIDATION.EMAIL_INVALID;
        }
        return null;
      },
    },
  });

  const handleSubmit = async (values: CreateCustomerRequest) => {
    try {
      await createMutation.mutateAsync({
        [CUSTOMER_FIELDS.NAME]: values[CUSTOMER_FIELDS.NAME].trim(),
        [CUSTOMER_FIELDS.EMAIL]: values[CUSTOMER_FIELDS.EMAIL].trim().toLowerCase(),
      });
      
      notifications.show({
        title: SUCCESS_MESSAGES.CUSTOMER_CREATED_TITLE,
        message: SUCCESS_MESSAGES.CUSTOMER_CREATED_MESSAGE,
        color: COLORS.SUCCESS,
        icon: <IconCheck size={ICON_SIZES.SM} />,
      });
      
      form.reset();
      onClose();
    } catch (error) {
      console.error('Error creating customer:', error);
      
      notifications.show({
        title: ERROR_MESSAGES_EXTENDED.CREATE_CUSTOMER_ERROR_TITLE,
        message: error instanceof Error ? error.message : ERROR_MESSAGES.CREATE_CUSTOMER_ERROR,
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
          <IconUser size={ICON_SIZES.MD} />
          <Title order={3} fw={FONT_WEIGHTS.SEMIBOLD}>
            {MODAL_TEXT.CREATE_CUSTOMER}
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
            label={UI_TEXT.NAME_LABEL}
            placeholder={UI_TEXT.NAME_PLACEHOLDER}
            required
            size={SIZES.SM}
            disabled={createMutation.isPending}
            {...form.getInputProps(CUSTOMER_FIELDS.NAME)}
          />

          <TextInput
            label={UI_TEXT.EMAIL_LABEL}
            placeholder={UI_TEXT.EMAIL_PLACEHOLDER}
            required
            type="email"
            size={SIZES.SM}
            disabled={createMutation.isPending}
            {...form.getInputProps(CUSTOMER_FIELDS.EMAIL)}
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
              leftSection={<IconUser size={ICON_SIZES.SM} />}
            >
              {UI_TEXT.CREATE_CUSTOMER}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};