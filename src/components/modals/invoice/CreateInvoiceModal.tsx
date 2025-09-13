'use client';

import React from 'react';
import { 
  Modal, 
  Stack, 
  Button, 
  Group,
  Title,
  Alert,
  NumberInput,
  Select
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconReceipt, IconCheck, IconX } from '@tabler/icons-react';
import { CreateInvoiceRequest } from '../../../types/invoice';
import { Customer } from '../../../types/customer';
import { useCreateInvoice } from '../../../hooks/useInvoices';
import { useCustomers } from '../../../hooks/useCustomers';
import { INVOICE_FIELDS } from '../../../constants/fields';
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

interface CreateInvoiceModalProps {
  opened: boolean;
  onClose: () => void;
  businessOwnerId: string;
}

export const CreateInvoiceModal = ({ 
  opened, 
  onClose,
  businessOwnerId
}: CreateInvoiceModalProps) => {
  const createMutation = useCreateInvoice();
  const { data: customers = [], isLoading: customersLoading } = useCustomers();

  const form = useForm<CreateInvoiceRequest>({
    initialValues: {
      [INVOICE_FIELDS.OWNER]: businessOwnerId,
      [INVOICE_FIELDS.CUSTOMER]: '',
      [INVOICE_FIELDS.TOTAL_AMOUNT]: 0,
      [INVOICE_FIELDS.DUE_DATE]: '',
    },
    validate: {
      [INVOICE_FIELDS.CUSTOMER]: (value) => {
        if (!value?.trim()) {
          return FORM_VALIDATION.CUSTOMER_REQUIRED;
        }
        return null;
      },
      [INVOICE_FIELDS.TOTAL_AMOUNT]: (value) => {
        if (!value || value <= 0) {
          return FORM_VALIDATION.TOTAL_AMOUNT_MIN;
        }
        return null;
      },
      [INVOICE_FIELDS.DUE_DATE]: (value) => {
        if (!value) {
          return FORM_VALIDATION.DUE_DATE_REQUIRED;
        }
        const dueDate = new Date(value);
        const today = new Date();

        today.setHours(0, 0, 0, 0);
        dueDate.setHours(0, 0, 0, 0);
        if (dueDate < today) {
          return FORM_VALIDATION.DUE_DATE_FUTURE;
        }
        return null;
      },
    },
  });

  const handleSubmit = async (values: CreateInvoiceRequest) => {
    try {

      const dueDate = new Date(values[INVOICE_FIELDS.DUE_DATE]);

      dueDate.setHours(12, 0, 0, 0);
      
      const formattedValues = {
        ...values,
        [INVOICE_FIELDS.DUE_DATE]: dueDate.toISOString(),
      };

      await createMutation.mutateAsync(formattedValues);
      
      notifications.show({
        title: SUCCESS_MESSAGES.INVOICE_CREATED_TITLE,
        message: SUCCESS_MESSAGES.INVOICE_CREATED_MESSAGE,
        color: COLORS.SUCCESS,
        icon: <IconCheck size={ICON_SIZES.SM} />,
      });
      
      form.reset();
      onClose();
    } catch (error) {
      console.error('Error creating invoice:', error);
      
      notifications.show({
        title: ERROR_MESSAGES_EXTENDED.CREATE_INVOICE_ERROR_TITLE,
        message: error instanceof Error ? error.message : ERROR_MESSAGES.CREATE_INVOICE_ERROR,
        color: COLORS.DANGER,
        icon: <IconX size={ICON_SIZES.SM} />,
      });
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };


  const customerOptions = customers.map((customer: Customer) => ({
    value: customer.id,
    label: `${customer.name} (${customer.email})`,
  }));

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        <Group gap={SIZES.SM}>
          <IconReceipt size={ICON_SIZES.MD} />
          <Title order={3} fw={FONT_WEIGHTS.SEMIBOLD}>
            {MODAL_TEXT.CREATE_INVOICE}
          </Title>
        </Group>
      }
      size={SIZES.MD}
      centered
      closeOnClickOutside={!createMutation.isPending}
      closeOnEscape={!createMutation.isPending}
      withCloseButton={!createMutation.isPending}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={SIZES.MD}>
          {createMutation.error && (
            <Alert color={COLORS.DANGER} title={UI_TEXT.ERROR_TITLE}>
              {createMutation.error.message}
            </Alert>
          )}

          <Select
            label={UI_TEXT.CUSTOMER_LABEL}
            placeholder={UI_TEXT.CUSTOMER_PLACEHOLDER}
            required
            size={SIZES.SM}
            disabled={createMutation.isPending || customersLoading}
            data={customerOptions}
            searchable
            clearable
            {...form.getInputProps(INVOICE_FIELDS.CUSTOMER)}
          />

          <NumberInput
            label={UI_TEXT.TOTAL_AMOUNT_LABEL}
            placeholder={UI_TEXT.TOTAL_AMOUNT_PLACEHOLDER}
            required
            size={SIZES.SM}
            disabled={createMutation.isPending}
            min={0.01}
            step={0.01}
            precision={2}
            prefix="$"
            {...form.getInputProps(INVOICE_FIELDS.TOTAL_AMOUNT)}
          />

          <DatePickerInput
            label={UI_TEXT.DUE_DATE_LABEL}
            placeholder={UI_TEXT.DUE_DATE_PLACEHOLDER}
            required
            size={SIZES.SM}
            disabled={createMutation.isPending}
            minDate={new Date()}
            {...form.getInputProps(INVOICE_FIELDS.DUE_DATE)}
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
              leftSection={<IconReceipt size={ICON_SIZES.SM} />}
            >
              {UI_TEXT.CREATE_INVOICE}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};