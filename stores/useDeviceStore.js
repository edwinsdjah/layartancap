import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useDeviceStore = create(
  persist(
    (set) => ({
      isSP: false,
      setIsSP: (value) => set({ isSP: value }),
    }),
    {
      name: "device-storage",
    }
  )
);
