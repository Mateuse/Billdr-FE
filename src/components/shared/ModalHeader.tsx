'use client';

import {
  Text,
  Badge,
  Group,
  Stack,
  Paper
} from '@mantine/core';
import {
  VARIANTS,
  SIZES,
  FONT_WEIGHTS
} from '../../constants/ui';
import classes from './ModalHeader.module.scss';

export interface StatusConfig {
  value: string;
  label: string;
  color: string;
}

interface ModalHeaderProps {
  title: string;
  subtitle?: string;
  status?: StatusConfig;
  className?: string;
}

export const ModalHeader = ({ 
  title, 
  subtitle, 
  status,
  className 
}: ModalHeaderProps) => {
  return (
    <Paper p={SIZES.MD} className={`${classes.headerSection} ${className || ''}`}>
      <Group justify="space-between" align="flex-start">
        <Stack gap={SIZES.XS}>
          {subtitle && (
            <Text size={SIZES.SM} c="dimmed">
              {subtitle}
            </Text>
          )}
          <Text size={SIZES.LG} fw={FONT_WEIGHTS.BOLD} className={classes.title}>
            {title}
          </Text>
        </Stack>
        <Group gap={SIZES.SM}>
          {status && (
            <Badge 
              color={status.color} 
              variant={VARIANTS.LIGHT}
              size={SIZES.MD}
              className={classes.statusBadge}
            >
              {status.label}
            </Badge>
          )}
        </Group>
      </Group>
    </Paper>
  );
};
