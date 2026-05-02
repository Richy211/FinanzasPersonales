import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFinanceStore = create(
  persist(
    (set, get) => ({
      movimientos: [],
      ahorros: [], // Array que ya tenías definido

      totalIngresos: 0,
      totalGastos: 0,
      totalDeudas: 0,
      balance: 0,

      recalcularTotales: (movimientos) => {
        const totalIngresos = movimientos
          .filter((m) => m.tipo === "ingreso")
          .reduce((acc, m) => acc + Number(m.monto), 0);

        const totalGastos = movimientos
          .filter((m) => m.tipo === "gasto")
          .reduce((acc, m) => acc + Number(m.monto), 0);

        const totalDeudas = movimientos
          .filter((m) => m.tipo === "deuda")
          .reduce((acc, m) => acc + Number(m.monto), 0);

        return {
          totalIngresos,
          totalGastos,
          totalDeudas,
          balance: totalIngresos - totalGastos - totalDeudas,
        };
      },

      // --- Gestión de Movimientos ---
      addMovimiento: (movimiento) =>
        set((state) => {
          const nuevosMovimientos = [...state.movimientos, movimiento];
          return {
            movimientos: nuevosMovimientos,
            ...state.recalcularTotales(nuevosMovimientos),
          };
        }),

      removeMovimiento: (index) =>
        set((state) => {
          const nuevosMovimientos = state.movimientos.filter(
            (_, i) => i !== index
          );
          return {
            movimientos: nuevosMovimientos,
            ...state.recalcularTotales(nuevosMovimientos),
          };
        }),

      updateMovimiento: (index, movimientoActualizado) =>
        set((state) => {
          const nuevosMovimientos = [...state.movimientos];
          nuevosMovimientos[index] = movimientoActualizado;
          return {
            movimientos: nuevosMovimientos,
            ...state.recalcularTotales(nuevosMovimientos),
          };
        }),

      // --- Gestión de Ahorros (Lo que faltaba) ---
      addAhorro: (ahorro) =>
        set((state) => ({
          ahorros: [...state.ahorros, ahorro],
        })),

      removeAhorro: (index) =>
        set((state) => ({
          ahorros: state.ahorros.filter((_, i) => i !== index),
        })),

      // 🔥 CIERRE DE MES
      resetMovimientos: () =>
        set((state) => {
          const nuevosMovimientos = [];
          return {
            movimientos: nuevosMovimientos,
            ...state.recalcularTotales(nuevosMovimientos),
          };
        }),
    }),
    {
      name: "finance-storage",

      onRehydrateStorage: () => (state) => {
        if (state?.movimientos) {
          const totales = state.recalcularTotales(state.movimientos);
          state.totalIngresos = totales.totalIngresos;
          state.totalGastos = totales.totalGastos;
          state.totalDeudas = totales.totalDeudas;
          state.balance = totales.balance;
        }
      },
    }
  )
);