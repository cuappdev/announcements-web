"use client";

import AuthGuard from "@/components/authGuard/authGuard";
import Past from "@/components/past/past";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function PastPage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthGuard>
        <Past />
      </AuthGuard>
    </QueryClientProvider>
  );
}
