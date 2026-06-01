import { create } from "zustand";

let timeoutId = null;

const useNotificationStore = create((set) => ({
  message: null,
  actions: {
    setNotification: (message, duration = 5000) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      set({ message });
      timeoutId = setTimeout(() => {
        set({ message: null });
        timeoutId = null;
      }, duration);
    },
  },
}));

export const useNotification = () =>
  useNotificationStore((state) => state.message);
export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions);
