import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/privateRoute";
import AdminPage from "./pages/AdminPage";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota pública: acessível por todos os usuários */}
        <Route path="/" element={<Home />} />


        {/* Rota privada: protegida por autenticação */}
        <Route
          path="/admin"
          element={<PrivateRoute element={<AdminPage />} />}
        />{" "}
      </Routes>
    </Router>
  );
}

export default App;
