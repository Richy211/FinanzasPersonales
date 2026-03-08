import { create } from "zustand";

export const useMovementsStore = create((set) => ({
  movements: [],

  addMovement: (movement) =>
    set((state) => ({
      movements: [...state.movements, movement],
    })),

  removeMovement: (id) =>
    set((state) => ({
      movements: state.movements.filter((m) => m.id !== id),
    })),
}));