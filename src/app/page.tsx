'use client';

import { 
  Container, 
  Title, 
  Text, 
  Button, 
  Stack, 
  Group, 
  Paper,
  SimpleGrid 
} from '@mantine/core';
import { IconFileInvoice, IconUsers, IconBuilding } from '@tabler/icons-react';
import Link from 'next/link';
import { 
  SIZES, 
  COLORS, 
  ICON_SIZES, 
  FONT_WEIGHTS, 
  SPACING, 
  TITLE_SIZES, 
  MAX_WIDTHS 
} from '../constants/ui';
import { LANDING_PAGE } from '../constants/messages';

export default function Home() {
  return (
    <Container size={SIZES.XL} py={SPACING.XXL}>
      <Stack gap={SPACING.XXL} align="center">
        <Stack gap={SPACING.LG} align="center" ta="center">
          <Title order={1} size={TITLE_SIZES.XL} fw={FONT_WEIGHTS.BOLD}>
            {LANDING_PAGE.WELCOME_TITLE}
          </Title>
          <Text size={SIZES.XL} c="dimmed" maw={MAX_WIDTHS.MD}>
            {LANDING_PAGE.WELCOME_SUBTITLE}
          </Text>
          <Group mt={SPACING.XL}>
            <Button component={Link} href="/invoices" size={SIZES.LG} color={COLORS.PRIMARY}>
              {LANDING_PAGE.GET_STARTED}
            </Button>
            <Button component={Link} href="/invoices" variant="outline" size={SIZES.LG}>
              {LANDING_PAGE.VIEW_INVOICES}
            </Button>
          </Group>
        </Stack>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing={SIZES.LG} w="100%">
          <Paper shadow={SIZES.SM} radius={SIZES.MD} p={SIZES.XL} withBorder h="100%">
            <Stack align="center" gap={SIZES.MD} h="100%" justify="space-between">
              <Stack align="center" gap={SIZES.MD}>
                <IconFileInvoice size={ICON_SIZES.XXL} color="var(--mantine-color-blue-6)" />
                <Title order={3} ta="center">{LANDING_PAGE.INVOICE_MANAGEMENT_TITLE}</Title>
                <Text ta="center" c="dimmed">
                  {LANDING_PAGE.INVOICE_MANAGEMENT_DESCRIPTION}
                </Text>
              </Stack>
              <Button component={Link} href="/invoices" variant="light" fullWidth>
                {LANDING_PAGE.MANAGE_INVOICES}
              </Button>
            </Stack>
          </Paper>

          <Paper shadow={SIZES.SM} radius={SIZES.MD} p={SIZES.XL} withBorder h="100%">
            <Stack align="center" gap={SIZES.MD} h="100%" justify="space-between">
              <Stack align="center" gap={SIZES.MD}>
                <IconUsers size={ICON_SIZES.XXL} color="var(--mantine-color-green-6)" />
                <Title order={3} ta="center">{LANDING_PAGE.CUSTOMER_MANAGEMENT_TITLE}</Title>
                <Text ta="center" c="dimmed">
                  {LANDING_PAGE.CUSTOMER_MANAGEMENT_DESCRIPTION}
                </Text>
              </Stack>
              <Button component={Link} href="/customers" variant="light" fullWidth>
                {LANDING_PAGE.MANAGE_CUSTOMERS}
              </Button>
            </Stack>
          </Paper>

          <Paper shadow={SIZES.SM} radius={SIZES.MD} p={SIZES.XL} withBorder h="100%">
            <Stack align="center" gap={SIZES.MD} h="100%" justify="space-between">
              <Stack align="center" gap={SIZES.MD}>
                <IconBuilding size={ICON_SIZES.XXL} color="var(--mantine-color-orange-6)" />
                <Title order={3} ta="center">{LANDING_PAGE.BUSINESS_OWNERS_TITLE}</Title>
                <Text ta="center" c="dimmed">
                  {LANDING_PAGE.BUSINESS_OWNERS_DESCRIPTION}
                </Text>
              </Stack>
              <Button component={Link} href="/business-owners" variant="light" fullWidth>
                {LANDING_PAGE.MANAGE_BUSINESSES}
              </Button>
            </Stack>
          </Paper>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
