export default function Header({ title }) {
  return (
    <div style={styles.header}>
      <h1>{title}</h1>
      <button>Modo Oscuro</button>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    background: "#0f172a",
    color: "white",
  },
};