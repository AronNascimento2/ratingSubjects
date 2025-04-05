// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const users = [
    { email: "kaji.priscila@gmail.com", password: "admin123" },
    { email: "Priscila.kaji@unifesp.br", password: "user123" },
    { email: "admin", password: "user123" },
  ];

  const handleLogin = () => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem("isAuthenticated", "true");
      onClose();
      navigate("/admin");
    } else {
      setError("E-mail ou senha inválidos.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Login Admin</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="modal-input"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="modal-input"
          />

          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <button onClick={handleLogin} className="button">
              Login
            </button>

            <button onClick={onClose} className="close-button">
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
