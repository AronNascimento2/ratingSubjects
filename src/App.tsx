import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubjectRatings from "./pages/Home";
import PrivateRoute from "./routes/privateRoute";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubjectRatings />} />
        <Route
          path="/admin"
          element={<PrivateRoute element={<AdminPage />} />} // Protegendo a rota
        />{" "}
      </Routes>
    </Router>
  );
}

export default App;
