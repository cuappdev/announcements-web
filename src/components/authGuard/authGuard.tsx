"use client";

import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ApiClient from "@/services/apiClient";
import { Constants } from "@/utils/constants";
import { User } from "@/models/user";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
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
        } catch (error) {
          // Token has expired or unauthorized
          // TODO: Show error toast
          console.error(error);
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

  return <>{children}</>;
}
