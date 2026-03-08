import { create } from "zustand";

export const useFinanceStore = create((set) => ({
  transactions: [],
  
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
    })),

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter(t => t.id !== id),
    })),
}));