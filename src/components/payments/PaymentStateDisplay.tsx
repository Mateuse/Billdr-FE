import React from 'react';
import { Alert, LoadingOverlay, Button } from '@mantine/core';
import { IconAlertCircle, IconX } from '@tabler/icons-react';
import { COLORS, SIZES } from '../../constants/ui';
import { ICON_SIZES, COMPONENT_STYLES } from '../../constants/payment';
import { ERROR_MESSAGES, SUCCESS_MESSAGES, UI_TEXT } from '../../constants/messages';
import { PAYMENT_FORM_STATE, type PaymentFormStateType } from '../../constants/payment';

interface PaymentError {
  message?: string;
}

interface PaymentStateDisplayProps {
  modalState: PaymentFormStateType;
  isCreatingPaymentIntent: boolean;
  isPaymentIntentError: boolean;
  paymentIntentError: PaymentError | null;
  onRetry: () => void;
}

export const PaymentStateDisplay: React.FC<PaymentStateDisplayProps> = ({
  modalState,
  isCreatingPaymentIntent,
  isPaymentIntentError,
  paymentIntentError,
  onRetry,
}) => {
  const isLoading = modalState === PAYMENT_FORM_STATE.LOADING;
  const isError = modalState === PAYMENT_FORM_STATE.ERROR;
  const isSuccess = modalState === PAYMENT_FORM_STATE.SUCCESS;

  if (isLoading || isCreatingPaymentIntent) {
    return (
      <div style={{ position: COMPONENT_STYLES.POSITION_RELATIVE, minHeight: COMPONENT_STYLES.MIN_HEIGHT_200 }}>
        <LoadingOverlay visible={true} />
      </div>
    );
  }

  if (isPaymentIntentError || isError) {
    return (
      <Alert
        icon={<IconAlertCircle size={ICON_SIZES.SMALL} />}
        title={UI_TEXT.PAYMENT_SETUP_ERROR}
        color={COLORS.DANGER}
        withCloseButton={false}
      >
        <div style={{ display: COMPONENT_STYLES.DISPLAY_FLEX, flexDirection: COMPONENT_STYLES.FLEX_DIRECTION_COLUMN, gap: COMPONENT_STYLES.GAP_8 }}>
          <div>
            {paymentIntentError?.message || ERROR_MESSAGES.PAYMENT_INTENT_CREATION_ERROR}
          </div>
          <Button variant="outline" size={SIZES.XS} onClick={onRetry}>
            {UI_TEXT.RETRY}
          </Button>
        </div>
      </Alert>
    );
  }

  if (isSuccess) {
    return (
      <Alert
        icon={<IconX size={ICON_SIZES.SMALL} />}
        title={SUCCESS_MESSAGES.PAYMENT_SUCCESSFUL_TITLE}
        color={COLORS.SUCCESS}
      >
        {SUCCESS_MESSAGES.PAYMENT_SUCCESSFUL_MESSAGE}
      </Alert>
    );
  }

  return null;
};