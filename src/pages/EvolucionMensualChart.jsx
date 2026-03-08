import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import { useFinanceStore } from "../store/useFinanceStore";

export default function EvolucionMensualChart() {

  const movimientos = useFinanceStore((state) => state.movimientos);

  const formatCLP = (value) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(value);

  const meses = [
    "Ene","Feb","Mar","Abr","May","Jun",
    "Jul","Ago","Sep","Oct","Nov","Dic"
  ];

  const data = meses.map((mes, index) => {

    const ingresos = movimientos
      .filter((m) => {
        const fecha = new Date(m.fecha);
        return fecha.getMonth() === index && m.tipo === "ingreso";
      })
      .reduce((acc, m) => acc + Number(m.monto), 0);

    const gastos = movimientos
      .filter((m) => {
        const fecha = new Date(m.fecha);
        return fecha.getMonth() === index && m.tipo === "gasto";
      })
      .reduce((acc, m) => acc + Number(m.monto), 0);

    return {
      mes,
      Ingresos: ingresos,
      Gastos: gastos
    };
  });

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="mes" />

          <YAxis tickFormatter={(value) => formatCLP(value)} />

          <Tooltip formatter={(value) => formatCLP(value)} />

          <Legend />

          <Line
            type="monotone"
            dataKey="Ingresos"
            stroke="#16a34a"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="Gastos"
            stroke="#dc2626"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}