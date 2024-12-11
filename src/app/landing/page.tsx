"use client";

import AuthGuard from "@/components/authGuard/authGuard";
import Landing from "@/components/landing/landing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function LandingPage() {
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
        <Landing />
      </AuthGuard>
    </QueryClientProvider>
  );
}
