import { create } from "zustand";
import { getCookie, getRole, removeCookie, removeRole } from "@/lib/utils";
import { axiosInstance } from "@/lib/axios";

interface AuthState {
  data: any;
  getUser: () => Promise<void>;
  signoutHandler: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  data: null,

  getUser: async () => {
    const token = getCookie();
    const role = getRole();
    if (!token || !role) return set({ data: null });

    try {
      const res = await axiosInstance.get("/E-Commerce/api/v1/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ data: res.data });
    } catch (err) {
      removeCookie();
      removeRole();
      set({ data: null });
      window.location.href = "/";
    }
  },

  signoutHandler: () => {
    removeCookie();
    removeRole();
    set({ data: null });
    window.location.href = "/";
  },
}));
