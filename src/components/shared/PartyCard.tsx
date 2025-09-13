'use client';

import {
  Text,
  Stack,
  Paper
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import {
  SIZES,
  FONT_WEIGHTS
} from '../../constants/ui';
import classes from './PartyCard.module.scss';

interface PartyCardProps {
  title: string;
  name: string;
  id: string;
  subtitle?: string;
  className?: string;
}

export const PartyCard = ({ title, name, id, subtitle, className }: PartyCardProps) => {
  const router = useRouter();

  const handleClick = () => {

    if (title.toLowerCase().includes('business') || title.toLowerCase().includes('owner')) {
      router.push(`/business-owners/${id}`);
    } else if (title.toLowerCase().includes('customer')) {
      router.push(`/customers/${id}`);
    }
  };

  return (
    <Paper
      p={SIZES.MD}
      className={`${classes.partyCard} ${className || ''}`}
      onClick={handleClick}
    >
      <Stack gap={SIZES.SM}>
        <Text size={SIZES.SM} c="dimmed" fw={FONT_WEIGHTS.MEDIUM}>
          {title}
        </Text>
        <Text size={SIZES.MD} fw={FONT_WEIGHTS.SEMIBOLD}>
          {name}
        </Text>
        {subtitle && (
          <Text size={SIZES.XS} c="dimmed">
            {subtitle}
          </Text>
        )}
        <Text size={SIZES.XS} c="dimmed">
          ID: {id}
        </Text>
      </Stack>
    </Paper>
  );
};