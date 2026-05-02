import { NavLink } from "react-router-dom";
import { FaChartPie, FaExchangeAlt, FaHandHoldingUsd, FaChartBar } from "react-icons/fa";
import { FaPiggyBank } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2 style={{ marginBottom: "20px" }}>Finanzas</h2>

      <nav style={styles.nav}>
        <NavLink to="/" style={navLinkStyle}>
          <FaChartPie style={styles.icon} />
          Dashboard
        </NavLink>

        <NavLink to="/movimientos" style={navLinkStyle}>
          <FaExchangeAlt style={styles.icon} />
          Movimientos
        </NavLink>

        <NavLink to="/deudas" style={navLinkStyle}>
          <FaHandHoldingUsd style={styles.icon} />
          Deudas
        </NavLink>

        <NavLink to="/reportes" style={navLinkStyle}>
          <FaChartBar style={styles.icon} />
          Reportes
        </NavLink>

        <NavLink to="/ahorros" style={navLinkStyle}>
          <FaPiggyBank style={styles.icon} />
          Ahorros
        </NavLink>
      </nav>
    </div>
  );
}

const navLinkStyle = ({ isActive }) => ({
  color: "white",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "8px 10px",
  borderRadius: "6px",
  backgroundColor: isActive ? "#2563eb" : "transparent",
  transition: "background 0.2s",
});

const styles = {
  sidebar: {
    width: "200px",
    height: "100vh",
    background: "#1e293b",
    color: "white",
    padding: "20px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  icon: {
    fontSize: "18px",
  },
};