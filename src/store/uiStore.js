import { create } from 'zustand';

export const useUIStore = create((set) => ({
  // Loading state
  loading: false,
  setLoading: (loading) => set({ loading }),

  // Email dialog state
  emailDialog: {
    open: false,
    fmt: '',
  },
  setEmailDialog: (emailDialog) => set({ emailDialog }),

  // Layout list dialog state
  layoutListDialog: {
    open: false,
    predefinedList: [],
  },
  setLayoutListDialog: (layoutListDialog) => set({ layoutListDialog }),
}));
