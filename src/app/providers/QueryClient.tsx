"use client";

import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";

import { client } from "@/api/gen/services.gen";

client.setConfig({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      placeholderData: true,
      refetchOnReconnect: true,
      gcTime: 1e4 * 60,
    },
    mutations: {
      retry: 0,
    },
  },
});

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
}
