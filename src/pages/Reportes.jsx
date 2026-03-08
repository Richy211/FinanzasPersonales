import CategoryChart from "./CategoryChart";
import BalanceBarChart from "./BalanceBarChart";

export default function Reportes() {
  return (
    <div className="page">
      <h1 className="page-title">Reportes</h1>

      <div className="card">
        <h2>Por Categoría</h2>
         <CategoryChart />
      </div>

      <div className="card" style={{ marginTop: "30px" }}>
        <h2>Ingreso vs Gasto vs Deudas</h2>
        <BalanceBarChart />
      </div>
     
    </div>
  );
}