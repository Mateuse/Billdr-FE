'use client';

import { 
  Text, 
  Group, 
  Stack, 
  Paper,
  Title
} from '@mantine/core';
import { ReactNode } from 'react';
import {
  SIZES,
  FONT_WEIGHTS
} from '../../constants/ui';
import { CURRENCIES, LOCALES, CURRENCY_FORMAT_OPTIONS, FIELD_TYPES } from '../../constants/formatting';
import { formatDate } from '../../utils/formatters';
import classes from './DataSection.module.scss';

export interface DataField {
  key: string;
  label: string;
  value: string | number;
  type?: typeof FIELD_TYPES[keyof typeof FIELD_TYPES] | 'date';
  color?: string;
}

interface DataSectionProps {
  title?: string;
  icon?: ReactNode;
  fields: DataField[];
  className?: string;
}

export const DataSection = ({ title, icon, fields, className }: DataSectionProps) => {
  const formatValue = (field: DataField) => {
    switch (field.type) {
      case FIELD_TYPES.CURRENCY:
        return new Intl.NumberFormat(LOCALES.US, {
          style: CURRENCY_FORMAT_OPTIONS.STYLE,
          currency: CURRENCIES.CAD,
        }).format(Number(field.value));
      case FIELD_TYPES.PERCENTAGE:
        return `${field.value}%`;
      case 'date':
        return formatDate(String(field.value));
      default:
        return field.value.toString();
    }
  };

  return (
    <Stack gap={SIZES.MD} className={className} style={{ height: '100%' }}>
      {title && (
        <Title order={4} fw={FONT_WEIGHTS.SEMIBOLD} className={classes.sectionTitle}>
          <Group gap={SIZES.XS}>
            {icon}
            {title}
          </Group>
        </Title>
      )}
      
      <Paper p={SIZES.MD} className={classes.infoCard} style={{ flex: 1, display: 'flex' }}>
        <Stack gap={SIZES.SM} style={{ flex: 1, justifyContent: 'space-between' }}>
          {fields.map((field) => (
            <Group key={field.key} justify="space-between">
              <Text size={SIZES.SM} c="dimmed">
                {field.label}
              </Text>
              <Text 
                size={field.type === 'date' ? SIZES.SM : SIZES.MD}
                fw={field.type === 'date' ? FONT_WEIGHTS.MEDIUM : FONT_WEIGHTS.SEMIBOLD} 
                c={field.color}
                className={field.type === FIELD_TYPES.CURRENCY ? classes.currency : undefined}
              >
                {formatValue(field)}
              </Text>
            </Group>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
};