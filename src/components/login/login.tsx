"use client";

import { User } from "@/models/user";
import { useUserStore } from "@/stores/useUserStore";
import { Constants } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  idToken: string;
}

export default function Login({ idToken }: Props) {
  const { user, setUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (user) return;

    const dummyUser: User = { id: "", name: "", imageUrl: "", isAdmin: true, email: "", idToken };
    setUser(dummyUser);
    router.push(Constants.pagePath.landing);
  }, [user]);

  return null;
}
