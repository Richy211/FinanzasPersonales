import { useFinanceStore } from "../store/useFinanceStore";
import * as XLSX from "xlsx";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function Reportes() {

  const { movimientos } = useFinanceStore();

  // Totales
  const ingresos = movimientos
    .filter(m => m.tipo === "ingreso")
    .reduce((t, m) => t + Number(m.monto), 0);

  const gastos = movimientos
    .filter(m => m.tipo === "gasto")
    .reduce((t, m) => t + Number(m.monto), 0);

  const balance = ingresos - gastos;

  // Agrupar gastos por categoría
  const gastosPorCategoria = {};

  movimientos
    .filter(m => m.tipo === "gasto")
    .forEach(m => {
      if (!gastosPorCategoria[m.categoria]) {
        gastosPorCategoria[m.categoria] = 0;
      }
      gastosPorCategoria[m.categoria] += Number(m.monto);
    });

  const data = Object.keys(gastosPorCategoria).map(cat => ({
    name: cat,
    value: gastosPorCategoria[cat]
  }));

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AA66CC"
  ];

  // Exportar Excel
  function exportarExcel() {

    if (!movimientos.length) {
      alert("No hay movimientos para exportar");
      return;
    }

    const datos = movimientos.map(m => ({
      Fecha: m.fecha,
      Descripcion: m.descripcion,
      Tipo: m.tipo,
      Monto: m.monto,
      Categoria: m.categoria
    }));

    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(libro, hoja, "Movimientos");

    XLSX.writeFile(libro, "reporte_finanzas.xlsx");
  }

  return (
    <div className="page">

      <h1 className="page-title">Reporte Financiero</h1>

      <div className="card">

        <h3>Ingresos</h3>
        <p>${ingresos}</p>

        <h3>Gastos</h3>
        <p>${gastos}</p>

        <h3>Balance</h3>
        <p>${balance}</p>

        <button className="btn-primary" onClick={exportarExcel}>
          Descargar Reporte Excel
        </button>

      </div>

      <div className="card">
        <h2>Gastos por Categoría</h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}