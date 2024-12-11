import { User } from "@/models/user";
import { Constants } from "@/utils/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
}

/**
 * Zustand store for managing user authentication state.
 *
 * This store provides a centralized way to access and update the currently authenticated user's information.
 * The store is persisted to localStorage.
 *
 * @state user - The currently authenticated user object.
 * @action setUser - Sets the current user object.
 */
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: undefined,
      setUser: (user: User | undefined) => set({ user }),
    }),
    {
      name: Constants.storage.userKey,
    }
  )
);
