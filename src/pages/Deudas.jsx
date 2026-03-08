import { useFinanceStore } from "../store/useFinanceStore";

export default function Deudas() {
  const movimientos = useFinanceStore((state) => state.movimientos);
  const totalDeudas = useFinanceStore((state) => state.totalDeudas);

  const deudas = movimientos.filter((m) => m.tipo === "deuda");

  return (
    <div className="page">
      <h1 className="page-title">Deudas</h1>

      <h2>Total Deudas: ${totalDeudas}</h2>

      {deudas.map((d, index) => (
        <div key={index}>
          {d.descripcion} - ${d.monto}
        </div>
      ))}
    </div>
  );
}