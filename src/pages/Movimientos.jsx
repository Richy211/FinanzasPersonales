import { useState } from "react";
import { useFinanceStore } from "../store/useFinanceStore";
import { useEffect } from "react";

export default function Movimientos() {
  const { addMovimiento, movimientos, removeMovimiento, updateMovimiento } =
    useFinanceStore();

  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [tipo, setTipo] = useState("ingreso");
  const [categoria, setCategoria] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 5;

  const [editIndex, setEditIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const totalPaginas = Math.max(
    1,
    Math.ceil(movimientos.length / registrosPorPagina)
  );

  const inicio = (paginaActual - 1) * registrosPorPagina;
  const fin = inicio + registrosPorPagina;

  const movimientosPaginados = movimientos.slice(inicio, fin);

 /*  function handleSubmit(e) {
    e.preventDefault();

    const nuevoMovimiento = {
      descripcion,
      monto: Number(monto),
      tipo,
      categoria,
      fecha: new Date().toISOString().split("T")[0],
    };

    addMovimiento(nuevoMovimiento);

    setDescripcion("");
    setMonto("");
    setCategoria("");

    setPaginaActual(Math.ceil((movimientos.length + 1) / registrosPorPagina));
  } */
useEffect(() => {
  if (mensaje) {
    const timer = setTimeout(() => {
      setMensaje("");
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [mensaje]);

function handleSubmit(e) {
  e.preventDefault();

  const nuevoMovimiento = {
    descripcion,
    monto: Number(monto),
    tipo,
    categoria,
    fecha: new Date().toISOString().split("T")[0],
  };

  addMovimiento(nuevoMovimiento);

  setMensaje("Movimiento agregado correctamente");

  setDescripcion("");
  setMonto("");
  setCategoria("");

  setPaginaActual(Math.ceil((movimientos.length + 1) / registrosPorPagina));
}


  function handleEdit(index) {
    const movimiento = movimientos[index];

    setDescripcion(movimiento.descripcion);
    setMonto(movimiento.monto);
    setTipo(movimiento.tipo);
    setCategoria(movimiento.categoria);

    setEditIndex(index);
    setModalOpen(true);
  }

  function handleUpdate(e) {
    e.preventDefault();

    const movimientoActualizado = {
      descripcion,
      monto: Number(monto),
      tipo,
      categoria,
      fecha: movimientos[editIndex].fecha,
    };

    updateMovimiento(editIndex, movimientoActualizado);
    setMensaje("Movimiento actualizado");

    setModalOpen(false);
    setEditIndex(null);

    setDescripcion("");
    setMonto("");
    setCategoria("");
  }

  return (
    <div className="page">
        {mensaje && <div className="toast">{mensaje}</div>}

      <h1 className="page-title">Gestión de Movimientos</h1>

      <div className="card">
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Descripción</label>
            <input
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Ej: Sueldo febrero"
              title="Describe el movimiento financiero"
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
               title="Ingresa el monto del movimiento"
            />
          </div>

          <div className="form-group">
            <label>Tipo</label>
            <select value={tipo} 
            onChange={(e) => setTipo(e.target.value)} 
            title="Selecciona el tipo de movimiento">
              <option value="ingreso">Ingreso</option>
              <option value="gasto">Gasto</option>
              <option value="deuda">Deuda</option>
            </select>
          </div>

          <div className="form-group">
            <label>Categoría</label>
            <input
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              placeholder="Ej: Alimentación"
              title="Categoriza el movimiento para un mejor análisis"
            />
          </div>

          <button className="btn-primary" type="submit">
            Agregar Movimiento
          </button>
        </form>
      </div>

      <div className="card table-card">
        <h2>Historial</h2>

        <table className="finance-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {movimientosPaginados.map((m, i) => (
              <tr key={inicio + i}>
                <td>{m.fecha}</td>
                <td>{m.descripcion}</td>

                <td className={`badge ${m.tipo}`}>{m.tipo}</td>

                <td>${m.monto}</td>

                <td>{m.categoria}</td>

                <td style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => handleEdit(inicio + i)}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className="btn-danger"
                  /*   onClick={() => removeMovimiento(inicio + i)} */
                  onClick={() => {
                      const confirmar = window.confirm(
                        "¿Seguro que quieres eliminar este movimiento?"
                      );

                      if (confirmar) {
                        removeMovimiento(inicio + i);
                         setMensaje("Movimiento eliminado");
                      }
                    }}

                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            disabled={paginaActual === 1}
            onClick={() => setPaginaActual(paginaActual - 1)}
          >
            ← Anterior
          </button>

          <span>
            Página {paginaActual} de {totalPaginas}
          </span>

          <button
            disabled={paginaActual === totalPaginas}
            onClick={() => setPaginaActual(paginaActual + 1)}
          >
            Siguiente →
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Editar Movimiento</h2>

            <form className="form-grid" onSubmit={handleUpdate}>
              <input
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />

              <input
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
              />

              <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="ingreso">Ingreso</option>
                <option value="gasto">Gasto</option>
                <option value="deuda">Deuda</option>
              </select>

              <input
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              />

              <div style={{ display: "flex", gap: "10px" }}>
                <button className="btn-primary" type="submit">
                  Actualizar
                </button>

                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => setModalOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}