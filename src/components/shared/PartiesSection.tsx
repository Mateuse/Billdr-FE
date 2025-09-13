'use client';

import { 
  Stack, 
  Title,
  Grid,
  Group
} from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { 
  SIZES, 
  FONT_WEIGHTS, 
  ICON_SIZES
} from '../../constants/ui';
import { PartyCard } from './PartyCard';
import classes from './PartiesSection.module.scss';

export interface Party {
  title: string;
  name: string;
  id: string;
  subtitle?: string;
}

interface PartiesSectionProps {
  title: string;
  parties: Party[];
  className?: string;
}

export const PartiesSection = ({ title, parties, className }: PartiesSectionProps) => {
  return (
    <Stack gap={SIZES.MD} className={className}>
      <Title order={4} fw={FONT_WEIGHTS.SEMIBOLD} className={classes.sectionTitle}>
        <Group gap={SIZES.XS}>
          <IconUser size={ICON_SIZES.SM} />
          {title}
        </Group>
      </Title>
      
      <Grid gutter={SIZES.LG}>
        {parties.map((party, index) => (
          <Grid.Col key={party.id || index} span={{ base: 12, md: 6 }}>
            <PartyCard
              title={party.title}
              name={party.name}
              id={party.id}
              subtitle={party.subtitle}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
};
