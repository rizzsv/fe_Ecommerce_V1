import { create } from "zustand";
import { getCookie, getRole, removeCookie, removeRole } from "@/lib/utils";
import { axiosInstance } from "@/lib/axios";
import { signOut } from "next-auth/react";

interface AuthState {
  data: any;
  getUser: () => Promise<void>;
  signoutHandler: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  data: null,
  getUser: async () => {
    if (!getCookie() || !getRole()) return set({ data: null });

    try {
      const response = await axiosInstance.get(
        "/E-Commerce/api/v1/user/profile",
        {
          headers: {
            Authorization: `Bearer ${getCookie()}`,
          },
        }
      );
      set({ data: response.data });
    } catch (error) {
      removeCookie();
      removeRole();
      set({ data: null });
      window.location.href = "/";
    }
  },

  signoutHandler: async () => {
    removeCookie();
    removeRole();
    set({ data: null });
    await signOut({ callbackUrl: "/" });
  },
}));

export default useAuthStore;
