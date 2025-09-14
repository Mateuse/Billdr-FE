'use client';

import React from 'react';
import { 
  Text, 
  Group, 
  Stack, 
  Paper,
  Title,
  Grid,
  Box
} from '@mantine/core';
import { IconTrendingUp, IconCurrencyDollar, IconReceipt, IconClock } from '@tabler/icons-react';
import { Invoice } from '../../types/invoice';
import { 
  SIZES, 
  FONT_WEIGHTS, 
  ICON_SIZES,
  COLORS
} from '../../constants/ui';
import { STAT_TYPES, STAT_TYPE_CONFIGS, STAT_ICONS, StatFormatType } from '../../constants/messages';
import { formatCurrency } from '../../utils/formatters';
import classes from './StatsSection.module.scss';

export interface StatCard {
  key: string;
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

interface StatsSectionProps {
  title: string;
  stats: StatCard[];
  className?: string;
}

export const StatsSection = ({ title, stats, className }: StatsSectionProps) => {
  return (
    <Stack gap={SIZES.MD} className={className}>
      <Title order={4} fw={FONT_WEIGHTS.SEMIBOLD} className={classes.sectionTitle}>
        {title}
      </Title>
      
      <Grid gutter={SIZES.MD}>
        {stats.map((stat) => (
          <Grid.Col key={stat.key} span={{ base: 12, sm: 6, md: 3 }}>
            <Paper p={SIZES.MD} className={classes.statCard}>
              <Stack gap={SIZES.MD} className={classes.statContent}>
                <Group gap={SIZES.SM} justify="flex-start" wrap="nowrap" align="center">
                  <Box className={classes.statIcon} style={{ color: stat.color }}>
                    {stat.icon}
                  </Box>
                  <Text size={SIZES.SM} c="dimmed" style={{ flex: 1, minWidth: 0 }}>
                    {stat.label}
                  </Text>
                </Group>
                <Text 
                  size={SIZES.XL} 
                  fw={FONT_WEIGHTS.BOLD}
                  c={stat.color}
                  ta="center"
                >
                  {stat.value}
                </Text>
              </Stack>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
};


export const calculateInvoiceStats = (invoices: Invoice[]) => {
  const totalInvoices = invoices.length;
  const totalAmount = invoices.reduce((sum, invoice) => sum + Number(invoice.total_amount), 0);
  const totalPaid = invoices.reduce((sum, invoice) => sum + Number(invoice.amount_paid), 0);
  const pendingAmount = totalAmount - totalPaid;
  const paidInvoices = invoices.filter(invoice => invoice.status === 'paid').length;
  const overdueInvoices = invoices.filter(invoice => invoice.status === 'overdue').length;
  const draftInvoices = invoices.filter(invoice => invoice.status === 'draft').length;
  console.log(totalInvoices, totalAmount, totalPaid, pendingAmount, paidInvoices, overdueInvoices, draftInvoices);
  return {
    totalInvoices,
    totalAmount,
    totalPaid,
    pendingAmount,
    paidInvoices,
    overdueInvoices,
    draftInvoices,
    paidPercentage: totalInvoices > 0 ? Math.round((paidInvoices / totalInvoices) * 100) : 0,
  };
};


const getStatIcon = (iconType: string) => {
  const iconMap = {
    [STAT_ICONS.RECEIPT]: <IconReceipt size={ICON_SIZES.MD} />,
    [STAT_ICONS.CURRENCY]: <IconCurrencyDollar size={ICON_SIZES.MD} />,
    [STAT_ICONS.TRENDING]: <IconTrendingUp size={ICON_SIZES.MD} />,
    [STAT_ICONS.CLOCK]: <IconClock size={ICON_SIZES.MD} />,
  };
  return iconMap[iconType as keyof typeof iconMap] || <IconReceipt size={ICON_SIZES.MD} />;
};


const formatStatValue = (value: number, format?: StatFormatType): string | number => {
  if (format === 'currency') {
    return formatCurrency(value);
  }
  return value;
};

export const createInvoiceStats = (invoices: Invoice[], type: keyof typeof STAT_TYPE_CONFIGS): StatCard[] => {
  const stats = calculateInvoiceStats(invoices);
  const statConfigs = STAT_TYPE_CONFIGS[type];
  
  return statConfigs.map(config => ({
    key: config.key,
    label: config.label,
    value: formatStatValue(stats[config.valueKey as keyof typeof stats], config.format),
    icon: getStatIcon(config.icon),
    color: COLORS[config.color.toUpperCase() as keyof typeof COLORS],
  }));
};


export const createBusinessOwnerStats = (invoices: Invoice[]): StatCard[] => 
  createInvoiceStats(invoices, STAT_TYPES.BUSINESS_OWNER);

export const createCustomerStats = (invoices: Invoice[]): StatCard[] => 
  createInvoiceStats(invoices, STAT_TYPES.CUSTOMER);
