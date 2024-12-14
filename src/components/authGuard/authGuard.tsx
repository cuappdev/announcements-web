"use client";

import { User } from "@/models/user";
import ApiClient from "@/services/apiClient";
import { useUserStore } from "@/stores/useUserStore";
import { Constants } from "@/utils/constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import errorToast from "../system/errorToast";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  });

  const apiClient = ApiClient.createInstance();

  const { user, setUser } = useUserStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      // Wait for the store to be hydrated
      await useUserStore.persist.rehydrate();
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    const verifyUser = async () => {
      if (user) {
        try {
          ApiClient.setAuthToken(apiClient, user.idToken);
          const userData = await ApiClient.post<User>(apiClient, "/users/login");
          setUser({ ...userData, idToken: user.idToken });
        } catch (err) {
          // Token has expired or unauthorized
          console.error(err);
          errorToast();
          setUser(undefined);
          router.push(Constants.pagePath.default);
        }
      } else {
        router.push(Constants.pagePath.login);
      }
    };

    if (!isLoading) {
      verifyUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
