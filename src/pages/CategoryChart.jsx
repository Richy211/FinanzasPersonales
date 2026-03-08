import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useFinanceStore } from "../store/useFinanceStore";

const COLORS = ["#2563eb", "#16a34a", "#dc2626", "#9333ea", "#f59e0b"];

export default function CategoryChart() {
  const movimientos = useFinanceStore((state) => state.movimientos);

  const gastos = movimientos.filter((m) => m.tipo === "gasto");

  const formatCLP = (value) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(value);

  const dataAgrupada = Object.values(
    gastos.reduce((acc, curr) => {
      if (!acc[curr.categoria]) {
        acc[curr.categoria] = {
          name: curr.categoria,
          value: 0,
        };
      }
      acc[curr.categoria].value += Number(curr.monto);
      return acc;
    }, {})
  );

  if (dataAgrupada.length === 0) {
    return <p>No hay datos de gastos para mostrar.</p>;
  }

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={dataAgrupada}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {dataAgrupada.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip  formatter={(value) => formatCLP(value)}/>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}