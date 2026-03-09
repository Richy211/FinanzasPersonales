import { useState } from "react";
import { FaPlusCircle, FaMoneyBillWave } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Deudas() {
  const [deudas, setDeudas] = useState([]);
  const [form, setForm] = useState({
    acreedor: "",
    monto: "",
    fecha: "",
  });

  useEffect(() => {
  const data = localStorage.getItem("deudas");

  if (data) {
    setDeudas(JSON.parse(data));
  }
}, []);

useEffect(() => {
  localStorage.setItem("deudas", JSON.stringify(deudas));
}, [deudas]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const pagarDeuda = (id) => {
  const nuevasDeudas = deudas.map((d) =>
    d.id === id ? { ...d, estado: "pagado" } : d
  );

  setDeudas(nuevasDeudas);
};

const totalDeudas = deudas.reduce((acc, d) => acc + Number(d.monto), 0);

const totalPendiente = deudas
  .filter((d) => d.estado === "pendiente")
  .reduce((acc, d) => acc + Number(d.monto), 0);

const totalPagado = deudas
  .filter((d) => d.estado === "pagado")
  .reduce((acc, d) => acc + Number(d.monto), 0);


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

<div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
  
  <div className="card">
    <h4>Total Deudas</h4>
    <p>${totalDeudas}</p>
  </div>

  <div className="card">
    <h4>Pendiente</h4>
    <p style={{ color: "red" }}>${totalPendiente}</p>
  </div>

  <div className="card">
    <h4>Pagado</h4>
    <p style={{ color: "green" }}>${totalPagado}</p>
  </div>

</div>



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
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {deudas.map((d) => (
              <tr key={d.id}>
                <td>{d.acreedor}</td>
                <td>${d.monto}</td>
                <td>{d.fecha}</td>
                <td style={{
    color: d.estado === "pagado" ? "green" : "red",
    fontWeight: "bold"
  }}
>
  {d.estado}
                </td>


                <td>
                    {d.estado === "pendiente" && (
                      <button
                        onClick={() => pagarDeuda(d.id)}
                        style={{
                          background: "#22c55e",
                          border: "none",
                          padding: "6px 10px",
                          color: "white",
                          borderRadius: "6px",
                          cursor: "pointer"
                        }}
                      >
                        Pagar
                      </button>
                    )}
                  </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}