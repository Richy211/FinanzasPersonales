import { useFinanceStore } from "../store/useFinanceStore";
import KpiCard from "../components/ui/KpiCard";
import { useNavigate } from "react-router-dom";
import EvolucionMensualChart from "./EvolucionMensualChart";

export default function Dashboard() {
  const navigate = useNavigate();
  const totalIngresos = useFinanceStore((state) => state.totalIngresos);
  const totalGastos = useFinanceStore((state) => state.totalGastos);
  const totalDeudas = useFinanceStore((state) => state.totalDeudas);
  const balance = useFinanceStore((state) => state.balance);

  console.log(totalIngresos, totalGastos, totalDeudas, balance);

  const formatCLP = (value) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(value);
 

  return (
    <div className="dashboard">
      <h1 className="page-title">Resumen General</h1>

<div style={{ marginBottom: "20px" }}>
  <button
    onClick={() => navigate("/movimientos")}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#2563eb",
      color: "white",
      cursor: "pointer"
    }}
  >
    Agregar Movimiento
  </button>
</div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <KpiCard title="Ingresos Totales" value={totalIngresos} type="ingreso" color="#22c55e"/>
          <KpiCard title="Gastos Totales" value={totalGastos} type="gasto" color="#ef4444"/>
          <KpiCard title="Deudas Pendientes" value={totalDeudas} type="deuda" color="#8b5cf6"/>
          <KpiCard title="Balance General" value={balance} type="balance" color="#3b82f6"/>
     </div>

      <div className="card" style={{ marginTop: "30px" }}>
        <h2>Evolución mensual</h2>
        <EvolucionMensualChart />
      </div>

    </div>



  );
}