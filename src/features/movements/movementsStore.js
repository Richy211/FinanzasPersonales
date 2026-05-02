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

export const useFinanceStore = create((set) => ({
  movimientos: [],

  agregarMovimiento: (mov) =>
    set((state) => ({
      movimientos: [...state.movimientos, mov],
    })),

  resetMovimientos: () => set({ movimientos: [] }),
}));