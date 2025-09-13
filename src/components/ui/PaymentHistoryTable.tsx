import { Table, Text, Stack, Title, Alert, Center, Loader, Button, Group } from '@mantine/core';
import { IconCurrencyDollar, IconCalendar, IconReceipt, IconUser, IconBuilding, IconFileText, IconArrowBackUp } from '@tabler/icons-react';
import { PaymentTransaction } from '../../types/invoice';
import { SIZES, COLORS, ICON_SIZES } from '../../constants/ui';
import { BASE_TEXT, ERROR_MESSAGES } from '../../constants/messages';
import { useRefundPayment } from '../../hooks/usePayments';
import { useState } from 'react';

interface PaymentHistoryTableColumn {
  key: keyof PaymentTransaction | 'status' | 'actions';
  label: string;
  icon?: React.ReactNode;
  visible: boolean;
  render?: (transaction: PaymentTransaction) => React.ReactNode;
}

interface PaymentHistoryTableProps {
  transactions: PaymentTransaction[];
  loading?: boolean;
  error?: string | null;
  showCustomer?: boolean;
  showBusinessOwner?: boolean;
  showInvoice?: boolean;
  showRefunds?: boolean;
  title?: string;
  onRowClick?: (transaction: PaymentTransaction) => void;
}

export function PaymentHistoryTable({
  transactions,
  loading = false,
  error,
  showCustomer = false,
  showBusinessOwner = false,
  showInvoice = false,
  showRefunds = true,
  title = BASE_TEXT.PAYMENT_HISTORY,
  onRowClick
}: PaymentHistoryTableProps) {
  const refundMutation = useRefundPayment();
  const [refundingPaymentId, setRefundingPaymentId] = useState<string | null>(null);


  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: currency || 'CAD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  const handleRefund = (transaction: PaymentTransaction) => {
    if (transaction.stripe_payment && transaction.transaction_type === 'payment') {
      setRefundingPaymentId(transaction.stripe_payment);
      refundMutation.mutate(transaction.stripe_payment, {
        onSettled: () => {

          setRefundingPaymentId(null);
        }
      });
    }
  };


  const allColumns: PaymentHistoryTableColumn[] = [
    {
      key: 'amount_paid',
      label: BASE_TEXT.AMOUNT,
      icon: <IconCurrencyDollar size={ICON_SIZES.SM} />,
      visible: true,
      render: (transaction) => (
        <Group gap={SIZES.XS} align="center">
          {transaction.transaction_type === 'refund' && <IconArrowBackUp size={ICON_SIZES.SM} color="orange" />}
          <Text fw={500} c={transaction.transaction_type === 'refund' ? 'orange' : undefined}>
            {transaction.transaction_type === 'refund' ? '-' : ''}
            {formatCurrency(Math.abs(transaction.amount_paid), transaction.currency)}
          </Text>
        </Group>
      )
    },
    {
      key: 'customer_name',
      label: 'Customer',
      icon: <IconUser size={ICON_SIZES.SM} />,
      visible: showCustomer,
      render: (transaction) => (
        <Text size={SIZES.SM}>
          {transaction.customer_name}
        </Text>
      )
    },
    {
      key: 'business_owner_name',
      label: 'Business',
      icon: <IconBuilding size={ICON_SIZES.SM} />,
      visible: showBusinessOwner,
      render: (transaction) => (
        <Text size={SIZES.SM}>
          {transaction.business_owner_name}
        </Text>
      )
    },
    {
      key: 'invoice_number',
      label: 'Invoice',
      icon: <IconFileText size={ICON_SIZES.SM} />,
      visible: showInvoice,
      render: (transaction) => (
        <Text size={SIZES.SM} ff="monospace" fw={500}>
          {transaction.invoice_number}
        </Text>
      )
    },
    {
      key: 'status',
      label: BASE_TEXT.STATUS,
      visible: true,
      render: (transaction) => {

        const getStatusDisplay = (status: string, transactionType: string) => {
          if (transactionType === 'refund') {
            return { text: BASE_TEXT.REFUNDED, color: 'orange', bgColor: 'var(--mantine-color-orange-0)' };
          }

          switch (status) {
            case 'succeeded':
              return { text: BASE_TEXT.COMPLETED, color: COLORS.SUCCESS, bgColor: 'var(--mantine-color-green-0)' };
            case 'requires_payment_method':
              return { text: 'Requires Payment Method', color: 'red', bgColor: 'var(--mantine-color-red-0)' };
            case 'requires_confirmation':
              return { text: 'Requires Confirmation', color: 'orange', bgColor: 'var(--mantine-color-orange-0)' };
            case 'requires_action':
              return { text: 'Requires Action', color: 'yellow', bgColor: 'var(--mantine-color-yellow-0)' };
            case 'processing':
              return { text: 'Processing', color: 'blue', bgColor: 'var(--mantine-color-blue-0)' };
            case 'canceled':
              return { text: 'Canceled', color: 'gray', bgColor: 'var(--mantine-color-gray-0)' };
            case 'refunded':
              return { text: BASE_TEXT.REFUNDED, color: 'orange', bgColor: 'var(--mantine-color-orange-0)' };
            default:
              return { text: status.replace(/_/g, ' '), color: 'gray', bgColor: 'var(--mantine-color-gray-0)' };
          }
        };

        const statusDisplay = getStatusDisplay(transaction.status, transaction.transaction_type);

        return (
          <Text
            size={SIZES.SM}
            c={statusDisplay.color}
            fw={500}
            style={{
              textTransform: 'capitalize',
              backgroundColor: statusDisplay.bgColor,
              padding: '4px 8px',
              borderRadius: '4px',
              display: 'inline-block'
            }}
          >
            {statusDisplay.text}
          </Text>
        );
      }
    },
    {
      key: 'transaction_time',
      label: BASE_TEXT.DATE,
      icon: <IconCalendar size={ICON_SIZES.SM} />,
      visible: true,
      render: (transaction) => (
        <Text size={SIZES.SM} c="dimmed">
          {formatDate(transaction.transaction_time)}
        </Text>
      )
    },
    {
      key: 'actions',
      label: BASE_TEXT.ACTIONS,
      visible: showRefunds,
      render: (transaction) => {
        const canRefund = showRefunds &&
                         transaction.transaction_type === 'payment' &&
                         transaction.stripe_payment &&
                         transaction.amount_paid > 0 &&
                         transaction.status === 'succeeded';

        return canRefund ? (
          <Button
            size="xs"
            color="orange"
            variant="light"
            leftSection={<IconArrowBackUp size={ICON_SIZES.SM} />}
            onClick={(e) => {
              e.stopPropagation();
              handleRefund(transaction);
            }}
            loading={refundingPaymentId === transaction.stripe_payment}
            disabled={refundingPaymentId === transaction.stripe_payment}
          >
            {BASE_TEXT.REFUND}
          </Button>
        ) : null;
      }
    }
  ];


  const visibleColumns = allColumns.filter(column => column.visible);


  if (loading) {
    return (
      <Center p={SIZES.XL}>
        <Loader size={SIZES.LG} />
      </Center>
    );
  }

  if (error) {
    return (
      <Alert color={COLORS.DANGER} title={ERROR_MESSAGES.PAYMENT_HISTORY_ERROR_TITLE}>
        {error}
      </Alert>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <Center p={SIZES.XL}>
        <Stack align="center" gap={SIZES.SM}>
          <IconReceipt size={ICON_SIZES.XL} color="var(--mantine-color-gray-5)" />
          <Text c="dimmed" size={SIZES.SM}>
            {BASE_TEXT.NO_PAYMENT_HISTORY}
          </Text>
        </Stack>
      </Center>
    );
  }

  return (
    <Stack gap={SIZES.MD}>
      <Title order={3} size="h4">
        {title}
      </Title>
      
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            {visibleColumns.map((column) => (
              <Table.Th key={column.key}>
                <Stack gap={4} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {column.icon}
                  <Text size={SIZES.SM} fw={600}>{column.label}</Text>
                </Stack>
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {transactions.map((transaction) => (
            <Table.Tr
              key={transaction.id}
              onClick={() => onRowClick?.(transaction)}
              style={{
                cursor: onRowClick ? 'pointer' : 'default'
              }}
            >
              {visibleColumns.map((column) => (
                <Table.Td key={column.key}>
                  {column.render ? column.render(transaction) : transaction[column.key as keyof PaymentTransaction]}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );
}