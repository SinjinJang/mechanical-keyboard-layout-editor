import { create } from 'zustand';
import { DEFAULT_KEY } from '../utils/constants';

export const useKeyboardStore = create((set) => ({
  // Layout state - array of keys
  layout: [
    { ...DEFAULT_KEY },
  ],

  // Selected key index
  selectedIndex: -1,

  // Actions
  setLayout: (layout) => set({ layout }),

  setSelectedIndex: (index) => set({ selectedIndex: index }),

  updateKey: (index, updates) => set((state) => ({
    layout: state.layout.map((key, i) =>
      i === index ? { ...key, ...updates } : key
    )
  })),

  addKey: (key) => set((state) => ({
    layout: [...state.layout, key]
  })),

  removeKey: (index) => set((state) => ({
    layout: state.layout.filter((_, i) => i !== index),
    selectedIndex: -1
  })),
}));
