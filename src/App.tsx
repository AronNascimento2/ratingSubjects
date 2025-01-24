import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubjectRatings from "./crudApp";
import AdminPage from "./AdminPage";
import PrivateRoute from "./privateRoute";

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
