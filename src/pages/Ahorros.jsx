import { useState } from "react";
import { useFinanceStore } from "../store/useFinanceStore";

export default function Ahorros() {
  // Extraemos las acciones y el estado del store
  const { ahorros, addAhorro, removeAhorro } = useFinanceStore();

  // Estados locales para el formulario
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState("");
  const [motivo, setMotivo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validamos que el monto sea un número válido
    const montoNumerico = Number(monto);
    if (isNaN(montoNumerico) || montoNumerico <= 0) {
      alert("Por favor, ingresa un monto válido.");
      return;
    }

    const nuevoAhorro = {
      descripcion: descripcion.trim(),
      monto: montoNumerico,
      fecha, // Formato YYYY-MM-DD nativo del input date
      motivo: motivo.trim(),
    };

    try {
      // Enviamos al store (que debería manejar el POST a tu backend Node/Express)
      await addAhorro(nuevoAhorro);
      
      // Limpiamos el formulario solo si la operación fue exitosa
      setDescripcion("");
      setMonto("");
      setFecha("");
      setMotivo("");
      
      console.log("Ahorro guardado con éxito:", nuevoAhorro);
    } catch (error) {
      console.error("Error al guardar el ahorro:", error);
      alert("Hubo un fallo al guardar. Revisa la consola (F12).");
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">Módulo de Ahorros</h1>

      <div className="card">
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Descripción</label>
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Ej: Ahorro de Karate"
              required
            />
          </div>

          <div className="form-group">
            <label>Monto</label>
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>¿Para qué se ingresó?</label>
            <input
              type="text"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Ej: Examenes de Kalo José"
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Guardar Ahorro
          </button>
        </form>
      </div>

      <div className="card table-card">
        <h2>Historial de Ahorros</h2>
        <div className="table-container" style={{ overflowX: 'auto' }}>
          <table className="finance-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Monto</th>
                <th>Motivo</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {ahorros && ahorros.length > 0 ? (
                ahorros.map((a, i) => (
                  <tr key={a.id || i}>
                    <td>{a.fecha}</td>
                    <td>{a.descripcion}</td>
                    <td>${Number(a.monto).toLocaleString('es-CL')}</td>
                    <td>{a.motivo}</td>
                    <td>
                      <button
                        type="button"
                        className="btn-danger"
                        onClick={() => removeAhorro(a.id || i)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>No hay ahorros registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}