'use client';

import React from 'react';
import {
  Modal,
  Stack,
  Divider,
  Group,
  Title
} from '@mantine/core';
import { IconFileText } from '@tabler/icons-react';
import { Invoice } from '../../../types/invoice';
import { 
  SIZES, 
  FONT_WEIGHTS, 
  ICON_SIZES
} from '../../../constants/ui';
import { 
  MODAL_TEXT
} from '../../../constants/messages';
import { InvoiceModalHeader } from './InvoiceModalHeader';
import { InvoiceDetailsSection } from './InvoiceDetailsSection';
import { InvoicePartiesSection } from './InvoicePartiesSection';
import classes from './InvoiceModal.module.scss';

interface InvoiceModalProps {
  opened: boolean;
  onClose: () => void;
  invoice: Invoice | null;
}

export const InvoiceModal = ({ opened, onClose, invoice }: InvoiceModalProps) => {
  if (!invoice) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap={SIZES.SM}>
          <IconFileText size={ICON_SIZES.MD} />
          <Title order={3} fw={FONT_WEIGHTS.SEMIBOLD}>
            {MODAL_TEXT.INVOICE_DETAILS}
          </Title>
        </Group>
      }
      size={SIZES.XL}
      centered
      closeOnClickOutside={false}
      closeOnEscape
      withCloseButton={true}
      classNames={{
        header: classes.modalHeader,
        body: classes.modalBody,
        content: classes.modalContent,
      }}
    >
      <Stack gap={SIZES.LG}>
        <InvoiceModalHeader invoice={invoice} />
        
        <Divider />
        
        <InvoiceDetailsSection invoice={invoice} />
        
        <Divider />
        
        <InvoicePartiesSection invoice={invoice} />
      </Stack>
    </Modal>
  );
};
