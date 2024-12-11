"use client";

import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Constants } from "@/utils/constants";
import { User } from "@/models/user";

interface Props {
  idToken: string;
}

export default function Login({ idToken }: Props) {
  const { user, setUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (user) return;

    const dummyUser: User = { name: "", imageUrl: "", isAdmin: true, email: "", idToken };
    setUser(dummyUser);
    router.push(Constants.pagePath.landing);
  }, [user]);

  return null;
}
