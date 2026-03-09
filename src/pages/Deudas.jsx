import { useState } from "react";
import { FaPlusCircle, FaMoneyBillWave } from "react-icons/fa";

export default function Deudas() {
  const [deudas, setDeudas] = useState([]);
  const [form, setForm] = useState({
    acreedor: "",
    monto: "",
    fecha: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const agregarDeuda = () => {
    const nuevaDeuda = {
      id: Date.now(),
      ...form,
      estado: "pendiente",
    };

    setDeudas([...deudas, nuevaDeuda]);

    setForm({
      acreedor: "",
      monto: "",
      fecha: "",
    });
  };

  return (
    <div className="dashboard">
      <h1 className="page-title">
        <FaMoneyBillWave /> Deudas
      </h1>

      <div className="card">
        <h3>Agregar nueva deuda</h3>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="text"
            name="acreedor"
            placeholder="Acreedor"
            value={form.acreedor}
            onChange={handleChange}
          />

          <input
            type="number"
            name="monto"
            placeholder="Monto"
            value={form.monto}
            onChange={handleChange}
          />

          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
          />

          <button
            onClick={agregarDeuda}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 16px",
              background: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            <FaPlusCircle />
            Agregar
          </button>
        </div>
      </div>

      <div className="card">
        <h3>Listado de deudas</h3>

        <table style={{ width: "100%", marginTop: "10px" }}>
          <thead>
            <tr>
              <th>Acreedor</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {deudas.map((d) => (
              <tr key={d.id}>
                <td>{d.acreedor}</td>
                <td>${d.monto}</td>
                <td>{d.fecha}</td>
                <td style={{ color: "red", fontWeight: "bold" }}>
                  {d.estado}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}