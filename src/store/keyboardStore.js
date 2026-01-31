import { create } from 'zustand';
import { DEFAULT_KEY } from '../utils/constants';

export const useKeyboardStore = create((set) => ({
  // Layout state - array of keys
  layout: [
    { ...DEFAULT_KEY },
  ],

  // Selected key indices (array for multi-selection)
  selectedIndices: [],

  // Actions
  setLayout: (layout) => set({ layout }),

  setSelectedIndices: (indices) => set({ selectedIndices: indices }),

  toggleSelectKey: (index, multiSelect) => set((state) => {
    if (multiSelect) {
      // Multi-select mode (Ctrl/Cmd key pressed)
      const isSelected = state.selectedIndices.includes(index);
      if (isSelected) {
        // Remove from selection
        return { selectedIndices: state.selectedIndices.filter(i => i !== index) };
      } else {
        // Add to selection
        return { selectedIndices: [...state.selectedIndices, index] };
      }
    } else {
      // Single select mode
      const isSelected = state.selectedIndices.length === 1 && state.selectedIndices[0] === index;
      return { selectedIndices: isSelected ? [] : [index] };
    }
  }),

  updateKey: (index, updates) => set((state) => ({
    layout: state.layout.map((key, i) =>
      i === index ? { ...key, ...updates } : key
    )
  })),

  updateKeys: (indices, updates) => set((state) => ({
    layout: state.layout.map((key, i) =>
      indices.includes(i) ? { ...key, ...updates } : key
    )
  })),

  addKey: (key) => set((state) => ({
    layout: [...state.layout, key]
  })),

  removeKey: (index) => set((state) => ({
    layout: state.layout.filter((_, i) => i !== index),
    selectedIndices: []
  })),

  removeKeys: (indices) => set((state) => ({
    layout: state.layout.filter((_, i) => !indices.includes(i)),
    selectedIndices: []
  })),
}));
