import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Movimientos from "./pages/Movimientos";
import Deudas from "./pages/Deudas";
import Reportes from "./pages/Reportes";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";


function App() {

    const location = useLocation();

  function getTitle() {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/movimientos":
        return "Movimientos";
      case "/deudas":
        return "Deudas";
      case "/reportes":
        return "Reportes";
      default:
        return "";
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex:1 }}>
        <Header title={getTitle()} />
      
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/movimientos" element={<Movimientos />} />
            <Route path="/deudas" element={<Deudas />} />
            <Route path="/reportes" element={<Reportes />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

 export default App;