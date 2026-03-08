import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { useFinanceStore } from "../store/useFinanceStore";

export default function BalanceBarChart() {
  const totalIngresos = useFinanceStore((state) => state.totalIngresos);
  const totalGastos = useFinanceStore((state) => state.totalGastos);
  const totalDeudas = useFinanceStore((state) => state.totalDeudas);

  const formatCLP = (value) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(value);
  
  const data = [
    {
      name: "Resumen",
      Ingresos: totalIngresos,
      Gastos: totalGastos,
      Deudas: totalDeudas,
    },
  ];

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => formatCLP(value)} />
          <Tooltip
        formatter={(value) => formatCLP(value)}
        labelFormatter={() => "Totales financieros"}
/>
          <Legend />
         <Bar dataKey="Ingresos" fill="#16a34a">
        <LabelList dataKey="Ingresos" position="top" formatter={formatCLP} />
        </Bar>

        <Bar dataKey="Gastos" fill="#dc2626">
          <LabelList dataKey="Gastos" position="top" formatter={formatCLP} />
        </Bar>

          <Bar dataKey="Deudas" fill="#f59e0b">
            <LabelList dataKey="Deudas" position="top" formatter={formatCLP} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}