import { useState } from "react";

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
      <h1 className="page-title">Deudas</h1>

      <div className="card">
        <h3>Agregar deuda</h3>

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

        <button onClick={agregarDeuda}>Agregar</button>
      </div>

      <div className="card">
        <h3>Listado de deudas</h3>

        <table>
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
                <td>{d.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}