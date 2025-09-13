'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { useState } from 'react';
import { CACHE_TIMES } from '../constants/urls';
import { BOOLEAN_VALUES } from '../constants/ui';


import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

const theme = createTheme({
  
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: CACHE_TIMES.STALE_TIME,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <Notifications />
          {children}
          <ReactQueryDevtools initialIsOpen={BOOLEAN_VALUES.FALSE} />
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}
